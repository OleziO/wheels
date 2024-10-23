<template>
  <div class="flex flex-col gap-4">
    <AppButton type="primary">Test Test</AppButton>
    <AppButton type="primary" icon="icon-shop">Test Test</AppButton>
    <AppButton type="secondary">Test Test</AppButton>
    <AppButton type="secondary" icon="icon-shop">Test Test</AppButton>
    <AppButton type="line-light">Test Test</AppButton>
    <AppButton type="line-light" icon="icon-shop">Test Test</AppButton>
    <AppButton type="line-dark">Test Test</AppButton>
    <AppButton type="line-dark" icon="icon-shop">Test Test</AppButton>
    <AppButton type="text">Test Test</AppButton>
    <AppButton type="text" icon="icon-shop">Test Test</AppButton>

    <AppSlider :min="0" :max="10" label="$" :step="1" />
    <AppSlider :min="0" :max="10" label="$" label-position="start" :step="1" />
    <AppSlider :min="0" :max="10" label="$" :step="1" type="secondary" />
    <AppSlider :min="0" :max="10" label="$" label-position="start" :step="1" type="secondary" />

    <el-checkbox class="mt-6" label="Test" value="Test 1" />
    <el-checkbox label="Test" value="Test 2" checked />
    <el-checkbox label="Test" value="Test 3" disabled />
    <el-checkbox label="Test" value="Test 4" checked disabled />

    <AppInput v-model="text" placeholder="Name:" />
    <AppInput v-model="password" placeholder="Passwrd:" type="password" show-password />
    <AppInput v-model="textBtn" placeholder="Text button:" button-text="Test Test" />
    <AppInput
      v-model="textBtnWithIcon"
      placeholder="Text button with icon:"
      button-text="Test Test"
      button-icon="icon-shop"
    />
    <AppInput v-model="iconBtn" placeholder="Icon button:" button-icon="icon-shop" />

    <el-link>Test Link</el-link>
  </div>
</template>

<script setup lang="ts">
const text = ref<string>('')
const password = ref<string>('')
const textBtn = ref<string>('')
const textBtnWithIcon = ref<string>('')
const iconBtn = ref<string>('')
</script>
