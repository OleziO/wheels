<template>
  <VueperSlides
    class="no-shadow w-full"
    :visible-slides="3"
    slide-multiple
    arrowsOutside
    disableArrowsOnEdges
    :bullets="false"
    :gap="1.5"
    fixed-height="520px"
    :touchable="false"
  >
    <VueperSlide
      v-for="car in cars"
      :key="car.carId"
    >
      <template #content>
        <CarCard :car="{...car, rate: rate}" />
      </template>
    </VueperSlide>

    <template #arrow-left>
      <i class="icon-arrow-drop-left text-blue-light text-2xl" />
    </template>

    <template #arrow-right>
      <i class="icon-arrow-drop-right text-blue-light text-2xl" />
    </template>
  </VueperSlides>
</template>

<script setup lang="ts">
import { VueperSlides, VueperSlide } from 'vueperslides'
import CarCard from './CarCard/CarCard.vue'

defineProps<{
  cars: IBasicCarData[]
}>()

const rate = ref(0)

onMounted(() => {
  moneyService.gettUSDtoUAH().then(data => { rate.value = data })
})

</script>
