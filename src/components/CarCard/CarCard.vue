<template>
  <div class="w-[400px] rounded-lg overflow-hidden">
    <AppLazyImage
      :src="car.carPicture"
      alt="Car Picture"
      class="w-full "
    >
      <template #error>
        <span
          class="font-medium uppercase"
        >
          {{ `${car.carBrand} ${car.carModel}` }}
        </span>
      </template>
    </AppLazyImage>
    <div class="rounded-tr-12.5 p-5 relative -top-12.5 bg-creamy-light flex flex-col gap-4">
      <h4 class="h4 text-gray-dark">{{ `${car.carBrand} ${car.carModel} ${car.manufactureYear}` }}</h4>
      <div class="flex gap-4">
        <h3 class="h3 text-blue-light">{{ moneyService.numToMoneyWithFormat(car.carPice, '$') }}</h3>
        <p class="body-2 text-gray-light">
          ~{{ moneyService.numToMoneyWithFormat(moneyService.convertUSDtoUAH(car.carPice), 'грн.', 'end') }}
        </p>
      </div>
      <div class="grid grid-cols-2 gap-4">
        <CarInfoWithIcon :text="car.carMileage.toString()" icon="icon-dashboard-3" />
        <CarInfoWithIcon :text="car.location.toString()" icon="icon-map-pin-2" />
        <CarInfoWithIcon :text="car.fuelType" icon="icon-oil" />
        <CarInfoWithIcon :text="car.transmissionType" icon="icon-steering-fill" />
      </div>

      <div class="flex justify-between items-end mt-2.5 text-blue-light">
        <CarInfoWithIcon textColor="text-inherit" :text="timeService.timeAgo(car.createdAt)" icon="icon-time" />

        <div class="flex gap-5 text-8">
          <AppButton type="icon" icon="icon-scales" class="font-full-inherit" />
          <AppButton type="icon" icon="icon-heart" class="font-full-inherit" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import moneyService from '@/services/money.service'
import timeService from '@/services/time.service'
import AppLazyImage from '../common/AppLazyImage.vue'
import CarInfoWithIcon from './components/CarInfoWithIcon.vue'

defineProps<{
  car: IBasicCarData
}>()
</script>
