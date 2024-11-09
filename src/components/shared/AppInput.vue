<template>
  <el-input v-model="model">
    <template v-if="withButton" #append>
      <slot />
    </template>
  </el-input>
</template>

<script setup lang="ts">

defineProps<{
  withButton?: boolean
}>()

const model = defineModel<string>()
</script>
