<template>
  <VueperSlides
    class="no-shadow w-full"
    :visibleSlides="3"
    slideMultiple
    arrowsOutside
    disableArrowsOnEdges
    :bullets="false"
    :gap="2"
    fixedHeight="520px"
    :touchable="false"
  >
    <VueperSlide
      v-for="car in cars"
      :key="car.id"
    >
      <template #content>
        <CarCard :car="car" :rate="rate" />
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
import CarCard from '@/components/car-card/CarCard.vue'

defineProps<{
  cars: TCar[]
  rate: number
}>()
</script>
