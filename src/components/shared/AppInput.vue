<template>
  <el-input v-model="model">
    <template #append>
      <slot />
    </template>
  </el-input>
</template>

<script setup lang="ts">

const model = defineModel<string>('')
</script>
