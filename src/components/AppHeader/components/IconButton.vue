<template>
  <div class="relative" @mouseenter="isHovered = true" @mouseleave="isHovered = false">
    <AppButton type="icon" class="text-xl">
      <i :class="isHovered && hoverIcon ? hoverIcon : icon" />
    </AppButton>

    <div
      v-if="count && count > 0"
      class="flex items-center justify-center rounded-full
       size-4 bg-red-error text-creamy-light cursor-pointer
      absolute right-0 top-0 translate-x-1/4 -translate-y-1/4"
    >
      <span class="secondary-small leading-[normal]">{{ computedCount }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps<{
  icon: TIcons
  hoverIcon?: TIcons
  count?: number
}>()

const isHovered = ref(false)
const computedCount = computed(() => props.count && props.count > 99 ? '99' : props.count)
</script>
