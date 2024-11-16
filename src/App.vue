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
import PageLayout from '@/layouts/PageLayout.vue'
import { useAuthStore } from '@/views/auth/auth.store'

const authStore = useAuthStore()
const { messages, locale } = useI18n()

const userData = localStorage.getItem('userData')

if (userData) authStore.user = JSON.parse(userData)

const generalStore = useGeneralStore()

onMounted(() => {
  generalStore.rate = moneyService.getUSDtoUAH()
})

</script>
