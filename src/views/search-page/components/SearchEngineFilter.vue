<template>
  <div class="h4 text-gray-dark flex flex-col gap-4">
    <h4>Об'єм двигуна (л)</h4>
    <div class="flex gap-3 items-center">
      <AppSelect
        v-model="searchType.searchData.fromEngineVolume"
        placeholder="Всі"
        :options="searchType.searchFilterOptions?.engineVolume"
      />
      <p> до </p>
      <AppSelect
        v-model="searchType.searchData.toEngineVolume"
        placeholder="Всі"
        :options="searchType.searchFilterOptions.engineVolume"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
const searchType = useSearchStore()
</script>
