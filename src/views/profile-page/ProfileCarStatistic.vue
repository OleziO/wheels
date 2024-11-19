<template>
  <div v-loading.fullscreen="loading" class="flex-1">
    <div
      class="h3 text-gray-dark mb-10 flex gap-1.5 items-center cursor-pointer"
      @click="router.replace({name: routeNames.myCars})"
    >
      <i class="icon-arrow-left-s" />

      <h3>Статистика оголошень</h3>
    </div>

    <div class="w-full rounded-lg overflow-hidden border border-creamy-dark flex min-h-[315px] max-h-[315px]">
      <div class="relative min-w-[425px] max-w-[425px] min-h-full max-h-full overflow-hidden rounded-br-25">
        <el-image
          :src="car?.car_pictures ? car?.car_pictures[0] : ''"
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
      </div>

      <div class="w-full p-8 flex flex-col">
        <h4 class="h4 text-gray-dark">{{ carTitle }}</h4>

        <div class="flex gap-4 mt-2.5">
          <h3 class="h3 text-blue-light">{{ formattedMoney }}</h3>

          <p class="body-2 text-gray-light">
            ~{{ priceUAH }}
          </p>
        </div>

        <div class="w-full h-full flex items-end gap-5">
          <el-tooltip
            content="Кіькість вподобайок від користувачів"
            placement="bottom"
          >
            <div class="px-7 py-3 rounded-lg border border-creamy-dark text-gray-dark body-2 text-center">
              <i class="icon-thumb-up-fill text-2xl text-blue-light" />

              <p class="mt-2.5">{{ car?.car_rate }}</p>
            </div>
          </el-tooltip>

          <el-tooltip
            content="Ваше місце серед лідерів рейтингу найпопулярніших автомобілів"
            placement="bottom"
          >
            <div class="px-7 py-3 rounded-lg border border-creamy-dark text-gray-dark body-2 text-center">
              <i class="icon-award text-2xl text-blue-light" />

              <p class="mt-2.5">{{ placeInTopRate }}</p>
            </div>
          </el-tooltip>
        </div>
      </div>
    </div>

    <div
      class="mt-5 flex items-center justify-between
      w-full px-7 py-5 border border-creamy-dark rounded-lg text-fray-dark"
    >
      <h4 class="h4">Всього переглядів: </h4>

      <div class="flex items-center gap-2.5">
        <i class="icon-eye" />

        <h4 class="h4">{{ carViewsCount }}</h4>
      </div>
    </div>

    <div class="mt-5 px-7 py-3 rounded-lg border border-creamy-dark text-gray-dark body-2 ">
      <h4 class="h4 mb-10">Графік переглядів за рік</h4>

      <div class="w-full h-full">
        <Line :data="chartData" :options="chartOptions" class="h-[500px] w-full" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import CarPlaceholder from '@/assets/images/car-placeholder.jpg'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  type TooltipItem,
  type ChartOptions,
  type ChartData
} from 'chart.js'
import { Line } from 'vue-chartjs'

import { routeNames } from '@/router'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

const router = useRouter()
const route = useRoute()
const generalStore = useGeneralStore()

const myCarViews = ref<number[]>([])
const modelViewsValue = ref<number[]>([])

const car = ref<TCar>()
const loading = ref(false)
const carViewsCount = ref(0)
const placeInTopRate = ref(0)

const chartData = computed<ChartData<'line'>>(() => ({
  labels: ['Січень', 'Лютий', 'Березень', 'Квітень', 'Травень', 'Червень', 'Серпень', 'Вересень', 'Жовтень', 'Листопад', 'Грудень'],
  datasets: [
    {
      label: 'Ваше оголошення',
      data: myCarViews.value,
      borderColor: '#D38455',
      backgroundColor: 'rgba(217, 119, 6, 0.1)',
      pointBackgroundColor: '#D38455',
      pointBorderColor: '#D38455',
      borderWidth: 3,
      pointRadius: 5,
      pointHoverRadius: 7,
      tension: 0.4
    },
    {
      label: 'В середньому',
      data: modelViewsValue.value,
      borderColor: '#395F8D',
      backgroundColor: 'rgba(29, 78, 216, 0.1)',
      pointBackgroundColor: '#395F8D',
      pointBorderColor: '#395F8D',
      borderWidth: 3,
      pointRadius: 5,
      pointHoverRadius: 7,
      tension: 0.4
    }
  ]
}))

const carTitle = computed(() => `${car.value?.models.brand} ${car.value?.models.model} ${car.value?.manufacture_year}`)
const formattedMoney = computed(() => moneyService.numToMoneyWithFormat(car.value?.price || 0, '$'))
const priceUAH = computed(() => moneyService.numToMoneyWithFormat(Math.floor(generalStore.rate * (car.value?.price || 0)), 'грн.', 'end'))
const carId = computed(() => route.params.id as string)

const chartOptions: ChartOptions<'line'> = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: true,
      position: 'top',
      labels: {
        font: {
          size: 14,
          weight: 'bold'
        },
        color: '#000000',
        usePointStyle: true,
        padding: 50
      }
    },
    tooltip: {
      enabled: true,
      backgroundColor: '#F9FAFB',
      titleColor: '#111827',
      bodyColor: '#374151',
      borderColor: '#CFC1B3',
      borderWidth: 1,
      callbacks: {
        label: function (context: TooltipItem<'line'>) {
          const value = context.raw
          return `Переглядів: ${value}`
        }
      }
    }
  },
  scales: {
    x: {
      grid: {
        display: false
      },
      ticks: {
        padding: 1,
        color: '#000000',
        font: {
          size: 12
        }
      }
    },
    y: {
      beginAtZero: true,
      grid: {
        display: false
      },
      ticks: {
        color: '#000000',
        font: {
          size: 12
        }
      }
    }
  }
}

onMounted(async () => {
  loading.value = true

  car.value = await carService.getCarData(carId.value)
  carViewsCount.value = await profileService.getCarsViewsAmount(carId.value)
  myCarViews.value = await profileService.getCarsViews(carId.value)
  modelViewsValue.value = await profileService.getModelViews(carId.value, car.value.model_id)
  placeInTopRate.value = await profileService.carTopRatePlace(car.value?.car_rate || 0)

  loading.value = false
})

</script>
