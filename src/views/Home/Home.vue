<template>
  <div v-loading.fullscreen="loading">
    <HeroSection />
    <SearchSection :search-filters-options="searchFiltersOptions" />
    <SellingSection />
    <PopularSearches />
    <OffersSection :cars-data="cars" />
    <FavoriteCarsBrandsSection :brands="popularBrands" />
    <UsefulInfoSection />
    <FAQSection />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import HeroSection from './components/HomeHeroSection.vue'
import SearchSection from './components/HomeSearchSection.vue'
import SellingSection from './components/HomeSellingSection.vue'
import PopularSearches from './components/HomePopularSearchesSection.vue'
import OffersSection from './components/HomeOffersSection.vue'
import FavoriteCarsBrandsSection from './components/HomeFavoriteBrandsSection.vue'
import UsefulInfoSection from './components/HomeUsefulInfoSection.vue'
import FAQSection from './components/HomeFAQSection.vue'
import moneyService from '@/services/money.service'
import carsService from './cars.service'
import searchService from '@/services/search-service/search.service'

const rate = ref(0)
const cars = ref<TCar[]>([])
const vehicleTypes = ref <IVehicleType[]>([])
const brands = ref<TTables<'brands'>[]>([])
const models = ref<TTables<'models'>[]>([])
const cities = ref<ICarCity[]>([])
const price = ref<ICarPriceFilter>({ min: 0, max: 50000 })
const years = ref<ICarYearFilter[]>([])

const searchFiltersOptions = computed(() => {
  return {
    vehicleTypes: vehicleTypes.value,
    brands: brands.value,
    models: searchService.groupModelsByBrand(brands.value, models.value),
    cities: cities.value,
    price: price.value,
    years: years.value
  }
})

const loading = ref(false)

const popularBrands = computed(() => {
  return brands.value.slice(0, 5)
})

async function fetchData () {
  const [rateData, carsData] = await Promise.all([
    moneyService.gettUSDtoUAH(),
    carsService.getPopularCars()
  ])

  rate.value = rateData || 0
  cars.value = (carsData as TCar[]) || []
}

function getFilters () {
  return Promise.all([searchService.getBrands(), searchService.getModels()])
    .then(([brandsResponse, modelsResponse]) => {
      vehicleTypes.value = searchService.vehicleTypes
      brands.value = brandsResponse
      models.value = modelsResponse
      cities.value = searchService.cities
      price.value = searchService.price
      years.value = searchService.getYears(1940, 2024)
    })
}

onMounted(async () => {
  try {
    loading.value = true
    await getFilters()
    await fetchData()
  } catch (error) {
    console.error('Error fetching home data:', error)
  } finally {
    loading.value = false
  }
})
</script>
