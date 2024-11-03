<template>
  <div v-loading.fullscreen="loading" class="flex justify-between px-25 mt-12 gap-5">
    <FiltersSection v-model="searchData" :searchFiltersOptions="searchFiltersOptions" />

    <div class="w-full flex flex-col items-center gap-4 py-8">
      <AppInput v-model="searchData.search" placeholder="Що ви шукаєте?">
        <AppButton
          class="px-8"
          icon="icon-search"
          @click="updateQuery"
        >
          Шукати
        </AppButton>
      </AppInput>

      <div class="w-full pb-5">
        <p class="w-full flex justify-end body-1 text-gravel mb-4">Результатів: {{ totalCarsCount }}</p>
        <div class="flex w-full gap-5">
          <AppSelect
            v-model="searchData.sortignType"
            placeholder="Сортування"
            key-value="value"
            key-label="label"
            :options="searchFiltersOptions.sortingTypes"
          />
          <AppSelect
            v-model="searchData.perPage"
            placeholder="Оголошень на сторінці"
            key-value="value"
            key-label="label"
            :options="searchFiltersOptions.perPage"
          />
        </div>
      </div>

      <CarList
        v-model="searchData"
        :rate="rate"
        :cars="cars"
        :per-page="searchData.perPage"
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

const route = useRoute()
const loading = ref(false)

const searchData = ref<ICarsSearchDataExtended>(getQueryData(props.query))
const searchFiltersOptions = ref<ISearchFiltersOptions>({
  transmissionTypes: [],
  carsConditions: [],
  vehicleTypes: [],
  driveTypes: [],
  fuelTypes: [],
  location: [],
  bodyType: [],
  techCondition: [],
  brands: [],
  models: {},
  paintType: [],
  price: { min: 0, max: 1000000 },
  mileage: { min: 0, max: 2000 },
  manufactureYear: searchService.getYears(1940),
  perPage: searchService.perPage,
  involvedAccident: searchService.accidentTypes,
  engineVolume: searchService.engineVolumes,
  sortingTypes: searchService.sortingTypes
})

const totalCarsCount = ref(0)
const cars = ref<TCar[]>([])
const rate = ref(0)

const paginationIndexes = computed(() => {
  const start = (searchData.value.page - 1) * searchData.value.perPage
  const end = start + (searchData.value.perPage - 1)

  return {
    start,
    end
  }
})

async function getFilters () {
  const data = await searchService.getExtendedFilters()

  const updatedFilters: ISearchFiltersOptions = {
    ...searchFiltersOptions.value,
    ...data,
    models: searchService.groupModelsByBrand(data.brands, data.models)
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
    page: props.query.page || '1',
    perPage: props.query.perPage || '20',
    sortignType: props.query.sortignType || 'date',
    search: props.query.search || ''
  }
}

async function setCarsWithPagination (start: number, end: number) {
  const filtersData = searchService.parseSearchData(searchData.value, props.query)
  totalCarsCount.value = await searchService.getCarsCount(filtersData)
  rate.value = await moneyService.getUSDtoUAH()
  cars.value = searchService.sort(
    await searchService.getCarsWithPagination(start, end, filtersData),
    searchData.value.sortignType
  )
}

function updateQuery () {
  const query = searchService.convertToLocationQueryRaw(searchData.value)
  router.replace({ name: routeNames.search, query: { ...query } })
}

watch(
  () => [searchData.value.page, searchData.value.perPage, searchData.value.sortignType, route.query],
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
