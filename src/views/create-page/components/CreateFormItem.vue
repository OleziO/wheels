<template>
  <div class="grid grid-cols-[300px_500px] items-center">
    <p class="body-2 text-gray-dark">{{ title }}</p>
    <slot />
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title: string
}>()
</script>
