<template>
  {{ query }}
</template>

<script setup lang="ts">
defineProps<{
  query: ICarsSearchData
}>()
</script>
