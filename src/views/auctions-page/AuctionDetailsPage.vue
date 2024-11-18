<template>
  <div v-if="auctionData?.car_id && authStore.user">
    <CarPage :id="carId" :auction="auctionData" />
  </div>
</template>

<script setup lang="ts">
import CarPage from '../car-page/CarPage.vue'

const route = useRoute()
const authStore = useAuthStore()

const auctionData = ref<TTables<'active_auctions'>>()

const auctionId = computed(() => route.params.id as string)
const carId = computed(() => auctionData.value?.car_id || '')

async function init () {
  auctionData.value = await auctionsService.getAuctionData(auctionId.value)
}

onMounted(init)

</script>
