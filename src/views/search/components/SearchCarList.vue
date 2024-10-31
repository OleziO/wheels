<template>
  <div class="flex flex-col gap-19 items-center mb-25">
    <div class="grid grid-cols-2 w-fit gap-5">
      <CarCard v-for="car in cars" :key="car.id" :car="car" :rate="rate" />
    </div>
    <el-pagination
      v-model:current-page="page"
      background
      layout="prev, pager, next"
      :total="totalCarsCount"
      :page-size="perPage"
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
  perPage: number
}>()

const page = defineModel<number>()

function handlePageChange (newPage: number) {
  page.value = newPage
  router.push({ name: routeNames.search, query: { ...router.currentRoute.value.query, page: newPage.toString() } })
}
</script>
