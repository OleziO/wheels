<template>
  <div class="h-screen flex flex-col">
    <AppHeader />
    <div ref="mainContainerRef" class="flex flex-col flex-1 overflow-y-auto">
      <main class="flex flex-col flex-grow">
        <slot />
      </main>
      <AppFooter />
    </div>
  </div>
</template>

<script setup lang="ts">
const generalStore = useGeneralStore()
const mainContainerRef = ref<HTMLElement | null>(null)
generalStore.mainContainerRef = mainContainerRef
</script>
