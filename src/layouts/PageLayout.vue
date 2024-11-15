<template>
  <div class="h-screen flex flex-col">
    <AppHeader />
    <div class="flex flex-col flex-1 overflow-y-auto">
      <main class="flex flex-col flex-grow">
        <slot />
      </main>
      <AppFooter />
      <AppScrollTopButton v-if="route.meta.needScrollToTop" />
    </div>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
</script>
