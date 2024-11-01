<template>
  <div class="h4 text-gray-dark flex flex-col gap-4">
    <h4>Об'єм двигуна (л)</h4>
    <div class="flex gap-3 items-center">
      <AppSelect
        v-model="searchData.engine[0]"
        placeholder="Всі"
        :options="searchFiltersOptions?.engine"
      />
      <p> до </p>
      <AppSelect
        v-model="searchData.engine[1]"
        placeholder="Всі"
        :options="searchFiltersOptions?.engine"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  searchFiltersOptions: any
}>()

const searchData = defineModel<ICarsSearchDataExtended>({ required: true })
</script>
