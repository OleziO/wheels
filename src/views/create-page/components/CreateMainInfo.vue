<template>
  <CreateFormGroup :section-number="2" title="Основна інформація">
    <CreateFormItem title="Тип транспорту" prop="vehicle_type">
      <AppSelect
        v-model="createStore.createData.vehicle_type"
        placeholder="Оберіть тип"
        key-label="label"
        key-value="value"
        :options="selectCarData.searchFilterOptions.vehicleTypes"
      />
    </CreateFormItem>

    <CreateFormItem title="Марка авто" prop="brand">
      <AppSelect
        v-model="createStore.createData.brand"
        placeholder="Оберіть марку"
        key-label="brand_name"
        key-value="brand"
        :options="sortedBrands"
      />
    </CreateFormItem>

    <CreateFormItem title="Модель авто" prop="model_id">
      <AppSelect
        v-model="createStore.createData.model_id"
        placeholder="Оберіть модель"
        group-key-label="brand"
        group-key-value="models"
        key-value="id"
        key-label="model"
        :options="selectCarData.mappedModels([createStore.createData.brand])"
      />
    </CreateFormItem>

    <CreateFormItem title="Тип палива" prop="fuel_type">
      <AppSelect
        v-model="createStore.createData.fuel_type"
        placeholder="Оберіть тип палива"
        key-label="label"
        key-value="value"
        :options="selectCarData.searchFilterOptions.fuelTypes"
      />
    </CreateFormItem>

    <CreateFormItem title="Коробка передач" prop="transmission_type">
      <AppSelect
        v-model="createStore.createData.transmission_type"
        placeholder="Оберіть тип коробки передач"
        key-label="label"
        key-value="value"
        :options="selectCarData.searchFilterOptions.transmissionTypes"
      />
    </CreateFormItem>

    <CreateFormItem title="Тип приводу" prop="drive_type">
      <AppSelect
        v-model="createStore.createData.drive_type"
        placeholder="Оберіть тип приводу"
        key-value="value"
        key-label="label"
        :options="selectCarData.searchFilterOptions.driveTypes"
      />
    </CreateFormItem>

    <CreateFormItem title="Стиль кузова" prop="body_type">
      <AppSelect
        v-model="createStore.createData.body_type"
        placeholder="Оберіть стиль кузова"
        key-label="label"
        key-value="value"
        :options="selectCarData.searchFilterOptions.bodyType"
      />
    </CreateFormItem>

    <CreateFormItem title="Рік випуску" prop="manufacture_year">
      <AppSelect
        v-model="createStore.createData.manufacture_year"
        placeholder="Оберіть рік"
        key-label="label"
        key-value="value"
        :options="selectCarData.searchFilterOptions.manufactureYear"
      />
    </CreateFormItem>

    <CreateFormItem title="Об'єм двигуна (л)" prop="engine_volume">
      <AppSelect
        v-model="createStore.createData.engine_volume"
        placeholder="Оберіть об'єм двигуна"
        :options="selectCarData.searchFilterOptions?.engineVolume"
      />
    </CreateFormItem>

    <CreateFormItem title="Потужність двигуна" prop="engine_power">
      <div class="flex gap-2 items-center w-full">
        <AppInput
          v-model="createStore.createData.engine_power"
          type="number"
          placeholder="Введіть потужність двигуна"
        />
        <p class="body-1">к.с.</p>
      </div>
    </CreateFormItem>

    <CreateFormItem title="Пробіг" prop="mileage">
      <div class="flex gap-2 items-center w-full">
        <AppInput
          v-model="createStore.createData.mileage"
          type="number"
          placeholder="Введіть пробіг"
        />
        <p class="body-1">тис.км.</p>
      </div>
    </CreateFormItem>

    <CreateFormItem title="Реєстраційний номер" prop="registration_plate">
      <div class="flex gap-2 items-center w-full">
        <AppInput
          v-model="createStore.createData.registration_plate"
          placeholder="Введіть реєстраційний номер"
        />
      </div>
    </CreateFormItem>

    <CreateFormItem title="VIN Код" prop="vin">
      <div class="flex gap-2 items-center w-full">
        <AppInput
          v-model="createStore.createData.vin"
          placeholder="Введіть VIN код"
        />
      </div>
    </CreateFormItem>

    <CreateFormItem title="Місто" prop="location">
      <AppSelect
        v-model="createStore.createData.location"
        placeholder="Оберіть місто"
        key-label="label"
        key-value="value"
        :options="selectCarData.searchFilterOptions.location"
      />
    </CreateFormItem>
  </CreateFormGroup>
</template>

<script setup lang="ts">
const createStore = useCreateStore()
const selectCarData = useSearchStore()

const sortedBrands = computed(() => selectCarData.searchFilterOptions.brands.toSorted((a, b) => {
  return a.brand.localeCompare(b.brand)
}))
</script>
