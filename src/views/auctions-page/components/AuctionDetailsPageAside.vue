<template>
  <div class="flex flex-col gap-4 h-[575px]">
    <h2 class="h3">{{ timer.remainingTime }} </h2>
    <p v-if="timer.status === 'not-started'" class="body-1">
      (початкова ставка ${{ auctionData.default_bid }})
    </p>

    <el-tabs v-model="activeTab" class="flex-1 h-[280px]">
      <el-tab-pane v-loading="asideLoading" label="Ставки" name="bids" class="h-full">
        <div class="w-[400px] h-full bg-creamy py-8 pl-6 pr-0 rounded-lg flex flex-col">
          <div class="h-full overflow-y-scroll flex flex-col gap-8 pr-5 scroll-gutter-stable">
            <AuctionDetailsBitItem
              v-for="bit in bidsHistory"
              :key="bit.id"
              :bit="bit"
            />

            <div
              v-if="!bidsHistory.length"
              class="w-full h-full flex justify-center items-center"
            >
              <p class="body-1 text-gray-dark">
                Історія ставок
              </p>
            </div>
          </div>

          <div v-if="timer.status !== 'ended' && authStore.user?.sub !== auctionData.auction_owner_id" class="mt-4">
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

      <el-tab-pane label="Учасники" name="members" class="h-full">
        <AuctionUserList :active-users="members" name="Список учасників" />
      </el-tab-pane>

      <el-tab-pane label="Глядачі" name="spectators" class="h-full">
        <AuctionUserList :active-users="spectators" name="Список глядачів" />
      </el-tab-pane>
    </el-tabs>

    <AppButton
      v-if="timer.status !== 'ended' && authStore.user?.sub !== auctionData.auction_owner_id"
      icon="icon-logout-box"
      type="secondary" class=" w-full"
      @click="leaveFromAuction"
    >
      Покинути аукціон
    </AppButton>
  </div>
</template>

<script setup lang="ts">
import type { RealtimeChannel } from '@supabase/supabase-js'
import { replaceRouterQuery, routeNames } from '@/router'
import { useAuctionTimer } from '@/views/auctions-page/composables/useAuctionTimer'
import AuctionDetailsBitItem from '@/views/auctions-page/components/AuctionDetailsBitItem.vue'

const props = defineProps<{
  auctionData: TTables<'active_auctions'>
  car: TCar
}>()

const router = useRouter()
const authStore = useAuthStore()

const realTimeChannel = ref<RealtimeChannel>()

const asideLoading = ref(false)

const isSubmittingNewPrice = ref(false)

const activeTab = ref('bids')

const ownerData = ref<TTables<'user_profiles'> | null>(null)

const activeUsers = ref<any[]>([])

const bidsHistory = ref<TBidItem[]>([])

const members = computed(() => {
  const userIds = new Set()

  return bidsHistory.value
    .map(bid => bid.user_profiles)
    .filter(profile => {
      if (!userIds.has(profile.id)) {
        userIds.add(profile.id)
        return true
      }
      return false
    })
})

const spectators = computed(() => {
  const uniqueUserIds = new Set()
  return activeUsers.value
    ?.filter(user => !bidsHistory.value.find(bid => bid.user_id === user.id))
    .filter(user => {
      if (!uniqueUserIds.has(user.id)) {
        uniqueUserIds.add(user.id)
        return true
      }
      return false
    })
})

const endButtonData = computed(() => {
  if (authStore.user?.sub === props.auctionData.auction_owner_id) {
    return {
      text: "Зв'язатися з переможцем",
      click: () => replaceRouterQuery(routeNames.chats, { id: bidsHistory.value[0]!.user_id })
    }
  } else if (authStore.user?.sub === bidsHistory.value[0]!.user_id) {
    return {
      text: "Зв'язатися з власником",
      click: async () => {
        replaceRouterQuery(routeNames.chats, { id: props.auctionData.auction_owner_id })

        await emailService.sendEmail({
          reply_to: ownerData.value?.email || '',
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

const bidAmounts = [50, 100, 500, 1000]

async function addBit (amount: number) {
  asideLoading.value = true

  const newBid = +(bidsHistory.value.at(0)?.amount || props.auctionData.default_bid || 0) + amount
  const userId = authStore.user?.sub

  isSubmittingNewPrice.value = true

  await auctionsService.makeBid(newBid, userId, props.auctionData.id as string)

  asideLoading.value = false
}

async function updateBidsHistory (newBid: TTables<'auction_bids'>, userProfile: TTables<'user_profiles'>) {
  asideLoading.value = true

  bidsHistory.value.unshift({
    ...newBid,
    user_profiles: userProfile
  })
  await auctionsService.updateAuctionData(props.auctionData.id, newBid.amount, newBid.user_id)
  isSubmittingNewPrice.value = false

  asideLoading.value = false
}

async function setUserStatus (method: string, newUser: any) {
  if (method === 'join') {
    activeUsers.value.push((await auctionsService.getUserProfileInfo(newUser[0].sub)).user)
  } else if (method === 'leave') {
    activeUsers.value = activeUsers.value.filter(user => user.sub !== newUser[0].sub)
  }
}

async function updateAfterRemoveBids () {
  asideLoading.value = true

  bidsHistory.value = await auctionsService.getBidsWithUserProfiles(props.auctionData.id)

  const lastBid = bidsHistory.value[0]

  lastBid && await auctionsService.updateAuctionData(props.auctionData.id, lastBid?.amount, lastBid?.user_id)

  asideLoading.value = false
}

async function leaveFromAuction () {
  await auctionsService.leaveAuction(props.auctionData.id, authStore.user?.sub)
  router.replace({ name: routeNames.auctionsList })
}

watch(() => timer.value.status, () => {
  if (timer.value.status === 'ended') {
    auctionsService.endAuction(props.auctionData.id)
  }
})

onMounted(async () => {
  if (authStore.user) {
    realTimeChannel.value = auctionsService
      .createAuctionChanel(
        props.auctionData.id,
        updateBidsHistory,
        updateAfterRemoveBids,
        authStore.user,
        setUserStatus
      )
  }

  bidsHistory.value = await auctionsService.getBidsWithUserProfiles(props.auctionData.id as string)
  ownerData.value = (await auctionsService.getUserProfileInfo(props.auctionData.auction_owner_id)).user
})

</script>

<style lang="scss" scoped>
.scroll-gutter-stable {
  @apply box-border;
  scroll-gutter: stable;
}
</style>
