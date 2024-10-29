<template>
  <SectionLayout>
    <h2>Найновіші з пропозицій</h2>
    <CarsCarousel :cars="carsData" />

    <AppButton
      class="w-[400px] mx-auto mt-12.5"
      icon-suffix
      @click="$router.push({ name: $routeNames.search })"
    >
      Більше пропозицій
      <icon class="icon-arrow-right-down text-xs" />
    </AppButton>
  </SectionLayout>
</template>

<script setup lang="ts">
import SectionLayout from '@/layouts/SectionLayout.vue'

const carsData = ref<TCar[]>([])

onBeforeMount(() => {
  carsService.getPopularCars().then((cars) => { carsData.value = cars as TCar[] })
})

</script>
