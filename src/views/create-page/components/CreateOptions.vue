<template>
  <CreateFormGroup :section-number="5" title="Опції">
    <CreateFormItem title="Кондиціонер" prop="air_conditioning">
      <AppSelect
        v-model="createStore.createData.air_conditioning"
        placeholder="Оберіть"
        key-label="label"
        key-value="value"
        :options="selectCarData.searchFilterOptions.airConditioning"
      />
    </CreateFormItem>

    <CreateFormItem title="Електросклопідйомники" prop="electric_windows">
      <AppSelect
        v-model="createStore.createData.electric_windows"
        placeholder="Оберіть"
        key-label="label"
        key-value="value"
        :options="selectCarData.searchFilterOptions.electricWindows"
      />
    </CreateFormItem>

    <CreateFormItem title="Матеріали салону" prop="interior_material">
      <AppSelect
        v-model="createStore.createData.interior_material"
        placeholder="Оберіть"
        key-label="label"
        key-value="value"
        :options="selectCarData.searchFilterOptions.interiorMaterials"
      />
    </CreateFormItem>

    <CreateFormItem title="Колір салону" prop="interior_color">
      <AppSelect
        v-model="createStore.createData.interior_color"
        placeholder="Оберіть"
        key-label="label"
        key-value="value"
        :options="selectCarData.searchFilterOptions.interiorColors"
      />
    </CreateFormItem>

    <CreateFormItem title="Підсилювач керма" prop="power_steering">
      <AppSelect
        v-model="createStore.createData.power_steering"
        placeholder="Оберіть"
        key-label="label"
        key-value="value"
        :options="selectCarData.searchFilterOptions.powerSteering"
      />
    </CreateFormItem>

    <CreateFormItem title="Регулювання керма" prop="steering_wheel_adjustment">
      <AppSelect
        v-model="createStore.createData.steering_wheel_adjustment"
        placeholder="Оберіть"
        key-label="label"
        key-value="value"
        :options="selectCarData.searchFilterOptions.steeringWheelAdjustments"
      />
    </CreateFormItem>

    <CreateFormItem title="Запасне колесо" prop="spare_wheel">
      <AppSelect
        v-model="createStore.createData.spare_wheel"
        placeholder="Оберіть"
        key-label="label"
        key-value="value"
        :options="selectCarData.searchFilterOptions.spareWheels"
      />
    </CreateFormItem>

    <CreateFormItem title="Фари" prop="headlights">
      <AppSelect
        v-model="createStore.createData.headlights"
        placeholder="Оберіть"
        key-label="label"
        key-value="value"
        :options="selectCarData.searchFilterOptions.headlights"
      />
    </CreateFormItem>

    <CreateFormItem title="Регулювання сидінь" prop="interior_seats_adjustment">
      <AppSelect
        v-model="createStore.createData.interior_seats_adjustment"
        placeholder="Оберіть"
        key-label="label"
        key-value="value"
        :options="selectCarData.searchFilterOptions.interiorSeatsAdjustments"
      />
    </CreateFormItem>

    <CreateFormItem title="Підігрів сидінь" prop="heated_seats">
      <AppSelect
        v-model="createStore.createData.heated_seats"
        placeholder="Оберіть"
        key-label="label"
        key-value="value"
        :options="selectCarData.searchFilterOptions.heatedSeats"
      />
    </CreateFormItem>
  </CreateFormGroup>
</template>

<script setup lang="ts">
const createStore = useCreateStore()
const selectCarData = useSearchStore()
</script>
