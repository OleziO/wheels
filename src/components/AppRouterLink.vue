<template>
  <RouterLink class="el-link el-link--default is-underline" :to="{name: to}">
    <slot />
  </RouterLink>
</template>

<script setup lang="ts">
defineProps<{
  to: string
}>()
</script>
