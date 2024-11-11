<template>
  <CreateFormGroup :section-number="4" title="Характеристики автомобіля">
    <CreateFormItem title="Колір" prop="color">
      <AppSelect
        v-model="createStore.createData.color"
        placeholder="Оберіть"
        key-label="label"
        key-value="value"
        :options="selectCarData.searchFilterOptions.colors"
      />
    </CreateFormItem>

    <CreateFormItem title="Участь в ДТП" prop="was_in_accident">
      <AppSelect
        v-model="createStore.createData.was_in_accident"
        placeholder="Оберіть"
        key-label="label"
        key-value="value"
        :options="selectCarData.searchFilterOptions.involvedAccident"
      />
    </CreateFormItem>

    <CreateFormItem title="Технічний стан" prop="technical_condition">
      <AppSelect
        v-model="createStore.createData.technical_condition"
        placeholder="Оберіть"
        key-label="label"
        key-value="value"
        :options="selectCarData.searchFilterOptions.techCondition"
      />
    </CreateFormItem>

    <CreateFormItem title="Лакофарбове покриття" prop="paint_condition">
      <AppSelect
        v-model="createStore.createData.paint_condition"
        placeholder="Оберіть"
        key-label="label"
        key-value="value"
        :options="selectCarData.searchFilterOptions.paintType"
      />
    </CreateFormItem>
  </CreateFormGroup>
</template>

<script setup lang="ts">
const createStore = useCreateStore()
const selectCarData = useSearchStore()
</script>
