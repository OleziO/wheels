<template>
  <div ref="wrapperRef" class="flex items-center justify-center overflow-hidden">
    <img
      v-show="isLoaded"
      ref="imgRef"
      class="object-cover"
      :alt="alt"
      :data-url="src"
      @load="onLoad"
      @error="onError"
    >
    <slot name="loader" :isLoading="isLoading">
      <el-skeleton
        v-if="shouldTryLoad"
        :loading="isLoading"
        animated
        class="h-full"
      >
        <template #template>
          <el-skeleton-item variant="image" class="!w-full !h-full" />
        </template>
      </el-skeleton>
    </slot>

    <slot v-if="hasError" name="error" />
  </div>
</template>

<script lang="ts" setup>

defineProps<{
  src?: string
  alt?: string
}>()

const emit = defineEmits(['error', 'load'])

const observerOptions = {
  root: null,
  rootMargin: '300px',
  threshold: 0
}
const observer = new IntersectionObserver(onIntersect, observerOptions)

const wrapperRef = ref<HTMLElement | null>(null)
const imgRef = ref<HTMLImageElement | null>(null)

const isLoading = ref(false)
const isLoaded = ref(false)
const hasError = ref(false)

const shouldTryLoad = computed(() => !isLoaded.value && !hasError.value)

function loadImage () {
  isLoading.value = true

  if (imgRef.value) {
    imgRef.value.src = imgRef.value.dataset.url || ''
  }
}

function onError () {
  hasError.value = true
  isLoading.value = false
  emit('error')
}

function onLoad () {
  isLoading.value = false
  isLoaded.value = true
  emit('load')
}

function onIntersect (entries: IntersectionObserverEntry[]) {
  entries.forEach(entry => {
    if (entry.isIntersecting && shouldTryLoad.value) {
      loadImage()
    }
  })
}

onMounted(() => {
  if (wrapperRef.value) observer.observe(wrapperRef.value)
})

onUnmounted(() => {
  if (wrapperRef.value) observer.unobserve(wrapperRef.value)
})

</script>
