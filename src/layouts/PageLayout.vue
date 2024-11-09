<template>
  <AppHeader />
  <main class="flex flex-col flex-grow mt-16">
    <slot />
  </main>
  <AppFooter />
</template>

<script setup lang="ts">
import { useAuthStore } from '@/views/auth/auth.store'

const authStore = useAuthStore()
const userData = localStorage.getItem('userData')

if (userData) authStore.user = JSON.parse(userData)

</script>
