<template>
  <div v-loading.fullscreen="loading">
    <VehicleTypes :data="query.vehicleTypes" />
    <div class="flex justify-between mt-12.5 px-25">
      <FiltersSection />
      <CarList
        v-model="carsPage"
        :rate="rate"
        :cars="cars"
        :per-page="carsPerPage"
        :total-cars-count="totalCarsCount"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import VehicleTypes from './components/SearchVehicleTypes.vue'
import FiltersSection from './components/SearchFiltersSection.vue'
import CarList from './components/SearchCarList.vue'
import searchService from '@/services/search-service/search.service'

const props = defineProps<{
  query: ICarsSearchData
}>()

const loading = ref(false)
const carsPerPage = ref(10)
const carsPage = ref(+(props.query.page || 1))
const totalCarsCount = ref(0)
const cars = ref<TCar[]>([])
const rate = ref(0)

const paginationIndexes = computed(() => {
  const start = (carsPage.value - 1) * carsPerPage.value
  const end = start + carsPerPage.value - 1

  return {
    start,
    end
  }
})

async function setCarsWithPagination (start: number, end: number) {
  cars.value = (await searchService.getCarsWithPagination(start, end) || []) as TCar[]
}

watch(carsPage, async () => {
  try {
    loading.value = true
    await setCarsWithPagination(paginationIndexes.value.start, paginationIndexes.value.end)
  } finally {
    loading.value = false
  }
})

onMounted(async () => {
  try {
    loading.value = true
    totalCarsCount.value = await searchService.getCarsCount() || 0
    rate.value = await moneyService.getUSDtoUAH()
    await setCarsWithPagination(paginationIndexes.value.start, paginationIndexes.value.end)
  } finally {
    loading.value = false
  }
})
</script>
