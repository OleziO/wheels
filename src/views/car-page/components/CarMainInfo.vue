<template>
  <div class="p-8 bg-creamy rounded-lg mt-11 flex flex-col gap-7">
    <h3 class="h3">Основні характеристики</h3>

    <ul
      class="flex flex-col gap-7 items-center"
    >
      <li v-for="carField in car" :key="carField.value" class="w-full grid grid-cols-2">
        <p class="body-2 text-blue-light">{{ carField.label }}</p>
        <p class="body-2 font-bold text-dark-grey">{{ carField.value }}</p>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  car: IFilterOption[]
}>()
</script>
