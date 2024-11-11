<template>
  <div class="grid grid-cols-[300px_500px] items-center">
    <p class="body-2 text-gray-dark">{{ title }}</p>
    <el-form-item :prop="prop">
      <slot />
    </el-form-item>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title: string
  prop: string
}>()
</script>
