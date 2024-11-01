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

const searchData = ref<ICarsSearchDataExtended>({
  involvedAccident: props.query.involvedAccident || [],
  transmissionTypes: props.query.transmissionTypes || [],
  manufactureYear: props.query.manufactureYear || [],
  carsConditions: props.query.carsConditions || 'All',
  vehicleTypes: props.query.vehicleTypes || [],
  mileage: props.query.mileage || [0, 2000],
  price: props.query.price || [0, 1000000],
  techCondition: props.query.coating || [],
  fuelTypes: props.query.fuelTypes || [],
  driveTypes: props.query.driveTypes || [],
  location: props.query.location || [],
  bodyType: props.query.bodyType || [],
  coating: props.query.coating || [],
  brands: props.query.brands || [],
  models: props.query.models || [],
  engine: props.query.engine || [],
  page: props.query.page || 1
})

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
const manufactureYear = ref<IFilterOption[]>([])
const bodyType = ref<TTables<'body_types'>[]>([])
const techCondition = ref<IFilterOption[]>([])
const brands = ref<TTables<'brands'>[]>([])
const models = ref<TTables<'models'>[]>([])
const coating = ref<IFilterOption[]>([])
const engine = ref<IFilterOption[]>([])

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
    coating: coating.value,
    mileage: mileage.value,
    engine: engine.value,
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
    driveTypesResponse
  ] = await searchService.getExtendedFilters()

  manufactureYear.value = searchService.getYears(1940)
  transmissionTypes.value = transmissionTypesResponse
  carsConditions.value = carConditionsResponse
  vehicleTypes.value = vehicleTypesResponse
  fuelTypes.value = fuelTypesResponse
  driveTypes.value = driveTypesResponse
  locations.value = locationResponse
  bodyType.value = bodyTypeResponse
  price.value = searchService.price
  brands.value = brandsResponse
  models.value = modelsResponse
}

async function setCarsWithPagination (start: number, end: number) {
  const filters = (Object.keys(props.query), length ? searchData.value : {}) as ICarsSearchDataExtended
  cars.value = (await searchService.getCarsWithPagination(start, end, filters) || []) as TCar[]
}

watch(() => [carsPage, props.query], async () => {
  try {
    loading.value = true
    await setCarsWithPagination(paginationIndexes.value.start, paginationIndexes.value.end)
  } finally {
    loading.value = false
  }
}, { deep: true })

onMounted(async () => {
  try {
    loading.value = true
    await getFilters()
    const filters = (Object.keys(props.query), length ? searchData.value : {}) as ICarsSearchDataExtended
    totalCarsCount.value = await searchService.getCarsCount(filters) || 0
    await setCarsWithPagination(paginationIndexes.value.start, paginationIndexes.value.end)
    rate.value = await moneyService.getUSDtoUAH()
  } finally {
    loading.value = false
  }
})
</script>
