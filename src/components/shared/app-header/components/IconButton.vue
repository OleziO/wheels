<template>
  <div class="relative" @mouseenter="isHovered = true" @mouseleave="isHovered = false">
    <AppButton type="icon" class="text-xl !text-blue-light">
      <i :class="isHovered && hoverIcon ? hoverIcon : icon" />
    </AppButton>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

defineProps<{
  icon: TIcons
  hoverIcon?: TIcons
}>()

const isHovered = ref(false)
</script>
