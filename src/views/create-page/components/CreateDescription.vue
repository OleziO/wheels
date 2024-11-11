<template>
  <CreateFormGroup :section-number="3" title="Опис автомобіля">
    <div class="text-gravel">
      <p class="body-2">В даному полі забороняється:</p>
      <ul class="mt-2.5 ml-2.5 secondary">
        <li class="flex gap-3.5 items-center">
          <i class="icon-arrow-drop-right text-xs" />
          Залишати посилання або контактні дані
        </li>
        <li class="flex gap-3.5 items-center">
          <i class="icon-arrow-drop-right text-xs" />
          Пропонувати інші (особисті) послуги
        </li>
      </ul>
    </div>
    <div class="max-w-[800px]">
      <AppInput
        v-model="createStore.createData.description"
        class="h-44"
        input-style="height: 176px; padding: 20px; font-size: 16px;"
        resize="none"
        type="textarea"
        maxlength="2000"
        show-word-limit
        placeholder="Введіть опис"
      />
    </div>
  </CreateFormGroup>
</template>

<script setup lang="ts">
const createStore = useCreateStore()
</script>
