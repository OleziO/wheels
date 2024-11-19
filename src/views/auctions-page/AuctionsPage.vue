<template>
  <div
    v-loading.fullscreen="loading"
    class="w-full flex-1 flex flex-col mx-auto px-25 pb-12.5 pt-4"
  >
    <div class="w-full flex justify-end">
      <el-tooltip
        effect="dark"
        :disabled="!!myCars.length"
        placement="top"
        content="У вас відсутні оголошення або усі ваші автомобілі уже на аукціоні."
      >
        <AppButton
          :disabled="!myCars.length"
          icon="icon-add"
          class="mb-6 w-fit"
          @click="showCreateAuctionModal = true"
        >
          Створити аукціон
        </AppButton>
      </el-tooltip>
    </div>

    <div v-if="auctionsList.length" class="grid grid-cols-3 max-w-[1440px] gap-5">
      <CarCard
        v-for="car in auctionsList"
        :key="car.cars.id"
        :rate="generalStore.rate" :car="car.cars" :auction="car"
      />
    </div>

    <div v-else class="flex-1 w-full flex justify-center items-center">
      <h2 class="h3 text-gravel">Аукціони відсутні</h2>
    </div>

    <AuctionCreateModalForm v-model="showCreateAuctionModal" :my-cars="myCars" @update-list="getAuctionsList" />
  </div>
</template>

<script setup lang="ts">

const authStore = useAuthStore()
const generalStore = useGeneralStore()

const showCreateAuctionModal = ref(false)
const loading = ref(false)

const auctionsList = ref<IAuctionExtended[]>([])
const myCars = ref<(TCar & {label: string})[]>([])

async function getAuctionsList () {
  loading.value = true

  auctionsList.value = await auctionsService.getAuctionsList() || []

  await getUserCars()

  loading.value = false
}

async function getUserCars () {
  loading.value = true

  myCars.value = (await auctionsService.getUserCars(authStore.user?.sub))
    .map(car => (
      {
        ...car,
        label: `${car.car_colors?.label} 
        ${car.models.brand} 
        ${car.models.model} 
        ${car.manufacture_year} | 
        ${car.mileage} тис км`
      })
    )

  loading.value = false
}

async function init () {
  loading.value = true

  await getAuctionsList()
  await getUserCars()

  loading.value = false
}

onMounted(init)
</script>
