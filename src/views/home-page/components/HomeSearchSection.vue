<template>
  <section class="bg-creamy px-25 py-12.5">
    <div class="w-full flex gap-25">
      <div class="flex-1 flex flex-col gap-6">
        <AppSelect
          v-model="searchData.brands"
          placeholder="Оберіть марку"
          key-label="brand"
          key-value="brand"
          :options="computedSortedBrands"
          multiple
          collapse-tags
        />
        <AppSelect
          v-model="searchData.models"
          grouped
          placeholder="Оберіть модель"
          group-key-label="brand"
          group-key-value="models"
          key-value="id"
          key-label="model"
          :options="pickedBrandsModels"
          multiple
          collapse-tags
        />
        <AppSelect
          v-model="searchData.location"
          placeholder="Оберіть регіон"
          :options="searchFiltersOptions?.cities"
          key-value="value"
          key-label="label"
          multiple
          collapse-tags
        />
      </div>

      <div class="flex-1">
        <div class="mb-8 body-2 text-gray-dark">
          <h4 class=" mb-3">Роки</h4>

          <div class="flex gap-9 items-center">
            <AppSelect
              v-model="searchData.manufactureYear[0]"
              placeholder="Будь-який"
              :options="searchFiltersOptions?.manufactureYear"
            />

            <p> до </p>

            <AppSelect
              v-model="searchData.manufactureYear[1]"
              placeholder="Будь-який"
              :options="searchFiltersOptions?.manufactureYear"
            />
          </div>
        </div>
        <div class="body-2 text-gray-dark">
          <p>Ціна</p>
          <AppSlider
            v-model="searchData.price"
            label="$"
            label-position="start"
            :min="searchFiltersOptions?.price.min"
            :max="searchFiltersOptions?.price.max"
            :step="500"
          />
        </div>
      </div>
    </div>

    <div class="w-full flex items-center gap-25 mt-12">
      <AppButton disabled icon="icon-search" type="line-light" class="w-full">Розширений пошук</AppButton>
      <AppButton
        class="w-full"
        icon="icon-search"
        @click="router.replace({name: $routeNames.search, query: query})"
      >
        Шукати
      </AppButton>
    </div>
  </section>
</template>

<script setup lang="ts">
import searchService from '@/services/search-service/search.service'
import { router } from '@/router'

const props = defineProps<{
  searchFiltersOptions: any
}>()

const searchData = ref<ICarsSearchData>({
  vehicleTypes: [],
  brands: [],
  models: [],
  location: [],
  manufactureYear: [],
  price: [0, 1000000]
})

const computedSortedBrands = computed(() => {
  return ([...props.searchFiltersOptions.brands as TTables<'brands'>[]]).sort((a, b) => a.brand.localeCompare(b.brand))
})

const pickedBrandsModels = computed(() => {
  return searchService.getPickedModels(searchData.value.brands, props.searchFiltersOptions.models)
})

const query = computed(() => {
  return searchService.convertToLocationQueryRaw(searchData.value)
})

</script>
