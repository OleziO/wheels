<template>
  <div class="h4 flex flex-col gap-2.5">
    <h4 class="text-gray-dark">{{ title }}</h4>
    <el-checkbox-group v-model="searchData" class="flex flex-col gap-2.5">
      <el-checkbox
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      >
        {{ item.label }}
      </el-checkbox>
    </el-checkbox-group>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title: string
  options: Array<{ label: string; value: string | number }>
}>()

const searchData = defineModel<string[]>({ required: true })
</script>
