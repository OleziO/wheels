<template>
  <div class="w-full h-full min-h-[500px] flex justify-center items-center py-12.5 px-25 bg-creamy">
    <div class="w-full h-full flex flex-col gap-12.5 ">
      <h2 class="h2 mb-10 mx-auto">Публікація оголошення</h2>
      <div
        class="mt-25 h-2.5 bg-orange rounded-lg flex items-center justify-end min-w-[288px]"
        :style="{ width: progressWidth + '%' }"
      >
        <el-image :src="OrangeCar" alt="car" class="h-[150px] rotate-180" />
      </div>

      <p class="mt-12.5 mx-auto body-2">Зачекайте, ваше оголошення публікується...</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import OrangeCar from '@/assets/images/orange-car.png'

const props = defineProps<{
  createLoading: boolean
}>()

const isPublished = defineModel<IPublishStatus>({ required: true })

const progressWidth = ref(0)

onMounted(() => {
  if (props.createLoading) {
    startProgress()
  }
})

watch(() => progressWidth.value, () => {
  if (progressWidth.value === 100) { isPublished.value.isProgressEnd = true }
})

function startProgress () {
  progressWidth.value = 0

  const interval = setInterval(() => {
    if (progressWidth.value + 0.1 <= 100) {
      progressWidth.value += 0.1
    } else {
      progressWidth.value = 100
      clearInterval(interval)
    }
  }, 4)
}
</script>
