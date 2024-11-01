<template>
  <div class="flex flex-col gap-8 px-5 py-8 w-[400px]">
    <h2 class="h2 text-gray-dark">Фільтри</h2>

    <el-radio-group v-model="searchData.carsConditions" class="flex items-center gap-4">
      <RadioButton
        v-for="item in searchFiltersOptions.carsConditions"
        :key="item.value"
        :value="item.value"
      >
        {{ item.label }}
      </RadioButton>
    </el-radio-group>

    <SearchSectionLayout title="Регіон">
      <AppSelect
        v-model="searchData.location"
        placeholder="Оберіть регіон"
        :options="searchFiltersOptions?.location"
        key-value="value"
        key-label="label"
        multiple
        collapse-tags
      />
    </SearchSectionLayout>

    <SearchSectionLayout title="Тип кузова">
      <AppSelect
        v-model="searchData.bodyType"
        placeholder="Оберіть тип кузова"
        :options="searchFiltersOptions?.bodyType"
        key-value="value"
        key-label="label"
        multiple
        collapse-tags
      />
    </SearchSectionLayout>

    <SliderSection
      v-model="searchData.price"
      title="Ціна"
      :min="searchFiltersOptions?.price.min"
      :max="searchFiltersOptions?.price.max"
      :step="500"
      label="$"
    />

    <SliderSection
      v-model="searchData.mileage"
      title="Пробіг"
      :min="searchFiltersOptions?.mileage.min"
      :max="searchFiltersOptions?.mileage.max"
      :step="10"
      label="тис.км"
    />

    <SearchSectionLayout title="Марка">
      <AppSelect
        v-model="searchData.brands"
        placeholder="Оберіть марку"
        key-label="brand"
        key-value="brand"
        :options="computedSortedBrands"
        multiple
        collapse-tags
      />
    </SearchSectionLayout>

    <SearchSectionLayout title="Модель">
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
    </SearchSectionLayout>

    <YearFilter v-model="searchData" :search-filters-options="searchFiltersOptions" />

    <CheckboxGroup
      v-model="searchData.transmissionTypes"
      title="Коробка передач"
      :options="searchFiltersOptions.transmissionTypes"
    />
    <CheckboxGroup v-model="searchData.fuelTypes" title="Паливо" :options="searchFiltersOptions.fuelTypes" />
    <CheckboxGroup v-model="searchData.driveTypes" title="Тип приводу" :options="searchFiltersOptions.driveTypes" />

    <EngineFilter v-model="searchData" :search-filters-options="searchFiltersOptions" />

    <SearchSectionLayout title="Стан">
      <AppSelect
        v-model="searchData.involvedAccident"
        placeholder="Участь в дтп"
        key-label="label"
        key-value="value"
        :options="searchFiltersOptions.involvedAccident"
      />
      <AppSelect
        v-model="searchData.techCondition"
        placeholder="Технічний стан"
        key-label="label"
        key-value="value"
        :options="searchFiltersOptions.techCondition"
      />
      <AppSelect
        v-model="searchData.coating"
        placeholder="Лакофарбове покриття"
        key-label="label"
        key-value="value"
        :options="searchFiltersOptions.coating"
      />
    </SearchSectionLayout>

    <AppButton type="text" text class="hover:!bg-creamy-light">Скинути всі фільтри</AppButton>

    <AppButton
      type="secondary"
      class="w-full"
      icon="icon-search"
      @click="router.push({name: $routeNames.search, query: query})"
    >
      Шукати
    </AppButton>
  </div>
</template>

<script setup lang="ts">
import RadioButton from '@/views/search/components/shared/SearchRadioButton.vue'
import SearchSectionLayout from '@/views/search/layouts/SearchSectionLayout.vue'
import CheckboxGroup from '@/views/search/components/SearchCheckboxGroup.vue'
import SliderSection from '@/views/search/components/SearchSliderSection.vue'
import EngineFilter from '@/views/search/components/SearchEngineFilter.vue'
import YearFilter from '@/views/search/components/SearchYearFilter.vue'

import searchService from '@/services/search-service/search.service'
import { router } from '@/router'

const searchData = defineModel<ICarsSearchDataExtended>('searchData', { required: true })
const props = defineProps<{
  searchFiltersOptions: Record<string, any>
}>()

const computedSortedBrands = computed(() => {
  return (props.searchFiltersOptions.brands as TTables<'brands'>[]).sort((a, b) => a.brand.localeCompare(b.brand))
})

const pickedBrandsModels = computed(() => {
  return searchService.getPickedModels(searchData.value.brands, props.searchFiltersOptions.models)
})

const query = computed(() => searchService.convertToLocationQueryRaw(searchData.value))
</script>
