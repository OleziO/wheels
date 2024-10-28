<template>
  <el-carousel class="h-[494px]" :loop="false" indicator-position="none" :autoplay="false">
    <el-carousel-item
      v-for="grouoedCars in carsData"
      :key="grouoedCars[0]?.carId"
      class="h-fit flex justify-center"
    >
      <div class="flex gap-5 h-fit">
        <CarCard v-for="car in grouoedCars" :key="car.carId" :car="car" />
      </div>
    </el-carousel-item>
  </el-carousel>
</template>

<script setup lang="ts">

const props = defineProps<{
  cars: IBasicCarData[]
}>()

function chunkArray<T> (array: T[], chunkSize: number = 3): T[][] {
  const result: T[][] = []
  for (let i = 0; i < array.length; i += chunkSize) {
    const chunk = array.slice(i, i + chunkSize)
    result.push(chunk)
  }
  return result
}

const carsData = computed(() => chunkArray(props.cars))
</script>
