<template>
  <AppHeader />
  <main class="flex flex-col flex-grow mt-16">
    <slot />
  </main>
  <AppFooter />
</template>

<script setup lang="ts">

const generalSotre = useGeneralStore()
const userData = localStorage.getItem('userData')

if (userData) generalSotre.user = JSON.parse(userData)

</script>
