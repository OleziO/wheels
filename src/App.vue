<template>
  <div class="min-h-screen flex flex-col">
    <ElConfigProvider
      :locale="{
        name: locale,
        el: messages[locale]?.el as TElementPlus['TranslatePair']
      }"
    >
      <PageLayout>
        <router-view />
      </PageLayout>
    </ElConfigProvider>
  </div>
</template>

<script lang="ts" setup>
import PageLayout from './layouts/PageLayout.vue'
const { messages, locale } = useI18n()
</script>
