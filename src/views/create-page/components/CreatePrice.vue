<template>
  <CreateFormGroup :section-number="7" title="Вартість">
    <CreateFormItem title="Ціна" prop="price">
      <div class="flex gap-2 items-center w-full">
        <AppInput
          v-model="createStore.createData.price"
          v-maska="'$######'"
          placeholder="Введіть вартість"
        />
      </div>
    </CreateFormItem>
  </CreateFormGroup>
</template>

<script setup lang="ts">
import { vMaska } from 'maska/vue'
const createStore = useCreateStore()

</script>
