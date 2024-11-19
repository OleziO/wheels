<template>
  <RouterLink class="el-link" :to="{name: to}" :class="{ 'is-underline': underlined }">
    <slot />
  </RouterLink>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    to: string
    underlined?: boolean
  }>(),
  {
    underlined: true
  }
)

</script>
