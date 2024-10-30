<template>
  <SectionLayout>
    <h2>Найновіші з пропозицій</h2>
    <div class="max-w-[1240px] mx-auto">
      <CarsCarousel
        :cars="carsData"
      />
    </div>

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

defineProps<{
  carsData: TCar[]
}>()

</script>
