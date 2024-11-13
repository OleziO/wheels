<template>
  <div v-loading.fullscreen="loading" class="w-full max-w-[1440px] mx-auto px-25 py-12.5">
    <AppButton icon="icon-add" class="mb-6" @click="showCreateAuctionModal = true">Створити аукціон</AppButton>

    <div class="grid grid-cols-3  gap-5">
      <CarCard v-for="car in auctionsList" :key="car.cars.id" :rate="rate" :car="car.cars" :auction="car" />
    </div>

    <AuctionCreateModalForm v-model="showCreateAuctionModal" @update-list="getAuctionsList" />
  </div>
</template>

<script setup lang="ts">

const showCreateAuctionModal = ref(false)
const loading = ref(false)
const rate = ref(0)
const auctionsList = ref()

async function getAuctionsList () {
  auctionsList.value = await auctionsListService.getAuctionsList()
}

async function init () {
  loading.value = true
  await getAuctionsList()
  rate.value = await moneyService.getUSDtoUAH()
  loading.value = false
}

onMounted(init)
</script>
