<template>
  <div
    class="w-full rounded-lg cursor-pointer
    overflow-hidden custom-shadow relative group flex flex-col justify-end"
  >
    <div class="w-full h-[320px] overflow-hidden">
      <el-image
        :src="car.car_pictures ? car.car_pictures[0] : ''"
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

    <div class="absolute top-6 z-40 w-full flex gap-8 justify-between items-center">
      <span>
        <div v-if="car.vin" class="relative h-fit bg-blue-light py-2 px-4">
          <p class="inline-flex text-white body-2 whitespace-nowrap">Перевірений VIN-код</p>
          <span
            class="inline-flex absolute right-0 top-0 translate-x-full
      border-y-[20px] border-y-transparent border-l-[15px] border-l-blue-light"
          />
        </div>
      </span>

      <AppButton
        icon="icon-thumb-up"
        class="!rounded-full w-14 h-14 mr-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        @click.stop="searchService.updateCarRating(props.car.id, -1)"
      />
    </div>

    <div class="rounded-tr-12.5 p-5 relative -mt-12.5 bg-creamy-light flex flex-col gap-4">
      <h4 class="h4 text-gray-dark">{{ `${car.models.brand} ${car.models.model} ${car.manufacture_year}` }}</h4>
      <div v-if="!auction" class="flex gap-4">
        <h3 class="h3 text-blue-light">{{ formattedMoney }}</h3>
        <p class="body-2 text-gray-light">
          ~{{ priceUAH }}
        </p>
      </div>

      <div class="grid grid-cols-2 gap-4">
        <span
          v-for="info in carInfo"
          :key="info.icon"
          class="flex gap-2.5 items-center secondary !text-blue-light"
        >
          <i :class="info.icon as TIcons" />
          <p>
            {{ info.text }}
          </p>
        </span>
      </div>

      <div v-if="!auction" class="flex justify-between items-end mt-2">
        <span class="flex gap-2.5 items-center text-orange">
          <i class="icon-time" />
          <p>
            {{ timeAgo(new Date(car.created_at as string)) }}
          </p>
        </span>
      </div>

      <div v-if="auction">
        <h3 class="h3 text-blue-light mb-2">
          Остання ставка: {{ lastBid }}
        </h3>

        <AppButton
          class="mt-2"
          @click.stop="router.push({name: $routeNames.auction, query: { id: auction.id }})"
        >
          Переглянути аукціон
        </AppButton>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { timeAgo } from '@/core/helpers'
import { searchService } from '@/services/index.service'

const props = withDefaults(defineProps<{
  car: TCar
  rate: number
  auction?: TTables<'active_auctions'> & {
    cars: TCar
    user_profiles: TTables<'user_profiles'>
  }
}>(), {
  rate: 0
})

const router = useRouter()

const lastBid = computed(() => moneyService.numToMoneyWithFormat(props.auction?.current_bid || props.auction?.default_bid || 0, '$'))
const formattedMoney = computed(() => moneyService.numToMoneyWithFormat(props.car.price, '$'))
const priceUAH = computed(() => moneyService.numToMoneyWithFormat(Math.floor(props.rate * props.car.price), 'грн.', 'end'))

const carInfo = computed(() => [
  { text: `${props.car.mileage.toString()} тис.км`, icon: 'icon-dashboard-3' },
  { text: props.car.locations.label || 'Україна', icon: 'icon-map-pin-2' },
  { text: props.car.fuel_types?.label || props.car.fuel_type, icon: 'icon-oil' },
  { text: props.car.transmission_types?.label || props.car.transmission_type, icon: 'icon-steering-fill' }
])

</script>
