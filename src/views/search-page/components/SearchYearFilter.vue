<template>
  <div class="h4 text-gray-dark flex flex-col gap-4">
    <h4>Роки</h4>
    <div class="flex gap-3 items-center">
      <AppSelect
        v-model="searchStore.searchData.fromManufactureYear"
        placeholder="Всі"
        :options="searchStore.searchFilterOptions?.manufactureYear"
      />
      <p> до </p>
      <AppSelect
        v-model="searchStore.searchData.toManufactureYear"
        placeholder="Всі"
        :options="searchStore.searchFilterOptions?.manufactureYear"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
const searchStore = useSearchStore()
</script>
