<template>
  <div v-loading.fullscreen="loading" class="w-full flex justify-between px-25 mt-12 gap-5 max-w-[1440px] mx-auto">
    <SearchFiltersSection v-model="searchStore.searchData" :searchFiltersOptions="searchStore.searchFilterOptions" />

    <div class="w-full flex flex-col items-center gap-4 py-8">
      <AppInput
        v-model="searchStore.searchData.search"
        :disabled="true"
        withButton
        placeholder="Що ви шукаєте?"
      >
        <AppButton
          class="px-8"
          icon="icon-search"
          @click="search"
        >
          Шукати
        </AppButton>
      </AppInput>

      <div class="w-full pb-5">
        <p class="w-full flex justify-end body-1 text-gravel mb-4">Результатів: {{ totalCarsCount }}</p>
        <div class="flex w-full gap-5">
          <AppSelect
            v-model="sortElement"
            placeholder="Сортування"
            key-value="value"
            key-label="label"
            :options="searchStore.searchFilterOptions.sortingTypes"
            @change="selectSortingType"
          />
          <AppSelect
            v-model="searchStore.searchData.perPage"
            placeholder="Оголошень на сторінці"
            key-value="value"
            key-label="label"
            :options="searchStore.searchFilterOptions.perPage"
          />
        </div>
      </div>

      <SearchCarList
        v-model="searchStore.searchData"
        :rate="generalStore.rate"
        :cars="cars"
        :per-page="searchStore.searchData.perPage"
        :total-cars-count="totalCarsCount"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { replaceRouterQuery, routeNames, validateData } from '@/router'
import { searchService } from '@/services/index.service'
import { cloneDeep } from 'lodash-es'

const props = defineProps<{
  query: ICarsSearchData
}>()

const searchStore = useSearchStore()
const generalStore = useGeneralStore()

const sortElement = ref(searchStore.searchFilterOptions.sortingTypes[0])

const loading = ref(false)

const cars = ref<TCar[]>([])
const totalCarsCount = ref(0)

const paginationIndexes = computed(() => {
  const start = (+searchStore.searchData.page - 1) * +searchStore.searchData.perPage
  const end = start + (+searchStore.searchData.perPage - 1)

  return {
    start,
    end
  }
})

function search () {
  replaceRouterQuery(routeNames.search, validateData(searchStore.searchData))
  setCarsWithPagination(paginationIndexes.value.start, paginationIndexes.value.end)
}

function selectSortingType (value: {type: string; order: string}) {
  const selectedOption = searchStore.searchFilterOptions.sortingTypes.find(
    option => option.value.type === value.type && option.value.order === value.order
  )

  searchStore.searchData.sortingType = value.type as keyof TCar
  searchStore.searchData.sortingOrder = value.order as 'asc' | 'desc'
  sortElement.value = selectedOption
}

watch(() => [searchStore.searchData,
  searchStore.searchData.perPage,
  searchStore.searchData.page,
  searchStore.searchData.sortingType,
  searchStore.searchData.sortingOrder], () => {
  search()
})

async function setCarsWithPagination (start: number, end: number) {
  loading.value = true
  try {
    totalCarsCount.value = await searchService.getCarsCount(searchStore.searchData)
    cars.value = await searchService.getCarsWithPagination(start, end)
  } finally {
    loading.value = false
  }
}

async function init () {
  loading.value = true
  try {
    searchStore.searchData = cloneDeep(searchStore.defaultSearchData)
    searchStore.setSearchDataFromQuery(props.query)
    await searchStore.getSearchFilterOptions()
    await setCarsWithPagination(paginationIndexes.value.start, paginationIndexes.value.end)
  } catch (error) {
    console.error('Error fetching home data:', error)
  } finally {
    loading.value = false
  }
}

onMounted(init)

</script>
