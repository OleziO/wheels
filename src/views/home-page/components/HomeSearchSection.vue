<template>
  <section class="bg-creamy px-25 py-12.5">
    <div class="w-full flex gap-25">
      <div class="flex-1 flex flex-col gap-6">
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
        <AppSelect
          v-model="searchStore.searchData.location"
          placeholder="Оберіть регіон"
          :options="searchStore.searchFilterOptions.location"
          key-value="value"
          key-label="label"
          multiple
          collapse-tags-tooltip
          collapse-tags
        />
      </div>

      <div class="flex-1">
        <div class="mb-8 body-2 text-gray-dark">
          <h4 class=" mb-3">Роки</h4>

          <div class="flex gap-9 items-center">
            <AppSelect
              v-model="searchStore.searchData.fromManufactureYear"
              placeholder="Будь-який"
              :options="searchStore.searchFilterOptions.manufactureYear"
            />

            <p> до </p>

            <AppSelect
              v-model="searchStore.searchData.toManufactureYear"
              placeholder="Будь-який"
              :options="searchStore.searchFilterOptions.manufactureYear"
            />
          </div>
        </div>
        <div class="body-2 text-gray-dark">
          <p>Ціна</p>
          <AppSlider
            v-model="searchStore.searchData.price"
            label="$"
            label-position="start"
            :min="searchStore.searchFilterOptions.price.min"
            :max="searchStore.searchFilterOptions.price.max"
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
        @click="replaceRouterQuery($routeNames.search, searchStore.searchData)"
      >
        Шукати
      </AppButton>
    </div>
  </section>
</template>

<script setup lang="ts">
import { replaceRouterQuery } from '@/router'
import { orderBy } from 'lodash-es'

const searchStore = useSearchStore()

const computedSortedBrands = computed(() => {
  return orderBy(searchStore.searchFilterOptions.brands, 'brand', 'asc')
})

</script>
