<template>
  <div v-loading.fullscreen="loading">
    <VehicleTypes v-model="searchData.vehicleTypes" :vehicleTypes="searchFiltersOptions.vehicleTypes" />
    <div class="flex justify-between mt-12.5 px-25">
      <FiltersSection v-model:searchData="searchData" :searchFiltersOptions="searchFiltersOptions" />
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
import VehicleTypes from '@/views/search/components/SearchVehicleTypes.vue'
import CarList from '@/views/search/components/SearchCarList.vue'

import searchService from '@/services/search-service/search.service'

const props = defineProps<{
  query: ICarsSearchDataExtended
}>()

const searchData = ref<ICarsSearchDataExtended>(getQueryData())

const carsPage = ref(+(props.query.page || 1))
const totalCarsCount = ref(0)
const cars = ref<TCar[]>([])
const carsPerPage = ref(20)
const loading = ref(false)
const rate = ref(0)

const transmissionTypes = ref<TTables<'transmission_types'>[]>([])
const carsConditions = ref<TTables<'car_conditions'>[]>([])
const vehicleTypes = ref<TTables<'vehicle_types'>[]>([])
const driveTypes = ref<TTables<'drive_types'>[]>([])
const fuelTypes = ref<TTables<'fuel_types'>[]>([])
const locations = ref<TTables<'locations'>[]>([])
const involvedAccident = ref<IFilterOption[]>([])
const bodyType = ref<TTables<'body_types'>[]>([])
const manufactureYear = ref<IFilterOption[]>([])
const techCondition = ref<IFilterOption[]>([])
const engineVolume = ref<IFilterOption[]>([])
const brands = ref<TTables<'brands'>[]>([])
const models = ref<TTables<'models'>[]>([])
const paintType = ref<IFilterOption[]>([])

const price = ref<IRangeOption>({ min: 0, max: 1000000 })
const mileage = ref<IRangeOption>({ min: 0, max: 2000 })

const searchFiltersOptions = computed(() => {
  return {
    models: searchService.groupModelsByBrand(brands.value, models.value),
    involvedAccident: involvedAccident.value,
    transmissionTypes: transmissionTypes.value,
    manufactureYear: manufactureYear.value,
    carsConditions: carsConditions.value,
    techCondition: techCondition.value,
    vehicleTypes: vehicleTypes.value,
    driveTypes: driveTypes.value,
    fuelTypes: fuelTypes.value,
    location: locations.value,
    bodyType: bodyType.value,
    paintType: paintType.value,
    mileage: mileage.value,
    engineVolume: engineVolume.value,
    brands: brands.value,
    price: price.value
  }
})

const paginationIndexes = computed(() => {
  const start = (carsPage.value - 1) * carsPerPage.value
  const end = start + carsPerPage.value - 1

  return {
    start,
    end
  }
})

function getQueryData () {
  return {
    ...searchService.getArrFields(props.query),
    involvedAccident: props.query.involvedAccident || '',
    manufactureYear: props.query.manufactureYear || [null, null],
    engineVolume: props.query.engineVolume || [null, null],
    carsConditions: props.query.carsConditions || 'All',
    page: props.query.page || 1
  }
}

async function getFilters () {
  const [
    brandsResponse,
    modelsResponse,
    locationResponse,
    vehicleTypesResponse,
    carConditionsResponse,
    bodyTypeResponse,
    transmissionTypesResponse,
    fuelTypesResponse,
    driveTypesResponse,
    techConditionResponse,
    paintResponse
  ] = await searchService.getExtendedFilters()

  transmissionTypes.value = transmissionTypesResponse
  carsConditions.value = carConditionsResponse
  techCondition.value = techConditionResponse
  vehicleTypes.value = vehicleTypesResponse
  driveTypes.value = driveTypesResponse
  fuelTypes.value = fuelTypesResponse
  locations.value = locationResponse
  bodyType.value = bodyTypeResponse
  paintType.value = paintResponse
  brands.value = brandsResponse
  models.value = modelsResponse

  manufactureYear.value = searchService.getYears(1940)
  involvedAccident.value = searchService.accidentTypes
  engineVolume.value = searchService.engineVolumes
  price.value = searchService.price
}

async function setCarsWithPagination (start: number, end: number) {
  const filters = searchService.parseSearchData(searchData.value, props.query)

  totalCarsCount.value = await searchService.getCarsCount(filters)
  searchData.value = getQueryData()
  rate.value = await moneyService.getUSDtoUAH()
  cars.value = await searchService.getCarsWithPagination(start, end, filters) as TCar[]
}

watch(() => [carsPage, props, props.query], async () => {
  try {
    loading.value = true
    await setCarsWithPagination(paginationIndexes.value.start, paginationIndexes.value.end)
    searchData.value = getQueryData()
  } finally {
    loading.value = false
  }
}, { deep: true })

onMounted(async () => {
  try {
    loading.value = true
    await getFilters()
    await setCarsWithPagination(paginationIndexes.value.start, paginationIndexes.value.end)
  } finally {
    loading.value = false
  }
})
</script>
