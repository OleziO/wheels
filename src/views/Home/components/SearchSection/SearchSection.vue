<template>
  <section class="bg-creamy px-25 py-12.5">
    <el-checkbox-group v-model="searchData.vehicleTypes" class="flex justify-between">
      <el-checkbox-button
        v-for="item in searchFiltersOptions?.vehicleTypes"
        :key="item.value"
        :value="item.value"
        class="vehicle-type flex flex-col justify-center items-center"
      >
        <el-image :src="`src/assets/images/home-page/${item.value}.png`" class="h-20" />
        <p class="text-gray-dark body-1">{{ item.label }}</p>
      </el-checkbox-button>
    </el-checkbox-group>

    <div class="w-full flex gap-25 mt-12">
      <div class="flex-1 flex flex-col gap-6">
        <AppSelect
          v-model="searchData.brands"
          placeholder="Оберіть марку"
          key-label="brandName"
          key-value="brandId"
          :options="searchFiltersOptions?.brands"
          multiple
          collapse-tags
        />
        <AppSelect
          v-model="searchData.models"
          grouped
          placeholder="Оберіть модель"
          group-key-label="brandName"
          group-key-value="modelsList"
          key-value="modelId"
          key-label="modelName"
          :options="groupedModels"
          multiple
          collapse-tags
        />
        <AppSelect
          v-model="searchData.cities"
          placeholder="Оберіть регіон"
          :options="searchFiltersOptions?.cities"
          key-value="cityId"
          key-label="cityName"
          multiple
          collapse-tags
        />
      </div>

      <div class="flex-1">
        <div class="mb-8 body-2 text-gray-dark">
          <h4 class=" mb-3">Роки</h4>

          <div class="flex gap-9 items-center">
            <AppSelect
              v-model="searchData.years[0]"
              placeholder="Будь-який"
              :options="searchFiltersOptions?.years"
            />

            <p> до </p>

            <AppSelect
              v-model="searchData.years.sort()[1]"
              placeholder="Будь-який"
              :options="searchFiltersOptions?.years"
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
        @click="router.push({name: routeNames.search, query: query})"
      >
        Шукати
      </AppButton>
    </div>
  </section>
</template>
<script setup lang="ts">
import { ref, onBeforeMount } from 'vue'
import SearchFilters from '@/services/search-service/search.service'
import { router } from '@/router'
import { routeNames } from '@/router/route-names'

const searchFiltersOptions = ref<ICarsFiltersOptions>(
  {
    vehicleTypes: [],
    brands: [],
    models: [],
    cities: [],
    years: [],
    price: {
      min: 0,
      max: 50000
    }
  }
)

const searchData = ref<ICarsSearchData>({
  vehicleTypes: [],
  brands: [],
  models: [],
  cities: [],
  years: [],
  price: [0, 50000]
})

const groupedModels = computed(() => {
  if (searchData.value.brands.length) {
    return searchFiltersOptions?.value.models?.filter((model) => {
      return searchData.value.brands.find(brand => {
        return brand === model.brandId
      })
    })
  } else {
    return []
  }
})

const query = computed(() => {
  return SearchFilters.convertToLocationQueryRaw(searchData.value)
})

onBeforeMount(async () => {
  SearchFilters.getHomePageFilters()
    .then((data) => { searchFiltersOptions.value = data })
    .catch(error => {
      console.error('Error fetching filters:', error)
    })
})

</script>
