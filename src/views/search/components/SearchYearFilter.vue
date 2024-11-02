<template>
  <div class="h4 text-gray-dark flex flex-col gap-4">
    <h4>Роки</h4>
    <div class="flex gap-3 items-center">
      <AppSelect
        v-model="searchData.manufactureYear[0]"
        placeholder="Всі"
        :options="searchFiltersOptions?.manufactureYear"
      />
      <p> до </p>
      <AppSelect
        v-model="searchData.manufactureYear[1]"
        placeholder="Всі"
        :options="searchFiltersOptions?.manufactureYear"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  searchFiltersOptions: ISearchFiltersOptions
}>()

const searchData = defineModel<ICarsSearchDataExtended>({ required: true })
</script>
