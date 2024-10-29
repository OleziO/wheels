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
          key-label="brand"
          key-value="id"
          :options="searchFiltersOptions?.brands"
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
        @click="$router.push({name: $routeNames.search, query: query})"
      >
        Шукати
      </AppButton>
    </div>
  </section>
</template>

<script setup lang="ts">
const searchData = ref<ICarsSearchData>({
  vehicleTypes: [],
  brands: [],
  models: [],
  cities: [],
  years: [],
  price: [20000, 50000]
})

const vehicleTypes = ref <IVehicleType[]>([])
const brands = ref<TTables<'car brands'>[]>([])
const models = ref<TTables<'car models'>[]>([])
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

function getFilters () {
  Promise.all([searchService.getBrands(), searchService.getModels()]).then(([brandsResponse, modelsResponse]) => {
    vehicleTypes.value = searchService.vehicleTypes
    brands.value = brandsResponse
    models.value = modelsResponse
    cities.value = searchService.cities
    price.value = searchService.price
    years.value = searchService.getYears(1940, 2024)
  })
}

const pickedBrandsModels = computed(() => {
  const picedBrands = searchData.value.brands
  const mappedModelsObj = searchFiltersOptions.value.models

  if (picedBrands.length) {
    const filteredModels = picedBrands.reduce((modelsAcc, brand) => {
      if (mappedModelsObj[brand]) {
        modelsAcc[brand] = mappedModelsObj[brand]
      }
      return modelsAcc
    }, {} as Record<number, IMappedCarModel>)

    return Object.values(filteredModels)
  }

  return []
})

const query = computed(() => {
  return searchService.convertToLocationQueryRaw(searchData.value)
})

onBeforeMount(async () => {
  getFilters()
})

</script>
