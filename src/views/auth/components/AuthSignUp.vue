<template>
  <div class="px-25 pt-6">
    <h3 class="h3 text-gray-dark mb-10">Реєстрація на сайт Wheels.com</h3>

    <el-form
      :model="registerData"
      class="flex flex-col gap-4"
      :rules="validationRules"
    >
      <el-form-item prop="firstName">
        <AppInput v-model:="registerData.firstName" placeholder="Введіть ваше ім'я" />
      </el-form-item>

      <el-form-item prop="lastName">
        <AppInput v-model:="registerData.lastName" placeholder="Введіть ваше прізвище" />
      </el-form-item>

      <el-form-item prop="email">
        <AppInput
          v-model:="registerData.email"
          type="email"
          placeholder="Введіть ваш Email"
        />
      </el-form-item>

      <el-form-item prop="phone">
        <AppInput
          v-maska="'+38 (###) ###-##-##'"
          v-model:="registerData.phone"
          placeholder="Введіть ваш номер телефону"
        />
      </el-form-item>

      <el-form-item prop="password">
        <AppInput
          v-model:="registerData.password"
          placeholder="Введіть ваш пароль"
          type="password"
          show-password
        />
      </el-form-item>

      <AppButton
        class="w-full mt-4"
        @click="$emit('register', registerData)"
      >
        Зареєструватися
      </AppButton>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import type { FormRules } from 'element-plus'
import { vMaska } from 'maska/vue'

defineEmits(['register'])

const registerData = ref<ISignUp>(authService.defaultRegisterData)

const validationRules: FormRules = {
  email: [
    { type: 'email', message: 'Введіть валідний Email', trigger: 'blur' },
    { required: true, message: 'Введіть Email', trigger: 'blur' }
  ],
  password: [
    { required: true, message: 'Введіть пароль', trigger: 'blur' },
    { min: 6, message: 'Пароль повинен бути довшим за 6 символів', trigger: 'blur' }
  ],
  firstName: [
    { required: true, min: 2, message: "Введіть коректне ім'я", trigger: 'blur' }

  ],
  lastName: [
    { required: true, min: 2, message: 'Введіть коректне прізвище', trigger: 'blur' }
  ],
  phone: [
    { required: true, message: 'Введіть номер телефону', trigger: 'blur' },
    { min: 19, message: 'Введіть коректний номер телефону', trigger: 'blur' }
  ]
}

</script>
