<template>
  <div class="h4 text-gray-dark">
    <h4>{{ title }}</h4>
    <AppSlider
      v-model="model"
      :min="min"
      :max="max"
      :step="step"
      :label="label"
      label-position="start"
      type="secondary"
    />
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title: string
  min: number
  max: number
  step: number
  label: string
}>()

const model = defineModel <[number, number]>()
</script>
