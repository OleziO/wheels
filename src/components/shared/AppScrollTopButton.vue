<template>
  <AppButton icon="icon-arrow-up" class="fixed z-50 bottom-10 right-10 w-14 h-14" @click="scrollToTop" />
</template>

<script setup lang="ts">
const generalStore = useGeneralStore()

function scrollToTop () {
  if (generalStore.mainContainerRef) {
    generalStore.mainContainerRef.scrollTo({ top: 0, behavior: 'smooth' })
  }
}

</script>
