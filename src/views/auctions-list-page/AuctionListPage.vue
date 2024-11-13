<template>
  <div v-loading.fullscreen="loading" class="w-full max-w-[1440px] mx-auto px-25 py-12.5">
    <AppButton icon="icon-add" class="mb-6">Створити аукціон</AppButton>

    <div class="grid grid-cols-3  gap-5">
      <CarCard v-for="car in auctionsList" :key="car.cars.id" :rate="rate" :car="car.cars" :auction="car" />
    </div>
  </div>
</template>

<script setup lang="ts">
const loading = ref(false)
const rate = ref(0)
const auctionsList = ref()

onMounted(async () => {
  loading.value = true
  auctionsList.value = await auctionsListService.getAuctionsList()
  rate.value = await moneyService.getUSDtoUAH()
  loading.value = false
})
</script>
