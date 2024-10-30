<template>
  <el-button
    class="flex items-center justify-center gap-2.5 rounded-lg text-creamy-light border-none text-lg"
    :text="type === 'text'"
    :class="type"
  >
    <template v-if="!!icon" #icon>
      <i :class="icon" />
    </template>

    <span v-if="iconSuffix" class="flex gap-2.5 items-center">
      <slot />
    </span>

    <slot v-else />
  </el-button>
</template>

<script setup lang="ts">
type TButtonTypes = 'primary' | 'secondary' | 'line-light' | 'line-dark' | 'text' | 'icon'

withDefaults(
  defineProps<{
    type?: TButtonTypes
    icon?: TIcons
    iconSuffix?: boolean
  }>(),
  {
    type: 'primary'
  }
)

</script>
