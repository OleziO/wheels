<template>
  <div class="px-25 pt-6">
    <h3 class="h3 text-gray-dark mb-10">Вхід на сайт Wheels.com</h3>

    <form class="flex flex-col gap-4">
      <AppInput v-model:="authStore.loginData.login" placeholder="Введіть ваш e-mail" />
      <AppInput type="password" show-password v-model:="authStore.loginData.password" placeholder="Введіть пароль" />

      <AppButton class="w-full mt-4" @click="$emit('login', 'signIn', authStore.loginData)">Увійти</AppButton>
    </form>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from './app-auth.store'

const authStore = useAuthStore()
defineEmits(['login'])

</script>
