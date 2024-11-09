<template>
  <div class="px-25 pt-6">
    <h3 class="h3 text-gray-dark mb-10">Вхід на сайт Wheels.com</h3>

    <el-form
      :model="loginData"
      class="flex flex-col gap-4"
      :rules="authService.validationRules"
    >
      <el-form-item prop="email">
        <AppInput v-model:="loginData.email" placeholder="Введіть ваш e-mail" />
      </el-form-item>

      <AppInput type="password" show-password v-model:="loginData.password" placeholder="Введіть пароль" />

      <AppButton class="w-full mt-4" @click="$emit('login', loginData)">Увійти</AppButton>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import authService from './auth.service.service'

const loginData = ref<ISignIn>(authService.defaultLoginData)

defineEmits(['login'])

</script>
