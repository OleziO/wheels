<template>
  <HomeSectionWrapper>
    <h2>Найновіші з пропозицій</h2>
    <div>
      <CarsCarousel
        :cars="carsData"
        :rate="rate"
      />
    </div>

    <AppButton
      class="w-[400px] mx-auto mt-12.5"
      icon-suffix
      @click="router.push({ name: $routeNames.search })"
    >
      Більше пропозицій
      <icon class="icon-arrow-right-down text-xs" />
    </AppButton>
  </HomeSectionWrapper>
</template>

<script setup lang="ts">
import HomeSectionWrapper from '@/views/home-page/components/HomeSectionWrapper.vue'

const router = useRouter()

withDefaults(defineProps<{
  carsData: TCar[]
  rate: number
}>(), {
  rate: 0
})

</script>
