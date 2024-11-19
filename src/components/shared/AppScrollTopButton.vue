<template>
  <AppButton
    ref="scrollButtonRef"
    icon="icon-arrow-up"
    class="fixed z-40 bottom-10 right-10 w-14 h-14"
    @click="scrollParent"
  />
</template>

<script setup lang="ts">

const router = useRouter()

const scrollButtonRef = useTemplateRef('scrollButtonRef')

function scrollParent () {
  scrollButtonRef.value?.$el.parentElement.scrollTo({ top: 0, behavior: 'smooth' })
}

router.afterEach(() => {
  scrollParent()
})

</script>
