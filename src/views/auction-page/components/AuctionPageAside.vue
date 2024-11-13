<template>
  <div class="flex flex-col gap-4">
    <h2 class="h3">{{ timer }}</h2>

    <div class="w-[400px] h-[590px] bg-creamy py-8 pl-6 pr-0 rounded-lg flex flex-col">
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
  </div>
</template>

<script setup lang="ts">
import { useAuctionTimer } from '@/views/auction-page/composables/useAuctionTimer'
import AuctionBitItem from '@/views/auction-page/components/AuctionBitItem.vue'

const props = defineProps<{
  auctionData: TTables<'active_auctions'>
}>()

const authStore = useAuthStore()

const bidsHistory = ref<TBidHistory[]>([])
const isSubmittingNewPrice = ref(false)

const bidAmounts = [50, 100, 500, 1000]

const lastBidTime = computed(() => bidsHistory.value[0]?.created_at || '')

const timer = useAuctionTimer(lastBidTime, props.auctionData.bid_time)

async function addBit (amount: number) {
  const newBid = +(bidsHistory.value.at(0)?.amount || 0) + amount
  const userId = authStore.user.sub

  isSubmittingNewPrice.value = true
  await auctionService.makeBid(newBid, userId, props.auctionData.id as string)
}

function updateBidsHistory (newBid: TTables<'auction_bids'>, userProfile: TTables<'user_profiles'>) {
  bidsHistory.value.unshift({
    ...newBid,
    user_profiles: userProfile
  })
  isSubmittingNewPrice.value = false
}

onMounted(async () => {
  auctionService.createAuctionChanel(props.auctionData.id as string, updateBidsHistory)
  bidsHistory.value = await auctionService.getBidsWithUserProfiles(props.auctionData.id as string)
})

</script>

<style lang="scss" scoped>
.scroll-gutter-stable {
  @apply box-border;
  scroll-gutter: stable;
}
</style>
