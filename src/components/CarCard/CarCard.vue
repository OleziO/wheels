<template>
  <RouterLink
    :to="{
      name: routeNames.car,
      query: SearchFilters.convertToLocationQueryRaw({id: car.carId}
      )}"
  >
    <div
      class="w-[400px] rounded-lg
  overflow-hidden custom-shadow relative group flex flex-col justify-end"
    >
      <el-image
        :src="car.carPicture"
        alt="Car Picture"
        class="w-full"
      />

      <div v-if="car.carVin" class="absolute top-5 z-50 flex justify-between w-full">
        <div class="relative h-fit bg-blue-light  py-2 px-4">
          <p class="text-white body-2">Перевірений VIN-код</p>
          <span
            class="absolute right-0 top-0 translate-x-full
          border-y-[20px] border-y-transparent border-l-[15px] border-l-blue-light border-blue-light"
          />
        </div>
        <div class="flex gap-7 mr-5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <AppButton icon="icon-thumb-down" class="!rounded-full" />
          <AppButton icon="icon-thumb-up" class="!rounded-full" />
        </div>
      </div>

      <div class="rounded-tr-12.5 p-5 relative -mt-12.5 bg-creamy-light flex flex-col gap-4">
        <h4 class="h4 text-gray-dark">{{ `${car.carBrand} ${car.carModel} ${car.manufactureYear}` }}</h4>
        <div class="flex gap-4">
          <h3 class="h3 text-blue-light">{{ moneyService.numToMoneyWithFormat(car.carPice, '$') }}</h3>
          <p class="body-2 text-gray-light">
            ~{{ priceUAH }}
          </p>
        </div>
        <div class="grid grid-cols-2 gap-4">
          <CarInfoWithIcon
            v-for="info in carInfo"
            :key="info.icon"
            :text="info.text"
            :icon="info.icon as TIcons"
          />
        </div>

        <div class="flex justify-between items-end mt-2">
          <CarInfoWithIcon textColor="!text-blue-light" :text="timeService.timeAgo(car.createdAt)" icon="icon-time" />

          <div class="flex gap-5">
            <AppButton type="icon" icon="icon-scales" class="!text-8" />
            <AppButton type="icon" icon="icon-heart" class="!text-8" />
          </div>
        </div>
      </div>
    </div>
  </RouterLink>
</template>

<script setup lang="ts">
import moneyService from '@/services/money.service'
import timeService from '@/services/time.service'
import CarInfoWithIcon from './components/CarInfoWithIcon.vue'
import SearchFilters from '@/services/search-service/search.service'
import { RouterLink } from 'vue-router'
import { routeNames } from '@/router/route-names'

interface ICardCarData extends IBasicCarData{
  rate: number
}

const props = defineProps<{
  car: ICardCarData
}>()

const priceUAH = computed(() => moneyService.numToMoneyWithFormat(props.car.rate * props.car.carPice, 'грн.', 'end'))

const carInfo = computed(() => [
  { text: props.car.carMileage.toString(), icon: 'icon-dashboard-3' },
  { text: props.car.location.toString(), icon: 'icon-map-pin-2' },
  { text: props.car.fuelType, icon: 'icon-oil' },
  { text: props.car.transmissionType, icon: 'icon-steering-fill' }
])

</script>
