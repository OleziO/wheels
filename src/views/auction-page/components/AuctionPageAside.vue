<template>
  <div class="flex flex-col gap-4">
    <h2 class="h3">{{ timer }} </h2>
    <p v-if="!lastBidTime && auctionData.default_bid" class="body-1">
      (початкова ставка ${{ auctionData.default_bid }})
    </p>

    <el-tabs v-model="activeTab">
      <el-tab-pane label="Ставки" name="first">
        <div class="w-[400px] h-[400px] bg-creamy py-8 pl-6 pr-0 rounded-lg flex flex-col">
          <div class="h-full overflow-y-scroll flex flex-col gap-8 pr-5 scroll-gutter-stable">
            <AuctionBitItem
              v-for="bit in bidsHistory"
              :key="bit.id"
              :bit="bit"
            />
          </div>

          <h3 class="body-1 mt-4 mb-2">Підвищити ставку на:</h3>

          <div class="flex justify-between gap-2 pr-6">
            <AppButton
              v-for="(amount, index) in bidAmounts"
              :key="index"
              class="w-full"
              :disabled="isSubmittingNewPrice"
              @click="addBit(amount)"
            >
              ${{ amount }}
            </AppButton>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="Учасники" name="second">
        <div class="w-[400px] h-[400px] overflow-y-scroll bg-creamy py-8 pl-6 pr-0 rounded-lg flex flex-col gap-6">
          <div
            v-for="user in activeUsers"
            :key="user.id"
            class="flex gap-2 items-center"
          >
            <el-avatar class="w-10 h-10 rounded-full overflow-hidden" :src="user.avatar || ''">
              <div class="w-10 h-10 rounded-full flex justify-center items-center bg-gray-light text-creamy-light">
                <i class="icon-user-3 h3" />
              </div>
            </el-avatar>

            <p>
              {{ user.first_name }} {{ user.last_name }}
            </p>
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup lang="ts">
import { useAuctionTimer } from '@/views/auction-page/composables/useAuctionTimer'
import AuctionBitItem from '@/views/auction-page/components/AuctionBitItem.vue'
import type { RealtimeChannel } from '@supabase/supabase-js'

const props = defineProps<{
  auctionData: TTables<'active_auctions'>
}>()

const authStore = useAuthStore()

const realTimeChannel = ref<RealtimeChannel>()
const isSubmittingNewPrice = ref(false)
const activeTab = ref('first')

const activeUsers = ref([] as any[])
const bidsHistory = ref<TBidItem[]>([])

const bidAmounts = [50, 100, 500, 1000]

const lastBidTime = computed(() => bidsHistory.value[0]?.created_at || '')

const timer = useAuctionTimer(lastBidTime, props.auctionData.bid_time)

async function addBit (amount: number) {
  const newBid = +(bidsHistory.value.at(0)?.amount || props.auctionData.default_bid || 0) + amount
  const userId = authStore.user.sub

  isSubmittingNewPrice.value = true
  await auctionService.makeBid(newBid, userId, props.auctionData.id as string)
}

async function updateBidsHistory (newBid: TTables<'auction_bids'>, userProfile: TTables<'user_profiles'>) {
  bidsHistory.value.unshift({
    ...newBid,
    user_profiles: userProfile
  })
  await auctionService.updateAuctionData(newBid)
  isSubmittingNewPrice.value = false
}

function setUserStatus (method: string, newUser: any) {
  if (method === 'join') {
    activeUsers.value.push(newUser[0])
  } else if (method === 'leave') {
    activeUsers.value = activeUsers.value.filter(user => user.sub !== newUser[0].sub)
  }
}

onMounted(async () => {
  realTimeChannel.value = auctionService
    .createAuctionChanel(
      props.auctionData.id,
      updateBidsHistory, authStore.user,
      setUserStatus
    )

  bidsHistory.value = await auctionService.getBidsWithUserProfiles(props.auctionData.id as string)
})

</script>

<style lang="scss" scoped>
.scroll-gutter-stable {
  @apply box-border;
  scroll-gutter: stable;
}
</style>
