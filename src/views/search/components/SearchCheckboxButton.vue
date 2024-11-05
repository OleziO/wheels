<template>
  <el-checkbox-button
    :value="value"
    class="search-type flex justify-center items-center w-full"
  >
    <slot />
  </el-checkbox-button>
</template>

<script setup lang="ts">
defineProps<{
  value: string | boolean | number
}>()

</script>
