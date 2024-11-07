<template>
  <aside class="min-w-[400px] max-w-[400px]">
    <h2 class="h2 text-gray-dark leading-10">
      {{ car.models.brand }} {{ car.models.model }} {{ car.manufacture_year }}
    </h2>

    <div class="flex gap-4 mt-6">
      <h3 class="h1 text-blue-light">{{ moneyService.numToMoneyWithFormat(car.price, '$') }}</h3>

      <p class="body-1 text-gray-light">
        ~{{ priceUAH }}
      </p>
    </div>

    <CarAsideItem class="bg-creamy">
      <div class="flex gap-7">
        <el-avatar class="w-25 h-25 rounded-full overflow-hidden" :src="car.user_profiles?.avatart || ''">
          <div class="w-25 h-25 rounded-full flex justify-center items-center bg-gray-light text-creamy-light">
            <i class="icon-user-3 h2" />
          </div>
        </el-avatar>

        <div class="flex flex-col gap-2.5">
          <p class="secondary text-gravel">Продавець</p>
          <h4 class="h4 text-gray-dark">{{ car.user_profiles?.first_name || "Безіменний" }}</h4>
          <p class="secondary text-gravel">На сайті був <b>22 хв тому</b></p>
        </div>
      </div>

      <div class="flex flex-col gap-3.5 mt-10">
        <AppButton type="secondary" icon="icon-question-answer">
          Написати в чат
        </AppButton>

        <a :href="`tel:+38${car.user_profiles?.phone}`">
          <AppButton type="line-light" class="w-full" icon="icon-phone">Зателефонувати</AppButton>
        </a>
      </div>
    </CarAsideItem>

    <CarAsideItem class="text-black bg-creamy !p-0">
      <a :href="location || ''" target="_blank" class="flex flex-nowrap justify-between items-center gap-8 p-8">
        <div>
          <h4 class="h4">Місцезнаходження</h4>

          <div class="flex gap-5 items-center mt-9">
            <i class="icon-map-pin text-orange text-[24px]" />
            <p class="body-1">{{ car.locations.label }}</p>
          </div>
        </div>

        <div class="w-full flex items-center">
          <el-image src="./src/assets/images/location-placeholder.svg" class="w-full !object-cover" />
        </div>
      </a>
    </CarAsideItem>

    <div class="w-full flex justify-between mt-10 gap-5">
      <AppButton class="w-full" icon="icon-heart">Зберегти</AppButton>
      <AppButton class="w-full" icon="icon-scales">Порівняти</AppButton>
    </div>

    <CarAsideItem class="bg-green-dark text-creamy-light">
      <h4 class="h4">Вважаєте це авто унікальним?</h4>
      <p class="mt-5 body-2">Ставте оцінку та беріть участь у формуванні ТОП-100 найцікавіших моделей на сайті</p>

      <div class="w-full flex flex-col gap-5 mt-9">
        <AppButton
          class="likeBtn"
          type="line-light"
          icon="icon-thumb-up"
        >
          Подобається
        </AppButton>

        <AppButton
          class="likeBtn"
          type="line-light"
          icon="icon-thumb-down"
        >
          Не подобається
        </AppButton>
      </div>
    </CarAsideItem>
  </aside>
</template>

<script setup lang="ts">
import { moneyService } from '@/services/index.service'

defineProps<{
  car: TCar
  location: string
  priceUAH: string
}>()
</script>
