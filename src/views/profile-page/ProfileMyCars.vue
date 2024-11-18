<template>
  <div v-loading.fullscreen="loading" class="flex-1">
    <h3 class="h3 text-gray-dark mb-10">Мої оголошення</h3>

    <div v-if="!myCars.length" class="w-full h-[70%] flex justify-center items-center">
      <h4 class="h4 text-gravel">Оголошення відсутні</h4>
    </div>

    <div v-else class="flex flex-col gap-10 w-full">
      <ProfileMyCarCard
        v-for="car in myCars"
        :key="car.id"
        :car="car"
        :rate="generalStore.rate"
        @delete="handleDeleteCar"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ElMessageBox } from 'element-plus'
import ProfileMyCarCard from '@/views/profile-page/components/ProfileMyCarCard.vue'

const loading = ref(false)
const generalStore = useGeneralStore()
const authStore = useAuthStore()

const myCars = ref<TCar[]>([])

async function handleDeleteCar (carId: string, carTitle: string) {
  try {
    await showDeleteConfirmation(carTitle)

    loading.value = true

    await deleteCarAndUpdateList(carId)

    loading.value = false
    showSuccessMessage()
  } catch (error) {
    showCancelMessage()
  }
}

async function showDeleteConfirmation (carTitle: string) {
  return ElMessageBox.confirm(
    `Ви дійсно бажаєте видалити оголошення “${carTitle}”`,
    'Видалення автомобіля',
    {
      confirmButtonText: 'Так',
      cancelButtonText: 'Скасувати',
      type: 'warning'
    }
  )
}

async function deleteCarAndUpdateList (carId: string) {
  await profileService.deleteCar(carId)
  myCars.value = await profileService.getMyCars(authStore.user?.sub) || []
}

function showSuccessMessage () {
  ElMessage({
    type: 'success',
    message: 'Успішне видалення'
  })
}

function showCancelMessage () {
  ElMessage({
    type: 'info',
    message: 'Видалення скасовано'
  })
}

onMounted(async () => {
  loading.value = true

  const user = authStore.user

  if (user) { myCars.value = await profileService.getMyCars(user.sub) || [] }

  loading.value = false
})
</script>
