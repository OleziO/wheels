<template>
  <AppButton
    ref="scrollButtonRef"
    icon="icon-arrow-up"
    class="fixed z-50 bottom-10 right-10 w-14 h-14"
    @click="scrollParent"
  />
</template>

<script setup lang="ts">

const scrollButtonRef = useTemplateRef('scrollButtonRef')

function scrollParent () {
  scrollButtonRef.value?.$el.parentElement.scrollTo({ top: 0, behavior: 'smooth' })
}

</script>
