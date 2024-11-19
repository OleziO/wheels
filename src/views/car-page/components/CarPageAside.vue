<template>
  <aside class="min-w-[400px] max-w-[400px]">
    <h2 class="h2 text-gray-dark leading-10">
      {{ car.models.brand }} {{ car.models.model }} {{ car.manufacture_year }}
    </h2>

    <div class="flex gap-4 mt-6">
      <h3 class="h1 text-blue-light">{{ formattedMoney }}</h3>

      <p class="body-1 text-gray-light">
        ~{{ priceUAH }}
      </p>
    </div>

    <CarPageAsideSectionItem class="bg-creamy">
      <div class="flex gap-7">
        <el-avatar class="w-25 h-25 rounded-full overflow-hidden" :src="car.user_profiles?.avatar || ''">
          <div class="w-25 h-25 rounded-full flex justify-center items-center bg-gray-light text-creamy-light">
            <i class="icon-user-3 h2" />
          </div>
        </el-avatar>

        <div class="flex flex-col gap-2.5 justify-center">
          <p class="secondary text-gravel">Продавець</p>
          <h4 class="h4 text-gray-dark">{{ car.user_profiles?.first_name || "Безіменний" }}</h4>
        </div>
      </div>

      <div class="flex flex-col gap-3.5 mt-10">
        <AppButton
          type="secondary"
          icon="icon-question-answer"
          @click="$emit('handleUserChat', car.user_id)"
        >
          Написати в чат
        </AppButton>

        <a :href="`tel:${car.user_profiles?.phone}`">
          <AppButton type="line-light" class="w-full" icon="icon-phone">Зателефонувати</AppButton>
        </a>
      </div>
    </CarPageAsideSectionItem>

    <CarPageAsideSectionItem class="text-black bg-creamy !p-0">
      <a :href="location || ''" target="_blank" class="flex flex-nowrap justify-between items-center gap-8 p-8">
        <div>
          <h4 class="h4">Місцезнаходження</h4>

          <div class="flex gap-5 items-center mt-9">
            <i class="icon-map-pin text-orange text-[24px]" />
            <p class="body-1">{{ car.locations.label }}</p>
          </div>
        </div>

        <div class="w-full flex items-center">
          <el-image :src="LocationPlaceholder" class="w-full !object-cover" />
        </div>
      </a>
    </CarPageAsideSectionItem>

    <CarPageAsideSectionItem class="bg-green-dark text-creamy-light">
      <h4 class="h4">Вважаєте це авто унікальним?</h4>
      <p class="mt-5 body-2">Ставте оцінку та беріть участь у формуванні ТОП-30 найцікавіших моделей на сайті</p>

      <div class="w-full flex flex-col gap-5 mt-9">
        <AppButton
          class="!text-creamy !border-creamy-light hover:!bg-creamy-light hover:!text-green-dark"
          type="line-light"
          icon="icon-thumb-up"
        >
          Подобається
        </AppButton>
      </div>
    </CarPageAsideSectionItem>
  </aside>
</template>

<script setup lang="ts">
import LocationPlaceholder from '@/assets/images/location-placeholder.svg'

const props = defineProps<{
  car: TCar
  location: string
  priceUAH: string
}>()

defineEmits(['handleUserChat'])

const formattedMoney = computed(() => moneyService.numToMoneyWithFormat(props.car.price, '$'))

</script>
