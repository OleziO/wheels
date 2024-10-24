<template>
  <el-select
    v-model="value"
    class="app-select"
  >
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value"
    />
  </el-select>
</template>

<script setup lang="ts">

defineProps<{
  options: ISelectOption[]
}>()
const value = defineModel<ISelectOption>()
</script>
