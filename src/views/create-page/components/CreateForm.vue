<template>
  <div>
    <div class="w-fit bg-creamy ml-25 rounded-tl-25 rounded-tr-25 py-8 px-32">
      <h2 class="h2">{{ isPublished ? 'Успішна публікація' : 'Створити оголошення' }}</h2>
    </div>

    <div v-if="!loading">
      <el-form
        ref="formRef"
        :model="createStore.createData"
        show-message
        :rules="createService.createCarValidationRules"
        class="w-full flex flex-col gap-12.5 py-12.5 px-25 bg-creamy"
      >
        <CreateImageUpload />
        <CreateMainInfo />
        <CreateDescription />
        <CreateCharacteristics />
        <CreateOptions />
        <CreateAdditionalOptions />
        <CreatePrice />

        <div class="body-2 text-gray-dark">
          <el-checkbox v-model="acceptedPolicy">
            Я згоден(на) з умовами
            <a class="font-bold">Угоди про надання послуг</a>
          </el-checkbox>

          <p class="mt-7">
            Ваші персональні дані будуть оброблені та захищені згідно з
            <a class="font-bold">Політикою приватності</a>
          </p>

          <div class="flex gap-5 items-center mt-7">
            <AppButton
              :disabled="!acceptedPolicy"
              class="w-[400px]"
              @click="carSubmit"
            >
              Розмістити оголошення
            </AppButton>
            <p
              class="max-w-[305px] secondary text-gray-light"
            >
              При кліці на кнопку “Розмістити оголошення”
              Ви перейдете до публікації свого оголошення
            </p>
          </div>
        </div>
      </el-form>
    </div>

    <CreateCarSuccess v-else :create-loading="loading" :published="isPublished" />
  </div>
</template>

<script setup lang="ts">
import createService from '@/views/create-page/create.service'
import { ElNotification, type FormInstance } from 'element-plus'

const loading = defineModel<boolean>({ required: true })
const isPublished = ref(false)

const createStore = useCreateStore()
const authStore = useAuthStore()

const formRef = ref<FormInstance>()
const acceptedPolicy = ref(false)

async function carSubmit () {
  try {
    const isFormValid = formRef.value && await formRef.value.validate()

    if (isFormValid) {
      loading.value = true
      const { brand, ...payload } = createStore.createData

      const carId = await createService.createCar({
        ...payload,
        user_id: authStore.user.sup
      })

      if (carId) {
        await createService.addAllFeatures(createStore.carFeatures, carId)
      }

      isPublished.value = true
      createStore.clearCarData()
    }
  } catch {
    ElNotification({
      title: 'Помилка',
      message: "Введіть коректні дані та зповніть всі обов'язкові поля",
      type: 'error'
    })
    loading.value = false
  }
}
</script>
