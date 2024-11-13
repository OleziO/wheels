<template>
  <div class="flex flex-col gap-4 h-[575px]">
    <div v-if="authStore.user.sub !== auctionData.auction_owner_id || timer.status === 'ended'">
      <h2 class="h3">{{ timer.remainingTime }} </h2>
      <p v-if="timer.status === 'not-started'" class="body-1">
        (початкова ставка ${{ auctionData.default_bid }})
      </p>
    </div>

    <el-tabs v-model="activeTab" class="h-full flex-1 flex-grow">
      <el-tab-pane label="Ставки" name="first" class="h-full">
        <div class="w-[400px] h-full bg-creamy py-8 pl-6 pr-0 rounded-lg flex flex-col">
          <div class="h-full overflow-y-scroll flex flex-col gap-8 pr-5 scroll-gutter-stable">
            <AuctionBitItem
              v-for="bit in bidsHistory"
              :key="bit.id"
              :bit="bit"
            />
          </div>

          <div v-if="timer.status !== 'ended' && authStore.user.sub !== auctionData.auction_owner_id" class="mt-4">
            <h3 class="body-1 mb-2">Підвищити ставку на:</h3>

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

          <AppButton
            v-else-if="timer.status === 'ended'"
            class="mt-4 mr-6"
            @click="endButtonData.click"
          >
            {{ endButtonData.text }}
          </AppButton>
        </div>
      </el-tab-pane>
      <el-tab-pane label="Учасники" name="second" class="h-full">
        <div class="w-[400px] h-full overflow-y-scroll bg-creamy py-8 pl-6 pr-0 rounded-lg flex flex-col gap-6">
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
import type { RealtimeChannel } from '@supabase/supabase-js'
import { useAuctionTimer } from '@/views/auction-page/composables/useAuctionTimer'
import AuctionBitItem from '@/views/auction-page/components/AuctionBitItem.vue'
import { replaceRouterQuery, routeNames } from '@/router'
import { emailService } from '@/services/email.service'

const props = defineProps<{
  auctionData: TTables<'active_auctions'>
  car: TCar
}>()

const router = useRouter()
const authStore = useAuthStore()

const realTimeChannel = ref<RealtimeChannel>()
const isSubmittingNewPrice = ref(false)
const activeTab = ref('first')

const activeUsers = ref([] as any[])
const bidsHistory = ref<TBidItem[]>([])

const bidAmounts = [50, 100, 500, 1000]

const endButtonData = computed(() => {
  if (authStore.user.sub === props.auctionData.auction_owner_id) {
    return {
      text: "Зв'язатися з переможцем",
      click: () => replaceRouterQuery(routeNames.chats, { id: bidsHistory.value[0]!.user_id })
    }
  } else if (authStore.user.sub === bidsHistory.value[0]!.user_id) {
    return {
      text: "Зв'язатися з власником",
      click: () => {
        replaceRouterQuery(routeNames.chats, { id: props.auctionData.auction_owner_id })

        emailService.send({
          reply_to: bidsHistory.value[0]?.user_profiles.email || '',
          name: `${props.car.models.brand} ${props.car.models.model} ${props.car.manufacture_year}`,
          id: props.auctionData.id
        })
      }
    }
  }

  return {
    text: 'На головну',
    click: () => router.replace({ name: routeNames.home })
  }
})

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

watch(() => timer.value.status, () => {
  if (timer.value.status) {
    auctionService.endAuction(props.auctionData.id)
  }
})

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
