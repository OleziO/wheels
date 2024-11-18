<template>
  <div v-loading.fullscreen="loading" class="w-full">
    <h3 class="h3 text-gray-dark mb-10">Моя історія переглядів</h3>

    <div v-if="!carsViewHistory.length" class="w-full h-[70%] flex justify-center items-center">
      <h4 class="h4 text-gravel">Історія переглядів відсутня</h4>
    </div>

    <div v-else class="grid grid-cols-2 gap-5">
      <CarCard
        v-for="car in carsViewHistory"
        :key="car.id"
        :car="car"
        :rate="generalStore.rate"
        @click="router.push({ name: routeNames.cars, params: { id: car.id }})"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { routeNames } from '@/router'

const router = useRouter()
const generalStore = useGeneralStore()
const authStore = useAuthStore()

const loading = ref(false)
const carsViewHistory = ref<TCar[]>([])

onMounted(async () => {
  loading.value = true

  const user = authStore.user

  if (user) { carsViewHistory.value = await profileService.getViewsHistory(user.sub) || [] }

  loading.value = false
})
</script>
