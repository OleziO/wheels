<template>
  <div class="px-25 pt-6">
    <h3 class="h3 text-gray-dark mb-10">Реєстрація на сайт Wheels.com</h3>

    <form class="flex flex-col gap-4">
      <AppInput v-model:="authStore.registerData.firstName" placeholder="Введіть ваше ім'я" />
      <AppInput v-model:="authStore.registerData.lastName" placeholder="Введіть ваше прізвище" />
      <AppInput v-model:="authStore.registerData.email" placeholder="Введіть ваш Email" />
      <AppInput
        v-maska="'+38 (###) ###-##-##'"
        v-model:="authStore.registerData.phone"
        placeholder="Введіть ваш номер телефону"
      />
      <AppInput
        v-model:="authStore.registerData.password"
        placeholder="Введіть ваш пароль"
        type="password"
        show-password
      />

      <AppButton
        class="w-full mt-4"
        @click="$emit('register','signUp', authStore.registerData)"
      >
        Зареєструватися
      </AppButton>
    </form>
  </div>
</template>

<script setup lang="ts">
import { vMaska } from 'maska/vue'
import { useAuthStore } from './app-auth.store'

const authStore = useAuthStore()
defineEmits(['register'])

</script>
