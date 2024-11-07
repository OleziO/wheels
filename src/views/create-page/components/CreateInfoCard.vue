<template>
  <div class="py-8 px-12.5 bg-green-dark flex flex-col text-creamy-light rounded-lg">
    <i class="text-[64px] mx-auto" :class="icon" />
    <h4 class="h4 mt-5">{{ title }}</h4>
    <p class="body-2 mt-4"> {{ text }}</p>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  icon: TIcons
  title: string
  text: string
}>()
</script>
