<template>
  <RouterLink class="el-link is-underline" :to="{name: to}">
    <slot />
  </RouterLink>
</template>

<script setup lang="ts">
defineProps<{
  to: string
}>()
</script>
