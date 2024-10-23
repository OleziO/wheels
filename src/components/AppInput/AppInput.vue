<template>
  <el-input v-model="model" class="text-lg">
    <template v-if="buttonIcon || buttonText" #append>
      <AppButton :icon="buttonIcon"> {{ buttonText }} </AppButton>
    </template>
  </el-input>
</template>

<script setup lang="ts">

defineProps<{
  buttonText?: string
  buttonIcon?: TIcons
}>()

const model = defineModel<string>('')
</script>
