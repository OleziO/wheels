<template>
  <section class="bg-creamy px-25 py-12.5">
    <ul class="flex justify-between">
      <li v-for="item in vehicleTypes" :key="item.value">
        <el-checkbox-button to="/search" class="vehicle-type flex flex-col justify-center items-center">
          <el-image :src="`src/assets/images/${item.value}.png`" class="h-20" />
          <p class="text-gray-dark body-1">{{ item.label }}</p>
        </el-checkbox-button>
      </li>
    </ul>

    <div class="w-full flex gap-25 mt-12">
      <div class="flex-1 flex flex-col gap-6">
        <AppSelect
          v-model="searchData.brands"
          placeholder="Оберіть марку"
          key-label="value"
          key-value="value"
          :options="mockBrands"
        />

        <AppSelect
          v-model="searchData.models"
          placeholder="Оберіть модель"
          key-label="value"
          key-value="value"
          :options="mockModels"
        />

        <AppSelect
          v-model="searchData.cities"
          placeholder="Оберіть регіон"
          key-label="value"
          key-value="value"
          :options="mockCities"
        />
      </div>

      <div class="flex-1">
        <div class="mb-8 body-2 text-gray-dark">
          <h4 class=" mb-3">Роки</h4>

          <div class="flex gap-9 items-center">
            <AppSelect
              v-model="searchData.years[0]"
              placeholder="Будь-який"
              key-label="value"
              key-value="value"
              :options="mockYears"
            />

            <p> до </p>

            <AppSelect
              v-model="searchData.years[1]"
              placeholder="Будь-який"
              key-label="value"
              key-value="value"
              :options="mockYears"
            />
          </div>
        </div>
        <div class="body-2 text-gray-dark">
          <p>Ціна</p>
          <AppSlider v-model="searchData.price" label="$" label-position="start" :min="0" :max="50000" :step="500" />
        </div>
      </div>
    </div>

    <div class="w-full flex items-center gap-25 mt-12">
      <AppButton icon="icon-search" type="line-light" class="w-full">Розширений пошук</AppButton>
      <AppButton class="w-full" icon="icon-search">Шукати</AppButton>
    </div>
  </section>
</template>

<script setup lang="ts">
const vehicleTypes = [
  { label: 'Легкові', value: 'Car' },
  { label: 'Вантажівки', value: 'Truck-2' },
  { label: 'Мото', value: 'Motorbike' },
  { label: 'Сільгосптехніка', value: 'Backhoe' },
  { label: 'Автобуси', value: 'Minibus' },
  { label: 'Спецтехніка', value: 'Truck' },
  { label: 'Причепи', value: 'Caravan' },
  { label: 'Автобудинки', value: 'Camper' }
]

interface ISearchData {
  brands: string[]
  models: string[]
  cities: string[]
  years: [number, number] | []
  price: [number, number] | []
}

const searchData = ref<ISearchData>({
  brands: [],
  models: [],
  cities: [],
  years: [],
  price: [0, 50000]
})

const mockBrands = [
  { value: 'Mercedes' },
  { value: 'BMW' },
  { value: 'Audi' },
  { value: 'Peugeot' },
  { value: 'Lexus' },
  { value: 'Ford' }
]

const mockModels = [
  { value: '1' },
  { value: '2' },
  { value: '3' }
]

const mockCities = [
  { value: 'Львів' },
  { value: 'Київ' },
  { value: 'Тернопіль' }
]

const mockYears = [
  { value: '2020' },
  { value: '2022' },
  { value: '2023' },
  { value: '2024' }
]
</script>
