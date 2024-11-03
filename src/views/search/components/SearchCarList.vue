<template>
  <div v-if="!cars.length" class="w-full flex justify-center mt-12">
    <h2 class="text-gravel h4">Оголошення не знайдені</h2>
  </div>

  <div v-else class="flex flex-col gap-19 items-center mb-25">
    <div class="grid grid-cols-2 w-fit gap-5">
      <CarCard v-for="car in cars" :key="car.id" :car="car" :rate="rate" />
    </div>
    <el-pagination
      :current-page="+searchData.page"
      background
      layout="prev, pager, next"
      :total="+totalCarsCount"
      :page-size="+searchData.perPage"
      prev-text="Назад"
      next-text="Вперед"
      hide-on-single-page
      @current-change="handlePageChange"
    />
  </div>
</template>

<script setup lang="ts">
import { router } from '@/router'
import { routeNames } from '@/router/route-names'

defineProps<{
  cars: TCar[]
  rate: number
  totalCarsCount: number
}>()

const searchData = defineModel<ICarsSearchDataExtended>({ required: true })

function handlePageChange (newPage: number) {
  searchData.value.page = newPage
  router.push({ name: routeNames.search, query: { ...router.currentRoute.value.query, page: newPage.toString() } })
}
</script>
