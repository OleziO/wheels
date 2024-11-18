<template>
  <CreateCar v-if="carData" v-model:carData="carData" />
</template>

<script setup lang="ts">
import CreateCar from '@/views/create-car-page/CreateCar.vue'

const route = useRoute()
const carData = ref<TCar>()

onMounted(async () => {
  carData.value = await carService.getCarData(route.params.id as string)
})
</script>
