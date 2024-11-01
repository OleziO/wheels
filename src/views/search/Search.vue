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
const manufactureYear = ref<IFilterOption[]>([])
const bodyType = ref<TTables<'body_types'>[]>([])
const techCondition = ref<IFilterOption[]>([])
const brands = ref<TTables<'brands'>[]>([])
const models = ref<TTables<'models'>[]>([])
const coating = ref<IFilterOption[]>([])
const engineVolume = ref<IFilterOption[]>([])

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
  const fields = [
    'transmissionTypes',
    'involvedAccident',
    'vehicleTypes',
    'mileage',
    'price',
    'driveTypes',
    'techCondition',
    'fuelTypes',
    'location',
    'bodyType',
    'coating',
    'brands',
    'models'
  ]

  return {
    ...getArrFields(fields),
    involvedAccident: props.query.involvedAccident || '',
    manufactureYear: props.query.manufactureYear || [null, null],
    engineVolume: props.query.engineVolume || [null, null],
    carsConditions: props.query.carsConditions || 'All',
    page: props.query.page || 1
  }
}

function getArrFields (fields: string[]) {
  const result: any = {}

  fields.forEach(field => {
    const key = field as keyof ICarsSearchDataExtended
    const arrField = toArr(props.query[key])

    if (arrField) { result[key] = toArr(props.query[key]) }
  })

  return result
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
    techConditionResponse
  ] = await searchService.getExtendedFilters()

  transmissionTypes.value = transmissionTypesResponse
  carsConditions.value = carConditionsResponse
  techCondition.value = techConditionResponse
  vehicleTypes.value = vehicleTypesResponse
  fuelTypes.value = fuelTypesResponse
  driveTypes.value = driveTypesResponse
  locations.value = locationResponse
  bodyType.value = bodyTypeResponse
  brands.value = brandsResponse
  models.value = modelsResponse

  manufactureYear.value = searchService.getYears(1940)
  involvedAccident.value = searchService.accidentTypes
  engineVolume.value = searchService.engineVolumes
  price.value = searchService.price
}

async function setCarsWithPagination (start: number, end: number) {
  const filters = parseSearchData()
  totalCarsCount.value = await searchService.getCarsCount(filters)
  cars.value = (await searchService.getCarsWithPagination(start, end, filters) || []) as TCar[]
}

function toArr (data: any) {
  if (!data || !data.length) return ''
  return Array.isArray(data) ? data : [data]
}

function validateQuery () {
  const result: any = {}

  for (const key in searchData.value) {
    const field = key as keyof ICarsSearchDataExtended

    if (searchData.value[field] ||
      (Array.isArray(searchData.value[field]) &&
        (searchData.value[field][0] || searchData.value[field][1]))
    ) {
      result[field] = searchData.value[field]
    }
  }

  return result
}

function parseSearchData () {
  const parsedSearchData = {
    ...validateQuery(),
    carsConditions: searchData.value.carsConditions === 'All'
      ? ['New', 'Used']
      : searchData.value.carsConditions
  }
  const filters = (Object.keys(props.query).length ? parsedSearchData : {}) as ICarsSearchDataExtended

  return filters
}

watch(() => [carsPage, props, props.query], async () => {
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
    await setCarsWithPagination(paginationIndexes.value.start, paginationIndexes.value.end)
    rate.value = await moneyService.getUSDtoUAH()
  } finally {
    loading.value = false
  }
})
</script>
