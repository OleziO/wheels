<template>
  <div class="w-[400px] rounded-lg overflow-hidden custom-shadow relative group">
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

    <div v-if="car.carVin" class="absolute top-5 z-50 flex justify-between w-full">
      <div class="relative h-fit bg-blue-light  py-2 px-4">
        <p class="text-white body-2">Перевірений VIN-код</p>
        <span
          class="absolute right-[-15px] top-0
          border-y-[20px] border-y-transparent border-l-[15px] border-l-blue-800 border-blue-light"
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
        <CarInfoWithIcon :text="car.carMileage.toString()" icon="icon-dashboard-3" />
        <CarInfoWithIcon :text="car.location.toString()" icon="icon-map-pin-2" />
        <CarInfoWithIcon :text="car.fuelType" icon="icon-oil" />
        <CarInfoWithIcon :text="car.transmissionType" icon="icon-steering-fill" />
      </div>

      <div class="flex justify-between items-end mt-2">
        <CarInfoWithIcon textColor="text-blue-light" :text="timeService.timeAgo(car.createdAt)" icon="icon-time" />

        <div class="flex gap-5">
          <AppButton type="icon" icon="icon-scales" class="!text-8" />
          <AppButton type="icon" icon="icon-heart" class="!text-8" />
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

const props = defineProps<{
  car: IBasicCarData
}>()

const priceUAH = ref('')

console.log(priceUAH)

onMounted(async () => {
  const convertedPrice = await moneyService.convertUSDtoUAH(props.car.carPice)
  priceUAH.value = await moneyService.numToMoneyWithFormat(convertedPrice, 'грн.', 'end')
})
</script>
