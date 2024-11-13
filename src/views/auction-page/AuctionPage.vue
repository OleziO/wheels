<template>
  <div v-if="auctionData?.car_id">
    <CarPage :query="carId" :auction="auctionData" />
  </div>
</template>

<script setup lang="ts">
import CarPage from '../car-page/CarPage.vue'

const props = defineProps<{
  query: {
    id: string
  }
}>()

const auctionData = ref<TTables<'active_auctions'>>()

const carId = computed(() => ({ id: auctionData.value?.car_id || '' }))

async function init () {
  auctionData.value = await auctionService.getAuctionData(props.query.id)
}

onMounted(init)

</script>
