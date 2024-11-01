<template>
  <div v-loading.fullscreen="loading">
    <HeroSection />
    <SearchSection :search-filters-options="searchFiltersOptions" />
    <SellingSection />
    <PopularSearches />
    <OffersSection :cars-data="cars" :rate="rate" />
    <FavoriteCarsBrandsSection :brands="popularBrands" />
    <UsefulInfoSection />
    <FAQSection />
    <div class="w-full text-center">
      <RouterLink
        class="text-orange hover:bg-creamy-light mb-12
        hover:text-orange-light inline-flex flex-col items-center gap-4 mx-auto"
        :to="{ name: $routeNames.home }"
      >
        <i class="icon-arrow-up-s" />
        <span>На початок</span>
      </RouterLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

import FavoriteCarsBrandsSection from '@/views/home/components/HomeFavoriteBrandsSection.vue'
import PopularSearches from '@/views/home/components/HomePopularSearchesSection.vue'
import UsefulInfoSection from '@/views/home/components/HomeUsefulInfoSection.vue'
import SellingSection from '@/views/home/components/HomeSellingSection.vue'
import SearchSection from '@/views/home/components/HomeSearchSection.vue'
import OffersSection from '@/views/home/components/HomeOffersSection.vue'
import HeroSection from '@/views/home/components/HomeHeroSection.vue'
import FAQSection from '@/views/home/components/HomeFAQSection.vue'

import searchService from '@/services/search-service/search.service'
import moneyService from '@/services/money.service'
import carsService from '@/views/home/cars.service'

const vehicleTypes = ref<TTables<'vehicle_types'>[]>([])
const price = ref<IRangeOption>({ min: 0, max: 1000000 })
const cities = ref<TTables<'locations'>[]>([])
const brands = ref<TTables<'brands'>[]>([])
const models = ref<TTables<'models'>[]>([])
const years = ref<IFilterOption[]>([])
const cars = ref<TCar[]>([])
const rate = ref(0)

const searchFiltersOptions = computed(() => {
  return {
    models: searchService.groupModelsByBrand(brands.value, models.value),
    vehicleTypes: vehicleTypes.value,
    brands: brands.value,
    cities: cities.value,
    price: price.value,
    manufactureYear: years.value
  }
})

const loading = ref(false)

const popularBrands = computed(() => {
  return brands.value.slice(0, 5)
})

async function fetchData () {
  const [rateData, carsData] = await Promise.all([
    moneyService.getUSDtoUAH(),
    carsService.getPopularCars()
  ])

  rate.value = rateData || 0
  cars.value = (carsData as TCar[]) || []
}

function getFilters () {
  return searchService.getFilters()
    .then(([brandsResponse, modelsResponse, locationResponse, vehicleTypesResponse]) => {
      years.value = searchService.getYears(1940)
      vehicleTypes.value = vehicleTypesResponse
      price.value = searchService.price
      cities.value = locationResponse
      brands.value = brandsResponse
      models.value = modelsResponse
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
