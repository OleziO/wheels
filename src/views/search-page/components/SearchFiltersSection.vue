<template>
  <div class="flex flex-col gap-8 px-5 py-8 min-w-[400px] max-w-[400px]">
    <h2 class="h2 text-gray-dark">Фільтри</h2>

    <el-radio-group v-model="searchStore.searchData.carsConditions" class="flex items-center gap-4">
      <SearchRadioButton
        v-for="item in searchStore.searchFilterOptions.carsConditions"
        :key="item.label"
        :value="item.value"
      >
        {{ item.label }}
      </SearchRadioButton>
    </el-radio-group>

    <SearchSectionWrapper title="Регіон">
      <AppSelect
        v-model="searchStore.searchData.location"
        placeholder="Оберіть регіон"
        :options="searchStore.searchFilterOptions?.location"
        key-value="value"
        key-label="label"
        multiple
        collapse-tags-tooltip
        collapse-tags
      />
    </SearchSectionWrapper>

    <SearchSectionWrapper title="Тип кузова">
      <AppSelect
        v-model="searchStore.searchData.bodyType"
        placeholder="Оберіть тип кузова"
        :options="searchStore.searchFilterOptions?.bodyType"
        key-value="value"
        key-label="label"
        multiple
        collapse-tags-tooltip
        collapse-tags
      />
    </SearchSectionWrapper>

    <SearchSliderSection
      v-model="searchStore.searchData.price"
      title="Ціна"
      :min="searchStore.searchFilterOptions?.price.min"
      :max="searchStore.searchFilterOptions?.price.max"
      :step="500"
      label="$"
    />

    <SearchSliderSection
      v-model="searchStore.searchData.mileage"
      title="Пробіг"
      :min="searchStore.searchFilterOptions?.mileage.min"
      :max="searchStore.searchFilterOptions?.mileage.max"
      :step="10"
      label="тис.км"
    />

    <SearchSectionWrapper title="Марка">
      <AppSelect
        v-model="searchStore.searchData.brands"
        placeholder="Оберіть марку"
        key-label="brand"
        key-value="brand"
        :options="computedSortedBrands"
        multiple
        collapse-tags-tooltip
        collapse-tags
      />
    </SearchSectionWrapper>

    <SearchSectionWrapper title="Модель">
      <el-tooltip
        effect="dark"
        :disabled="!!searchStore.searchData.brands.length"
        content="Спершу оберіть марку"
        placement="top"
      >
        <AppSelect
          v-model="searchStore.searchData.models"
          placeholder="Оберіть модель"
          group-key-label="brand"
          group-key-value="models"
          :disabled="!searchStore.searchData.brands.length"
          key-value="id"
          key-label="model"
          :options="searchStore.mappedModels(searchStore.searchData.brands)"
          multiple
          collapse-tags-tooltip
          collapse-tags
        />
      </el-tooltip>
    </SearchSectionWrapper>

    <SearchYearFilter v-model="searchStore.searchData" :search-filters-options="searchStore.searchFilterOptions" />

    <SearchCheckboxGroup
      v-model="searchStore.searchData.transmissionTypes"
      title="Коробка передач"
      :options="searchStore.searchFilterOptions.transmissionTypes"
    />
    <SearchCheckboxGroup
      v-model="searchStore.searchData.fuelTypes"
      title="Паливо"
      :options="searchStore.searchFilterOptions.fuelTypes"
    />
    <SearchCheckboxGroup
      v-model="searchStore.searchData.driveTypes"
      title="Тип приводу"
      :options="searchStore.searchFilterOptions.driveTypes"
    />

    <SearchEngineFilter v-model="searchStore.searchData" :search-filters-options="searchStore.searchFilterOptions" />

    <SearchSectionWrapper title="Стан">
      <AppSelect
        v-model="searchStore.searchData.involvedAccident"
        placeholder="Участь в дтп"
        key-label="label"
        key-value="value"
        :options="searchStore.searchFilterOptions.involvedAccident"
        multiple
        collapse-tags-tooltip
        collapse-tags
      />
      <AppSelect
        v-model="searchStore.searchData.techCondition"
        placeholder="Технічний стан"
        key-label="label"
        key-value="value"
        :options="searchStore.searchFilterOptions.techCondition"
        multiple
        collapse-tags-tooltip
        collapse-tags
      />
      <AppSelect
        v-model="searchStore.searchData.paintType"
        placeholder="Лакофарбове покриття"
        key-label="label"
        key-value="value"
        :options="searchStore.searchFilterOptions.paintType"
        multiple
        collapse-tags-tooltip
        collapse-tags
      />
    </SearchSectionWrapper>

    <div class="flex flex-col gap-3">
      <AppButton
        type="text"
        text
        class="hover:!bg-creamy-light body-2"
        icon="icon-filter-off"
        @click="resetFilters"
      >
        Скинути всі фільтри
      </AppButton>
    </div>
  </div>
</template>

<script setup lang="ts">

import { replaceRouterQuery, routeNames, validateData } from '@/router'
import { cloneDeep, orderBy } from 'lodash-es'

const searchStore = useSearchStore()

const computedSortedBrands = computed(() => {
  return orderBy(searchStore.searchFilterOptions.brands, 'brand', 'asc')
})

function resetFilters () {
  searchStore.searchData = cloneDeep(searchStore.defaultSearchData)
  replaceRouterQuery(routeNames.search, validateData(searchStore.searchData))
}

</script>
