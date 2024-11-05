<template>
  <div class="h4 flex flex-col gap-2.5">
    <h4 class="text-gray-dark">{{ title }}</h4>
    <slot />
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title: string
}>()
</script>
