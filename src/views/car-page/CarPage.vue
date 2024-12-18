<template>
  <div v-loading.fullscreen="loading">
    <div
      v-if="car"
      class="w-full max-w-[1440px] flex justify-between gap-10  mx-auto px-25 py-12.5"
    >
      <div class="w-full">
        <CarPicturesCarousel :images="car.car_pictures || []" />

        <div class="mt-10 w-full flex justify-between gap-12.5 px-2.5">
          <span v-for="infoItem in headerCarInfo" :key="infoItem.icon" class="flex gap-2.5">
            <i
              class="text-[40px] text-blue secondary"
              :class="infoItem.icon"
            />

            <p class="text-blue button-text">{{ infoItem.text }}</p>
          </span>
        </div>

        <div class="flex justify-between gap-5 mt-11">
          <CarPageInfoBadge v-if="car.registration_plate">
            <template #icon>
              <RegistrationPlateIcon />
            </template>

            <template #text>
              <span class="w-full h-full bg-transparent text-gray-dark flex items-center p-4">
                {{ car.registration_plate }}
              </span>
            </template>
          </CarPageInfoBadge>

          <CarPageInfoBadge v-if="car.vin">
            <template #icon>
              <i class="icon-check-double" />
            </template>

            <template #text>
              <span class="w-full h-full bg-blue-light flex items-center p-4 pr-11">
                Перевірений VIN-код
              </span>
            </template>
          </CarPageInfoBadge>

          <CarPageInfoBadge v-if="car.vin">
            <template #icon>
              <i class="icon-check-double" />
            </template>

            <template #text>
              <span class="w-full h-full bg-transparent text-gray-dark flex items-center p-4 pr-11">
                {{ car.vin }}
              </span>
            </template>
          </CarPageInfoBadge>
        </div>
        <CarPageMainInfoSection :car="[...mainCarInfo, ...carFeatures]" />

        <div v-if="car.description" class="mt-12.5 text-gray">
          <h3 class="h3 mb-8">Опис від власника</h3>

          <p class="body-2">
            {{ car.description }}
          </p>
        </div>

        <div v-if="!auction && (car.user_id !== authStore.user?.sub)" class="mt-12.5">
          <h4 class="h4 mb-10 text-gray-dark">
            Зв’язатись з продавцем: {{ car.user_profiles?.first_name || 'Продавець' }}
          </h4>

          <AppButton
            type="secondary"
            class="w-full"
            icon="icon-question-answer"
            @click="router.replace({name: routeNames.chatPage, params: { id: ownerChatId}})"
          >
            Написати в чат
          </AppButton>
        </div>
      </div>

      <AuctionPageAside
        v-if="auction"
        :auction-data="auction"
        :car="car"
        @handle-user-chat="redirectToUserChat"
      />

      <CarPageAside
        v-else :car="car"
        :priceUAH="priceUAH"
        :location="location"
        @handle-user-chat="redirectToUserChat"
      />
    </div>
    <div v-if="!loading" class="px-25 mb-40 mt-20 max-w-[1440px] mx-auto">
      <h3 class="h3 mb-10 text-gray-dark">Рекомендації для вас</h3>

      <CarsCarousel :rate="generalStore.rate" :cars="recommendedCars" />
    </div>
  </div>
</template>

<script setup lang="ts">
import locationApi from '@/api/location'
import RegistrationPlateIcon from '@/assets/images/RegistrationPlateIcon.vue'
import { routeNames } from '@/router'
import AuctionPageAside from '@/views/auctions-page/components/AuctionDetailsPageAside.vue'

const props = defineProps<{
  id?: string
  auction?: TTables<'active_auctions'>
}>()

const router = useRouter()
const route = useRoute()
const generalStore = useGeneralStore()
const authStore = useAuthStore()

const loading = ref(false)
const car = ref<TCar | null>(null)
const location = ref('')
const recommendedCars = ref<TCar[]>([])
const mainCarInfo = ref<IFilterOption[]>([])
const carFeatures = ref<IFilterOption[]>([])
const ownerChatId = ref('')

const carId = computed(() => props.id || route.params.id as string)
const priceUAH = computed(() => moneyService.numToMoneyWithFormat(Math.floor(generalStore.rate * car.value!.price), 'грн.', 'end'))

const headerCarInfo = computed(() => [
  { text: `${car.value!.mileage.toString()} тис.км`, icon: 'icon-dashboard-3' },
  { text: car.value!.fuel_types?.label, icon: 'icon-oil' },
  { text: car.value!.transmission_types?.label, icon: 'icon-steering-fill' },
  { text: car.value!.locations.label || 'Україна', icon: 'icon-map-pin-2' }
])

async function redirectToUserChat (userId: string) {
  const ownerChatId = await getUserChat(userId)
  router.replace({ name: routeNames.chatPage, params: { id: ownerChatId } })
}

async function getUserChat (userId: string) {
  if (userId && authStore.user?.sub && authStore.user.sub !== userId) {
    return await chatService.getChatId(userId, authStore.user.sub) || ''
  }
}

async function init () {
  loading.value = true
  try {
    car.value = await carService.getCarData(carId.value, authStore.user?.sub)
    recommendedCars.value = await carService.getRecommendedCars(car.value!.price || 0, car.value!.id)
    mainCarInfo.value = carService.getMainInfo(car.value)
    location.value = await locationApi.getLocationUrl(car.value!.location)
    carFeatures.value = await carService.getCarFeatures(carId.value) as IFilterOption[]
  } finally {
    loading.value = false
  }
}

onBeforeMount(init)

</script>
