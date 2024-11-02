<template>
  <div v-loading.fullscreen="loading" class="flex justify-between px-25 mt-12">
    <FiltersSection v-model="searchData" :searchFiltersOptions="searchFiltersOptions" />

    <div class="flex flex-col items-center gap-12.5 py-8">
      <AppInput placeholder="Що ви шукаєте?">
        <AppButton
          class="px-8"
          icon="icon-search"
          @click="updateQuery"
        >
          Шукати
        </AppButton>
      </AppInput>
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

import FiltersSection from '@/views/search/components/SearchFiltersSection.vue'
import CarList from '@/views/search/components/SearchCarList.vue'

import searchService from '@/services/search-service/search.service'
import { router } from '@/router'
import { routeNames } from '@/router/route-names'

const props = defineProps<{
  query: ICarsSearchDataExtended
}>()

const loading = ref(false)

const searchData = ref<ICarsSearchDataExtended>(getQueryData(props.query))
const searchFiltersOptions = ref<ISearchFiltersOptions>({
  transmissionTypes: [],
  carsConditions: [],
  vehicleTypes: [],
  driveTypes: [],
  fuelTypes: [],
  location: [],
  involvedAccident: [],
  bodyType: [],
  manufactureYear: [],
  techCondition: [],
  engineVolume: [],
  brands: [],
  models: {},
  paintType: [],
  price: { min: 0, max: 1000000 },
  mileage: { min: 0, max: 2000 }
})

const carsPage = ref(+(props.query.page || 1))
const totalCarsCount = ref(0)
const cars = ref<TCar[]>([])
const carsPerPage = ref(20)
const rate = ref(0)

const route = useRoute()

const paginationIndexes = computed(() => {
  const start = (carsPage.value - 1) * carsPerPage.value
  const end = start + carsPerPage.value - 1

  return {
    start,
    end
  }
})

async function getFilters () {
  const data = await searchService.getExtendedFilters()

  const updatedFilters: ISearchFiltersOptions = {
    ...data,
    models: searchService.groupModelsByBrand(data.brands, data.models),
    manufactureYear: searchService.getYears(1940),
    involvedAccident: searchService.accidentTypes,
    engineVolume: searchService.engineVolumes,
    price: searchService.price,
    mileage: searchFiltersOptions.value.mileage
  }

  return updatedFilters
}

function getQueryData (data: ICarsSearchDataExtended) {
  return {
    ...searchService.getArrFields(data),
    involvedAccident: props.query.involvedAccident || '',
    manufactureYear: props.query.manufactureYear || [null, null],
    engineVolume: props.query.engineVolume || [null, null],
    carsConditions: props.query.carsConditions || 'All',
    page: props.query.page || 1
  }
}

async function setCarsWithPagination (start: number, end: number) {
  const filtersData = searchService.parseSearchData(searchData.value, props.query)
  totalCarsCount.value = await searchService.getCarsCount(filtersData)
  rate.value = await moneyService.getUSDtoUAH()
  cars.value = await searchService.getCarsWithPagination(start, end, filtersData)
}

function updateQuery () {
  const query = searchService.convertToLocationQueryRaw(searchData.value)
  router.replace({ name: routeNames.search, query: { ...query } })
}

watch(
  () => [carsPage.value, route.query],
  async () => {
    loading.value = true
    await setCarsWithPagination(paginationIndexes.value.start, paginationIndexes.value.end)
    loading.value = false
  },
  { deep: true, immediate: true }
)

onMounted(async () => {
  loading.value = true
  searchFiltersOptions.value = await getFilters()
  await setCarsWithPagination(paginationIndexes.value.start, paginationIndexes.value.end)
  loading.value = false
})
</script>
