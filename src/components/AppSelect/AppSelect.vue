<template>
  <el-select
    v-model="model"
    class="app-select"
  >
    <el-option
      v-for="item in options"
      :key="item[keyLabel]"
      :label="item[keyLabel]"
      :value="item[keyValue]"
    />
  </el-select>
</template>

<script setup lang="ts">

defineProps<{
  options: Record<string, any>[]
  keyLabel: string
  keyValue: string
}>()
const model = defineModel<any>()
</script>
