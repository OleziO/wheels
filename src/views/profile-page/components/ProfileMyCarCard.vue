<template>
  <div class="w-full rounded-lg overflow-hidden card-shadow flex min-h-[400px] max-h-[400px]">
    <div class="relative min-w-[425px] max-w-[425px] min-h-full max-h-full overflow-hidden rounded-br-25">
      <el-image
        :src="car.car_pictures ? car.car_pictures[0] : ''"
        alt="Car Picture"
        class="w-full h-full flex justify-center"
        fit="cover"
      >
        <template #error>
          <div class="w-full h-full flex justify-center items-center h1 text-gray-light">
            <el-image
              :src="CarPlaceholder"
              alt="Car Picture"
              class="w-full h-full flex justify-center"
              fit="cover"
            />
          </div>
        </template>
      </el-image>

      <AppButton
        class="absolute bottom-8 left-8 w-19"
        icon="icon-numbers"
        @click="router.push({name: routeNames.carStatistic, params: {id: car.id}})"
      />
    </div>

    <div class="w-full p-8 flex flex-col justify-between">
      <div>
        <div class="flex justify-end mb-5 cursor-pointer" @click="() => $emit('delete', car.id, carTitle)">
          <i class="icon-delete-bin-2 text-blue text-2xl" />
        </div>

        <h4 class="h4 text-gray-dark">{{ carTitle }}</h4>

        <div class="flex gap-4 mt-2.5">
          <h3 class="h3 text-blue-light">{{ formattedMoney }}</h3>
          <p class="body-2 text-gray-light">
            ~{{ priceUAH }}
          </p>
        </div>

        <p class="mt-5 truncated-text secondary text-gray-dark">
          {{ car.description }}
        </p>
      </div>

      <div class="flex justify-end">
        <AppButton
          type="secondary"
          icon="icon-edit"
          @click="router.push({name: routeNames.carEdit, params: {id: car.id}})"
        >
          Редагувати
        </AppButton>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import CarPlaceholder from '@/assets/images/car-placeholder.jpg'
import { routeNames } from '@/router'

const props = defineProps<{
  car: TCar
  rate: number
}>()

defineEmits(['delete'])

const router = useRouter()

const carTitle = computed(() => `${props.car.models.brand} ${props.car.models.model} ${props.car.manufacture_year}`)
const formattedMoney = computed(() => moneyService.numToMoneyWithFormat(props.car.price, '$'))
const priceUAH = computed(() => moneyService.numToMoneyWithFormat(Math.floor(props.rate * props.car.price), 'грн.', 'end'))

</script>

<style scoped>

.card-shadow {
  box-shadow: 0px 4px 20px 0px #0000000D;
}

.truncated-text {
  display: -webkit-box;
  -webkit-line-clamp: 5;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

</style>
