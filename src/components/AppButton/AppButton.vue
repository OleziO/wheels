<template>
  <el-button
    class="flex items-center justify-center gap-2.5 rounded-lg text-creamy-light border-none text-lg"
    :text="type === 'text'"
    :class="type"
  >
    <template v-if="!!icon" #icon>
      <i :class="icon" />
    </template>

    <slot />
  </el-button>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    type?: TButtonTypes
    icon?: TIcons
  }>(),
  {
    type: 'primary'
  }

)
</script>
