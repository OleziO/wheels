<template>
  <div v-loading.fullscreen="loading">
    <HomeHeroSection />
    <HomeSearchSection />
    <HomeSellingSection />
    <HomePopularSearchesSection />
    <HomeOffersSection :cars-data="cars" :rate="generalStore.rate" />
    <HomeFavoriteBrandsSection :brands="popularBrands" />
    <HomeUsefulInfoSection />
    <HomeFAQSection />
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
import { cloneDeep } from 'lodash-es'

const searchStore = useSearchStore()
const generalStore = useGeneralStore()

const popularBrands = ref<IPopularBrand[]>([])
const cars = ref<TCar[]>([])

const loading = ref(false)

async function fetchData () {
  const carsData = await homeService.getPopularCars()

  cars.value = carsData as TCar[]
}

async function init () {
  loading.value = true
  try {
    await fetchData()
    searchStore.searchData = cloneDeep(searchStore.defaultSearchData)
    searchStore.getSearchFilterOptions()
    popularBrands.value = await homeService.getPopularBrands()
  } catch (error) {
    console.error('Error fetching home data:', error)
  } finally {
    loading.value = false
  }
}

onMounted(init)
</script>
