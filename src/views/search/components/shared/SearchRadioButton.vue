<template>
  <el-radio-button
    :value="value"
    class="search-radio flex justify-center items-center w-full"
  >
    <slot />
  </el-radio-button>
</template>

<script setup lang="ts">
defineProps<{
  value: string
}>()

</script>
