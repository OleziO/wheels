<template>
  <div class="w-full min-h-[500px] flex flex-col gap-12.5 py-12.5 px-25 bg-creamy">
    <div
      class="mt-25 h-2.5 bg-orange rounded-lg flex items-center justify-end min-w-[288px]"
      :style="{ width: progressWidth + '%' }"
    >
      <el-image src="src/assets/images/orange-car.png" alt="car" class="h-[150px] rotate-180" />
    </div>

    <RouterLink v-if="published && progressWidth === 100" :to="$routeNames.home" class="mx-auto mt-12.5">
      <AppButton>На головну</AppButton>
    </RouterLink>

    <p v-else class="mt-12.5 mx-auto body-2">Зачекайте, ваше оголошення публікується...</p>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  createLoading: boolean
  published: boolean
}>()

const progressWidth = ref(0)

onMounted(() => {
  if (props.createLoading) {
    startProgress()
  }
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
