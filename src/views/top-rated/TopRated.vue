<template>
  <div v-loading.fullscreen="loading" class="px-25 py-12.5">
    <div class="max-w-[1440px]">
      <h2 class="h2 mb-12.5">ТОП 30 Улюблених Автомобілів</h2>
      <div>
        <div v-if="!cars.length && !loading" class="w-full flex justify-center mt-12">
          <h2 class="text-gravel h4">Оголошення не знайдені</h2>
        </div>

        <div v-else class="flex flex-col gap-19 items-center mb-25">
          <div class="grid grid-cols-3 w-fit gap-5">
            <CarCard v-for="car in cars" :key="car.id" :car="car" :rate="generalStore.rate" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

const generalStore = useGeneralStore()

const loading = ref(true)
const cars = ref<TCar[]>([])

onMounted(async () => {
  loading.value = true
  cars.value = await topRatedService.getTopRatedCars()
  loading.value = false
})

</script>
