<template>
  <div
    class="w-full rounded-lg
    overflow-hidden custom-shadow relative group flex flex-col justify-end"
    @click="router.push({
      name: $routeNames.car,
      query: searchService.convertToLocationQueryRaw({id: car.id})
    })"
  >
    <div class="w-full h-[320px] overflow-hidden">
      <el-image
        :src="car.car_picture || ''"
        alt="Car Picture"
        class="w-full h-full flex justify-center"
        fit="cover"
      >
        <template #error>
          <div class="w-full h-full flex justify-center items-center h1 text-gray-light">
            <el-image
              src="./src/assets/images/car-placeholder.jpg"
              alt="Car Picture"
              class="w-full h-full flex justify-center"
              fit="cover"
            />
          </div>
        </template>
      </el-image>
    </div>

    <div class="card-label absolute top-5 z-50 w-full">
      <span>
        <div v-if="car.vin" class="relative h-fit bg-blue-light py-2 px-4">
          <p class="text-white body-2">Перевірений VIN-код</p>
          <span
            class="absolute right-0 top-0 translate-x-full
      border-y-[20px] border-y-transparent border-l-[15px] border-l-blue-light"
          />
        </div>
      </span>

      <div
        class="flex gap-7 mr-5 justify-end opacity-0 group-hover:opacity-100 transition-opacity duration-300"
      >
        <AppButton icon="icon-thumb-down" class="!rounded-full" @click.stop="updateRate('-')" />
        <AppButton icon="icon-thumb-up" class="!rounded-full" @click.stop="updateRate('+')" />
      </div>
    </div>

    <div class="rounded-tr-12.5 p-5 relative -mt-12.5 bg-creamy-light flex flex-col gap-4">
      <h4 class="h4 text-gray-dark">{{ `${car.models.brand} ${car.models.model} ${car.manufacture_year}` }}</h4>
      <div class="flex gap-4">
        <h3 class="h3 text-blue-light">{{ moneyService.numToMoneyWithFormat(car.price, '$') }}</h3>
        <p class="body-2 text-gray-light">
          ~{{ priceUAH }}
        </p>
      </div>
      <div class="grid grid-cols-2 gap-4">
        <CarInfo
          v-for="info in carInfo"
          :key="info.icon"
          :text="info.text"
          :icon="(info.icon as TIcons)"
        />
      </div>

      <div class="flex justify-between items-end mt-2">
        <CarInfo
          textColor="!text-blue-light"
          :text="timeService.timeAgo(new Date(car.created_at))"
          icon="icon-time"
        />

        <div class="flex gap-5">
          <AppButton type="icon" icon="icon-scales" class="!text-8" />
          <AppButton type="icon" icon="icon-heart" class="!text-8" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import CarInfo from '@/components/car-card/components/CarCardInfoWithIcon.vue'

import searchService from '@/services/search-service/search.service'
import moneyService from '@/services/money.service'
import timeService from '@/services/time.service'

import { router } from '@/router'

const props = defineProps<{
  car: TCar
  rate: number
}>()

const priceUAH = computed(() => moneyService.numToMoneyWithFormat(Math.floor(props.rate * props.car.price), 'грн.', 'end'))

const carInfo = computed(() => [
  { text: `${props.car.mileage.toString()} тис.км`, icon: 'icon-dashboard-3' },
  { text: props.car.location || 'Україна', icon: 'icon-map-pin-2' },
  { text: props.car.fuel_type, icon: 'icon-oil' },
  { text: props.car.transmission_type, icon: 'icon-steering-fill' }
])

async function updateRate (operation: '+' | '-') {
  searchService.updateCarRating(props.car.id, operation === '+' ? 1 : -1)
}

</script>

<style scoped lang="scss">
.card-label {
  @apply grid items-start justify-between;
  grid-template-columns: repeat(2, 1fr);
}
</style>
