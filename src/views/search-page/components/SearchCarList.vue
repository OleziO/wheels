<template>
  <div v-if="!cars.length" class="w-full flex justify-between mt-12">
    <h2 class="text-gravel h4">Оголошення не знайдені</h2>
  </div>

  <div v-else class="flex flex-col gap-19 items-center mb-25">
    <div v-loading.fullscreen="!cars.length" class="grid grid-cols-2 w-full gap-5">
      <CarCard
        v-for="car in cars"
        :key="car.id"
        :car="car"
        :rate="rate"
        @click="replaceRouterQuery(routeNames.car, { id: car.id })"
      />
    </div>
    <el-pagination
      :current-page="+searchStore.searchData.page"
      background
      layout="prev, pager, next"
      :total="+totalCarsCount"
      :page-size="+searchStore.searchData.perPage"
      prev-text="Назад"
      next-text="Вперед"
      hide-on-single-page
      @current-change="handlePageChange"
    />
  </div>
</template>

<script setup lang="ts">
import { replaceRouterQuery, routeNames } from '@/router'

defineProps<{
  cars: TCar[]
  rate: number
  totalCarsCount: number
}>()

const searchStore = useSearchStore()

function handlePageChange (newPage: number) {
  searchStore.searchData.page = newPage
  replaceRouterQuery(routeNames.search, searchStore.searchData.page)
}
</script>
