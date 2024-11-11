<template>
  <CreateFormGroup :section-number="6" title="Додаткові опції">
    <CreateFormItem title="Безпека" prop="safety_features">
      <AppSelect
        v-model="createStore.carFeatures.safety_features"
        placeholder="Оберіть"
        key-label="label"
        key-value="value"
        multiple
        collapse-tags
        :options="selectCarData.searchFilterOptions.safetyFeature"
      />
    </CreateFormItem>

    <CreateFormItem title="Салон та комфорт" prop="comfort_features">
      <AppSelect
        v-model="createStore.carFeatures.comfort_features"
        placeholder="Оберіть"
        key-label="label"
        key-value="value"
        multiple
        collapse-tags
        :options="selectCarData.searchFilterOptions.comfortFeatures"
      />
    </CreateFormItem>

    <CreateFormItem title="Мультимедія" prop="multimedia_features">
      <AppSelect
        v-model="createStore.carFeatures.multimedia_features"
        placeholder="Оберіть"
        key-label="label"
        key-value="value"
        multiple
        collapse-tags
        :options="selectCarData.searchFilterOptions.multimediaFeatures"
      />
    </CreateFormItem>

    <CreateFormItem title="Оптика" prop="optic_features">
      <AppSelect
        v-model="createStore.carFeatures.optic_features"
        placeholder="Оберіть"
        key-label="label"
        key-value="value"
        multiple
        collapse-tags
        :options="selectCarData.searchFilterOptions.opticFeatures"
      />
    </CreateFormItem>

    <CreateFormItem title="Система допомоги при паркуванні" prop="parking_features">
      <AppSelect
        v-model="createStore.carFeatures.parking_features"
        placeholder="Оберіть"
        key-label="label"
        key-value="value"
        multiple
        collapse-tags
        :options="selectCarData.searchFilterOptions.parkingFeatures"
      />
    </CreateFormItem>

    <CreateFormItem title="Подушка безпеки" prop="airbag_features">
      <AppSelect
        v-model="createStore.carFeatures.airbag_features"
        placeholder="Оберіть"
        key-label="label"
        key-value="value"
        multiple
        collapse-tags
        :options="selectCarData.searchFilterOptions.airbagFeatures"
      />
    </CreateFormItem>
  </CreateFormGroup>
</template>

<script setup lang="ts">
const createStore = useCreateStore()
const selectCarData = useSearchStore()
</script>
