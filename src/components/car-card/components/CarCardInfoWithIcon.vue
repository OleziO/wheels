<template>
  <span class="flex gap-2.5">
    <i class="text-orange secondary" :class="[icon, textColor]" />
    <p class="secondary text-gravel" :class="textColor">{{ text }}</p>
  </span>
</template>

<script setup lang="ts">
const props = defineProps<{
  text: string
  icon: TIcons
  textColor?: string
}>()

const textColor = props.textColor || ''
</script>
