<template>
  <div class="px-25 pt-6">
    <h3 class="h3 text-gray-dark mb-10">Вхід на сайт Wheels.com</h3>

    <el-form
      v-loading.fullscreen="loading"
      :model="loginData"
      class="flex flex-col gap-4"
      :rules="validationRules"
    >
      <el-form-item prop="email">
        <AppInput v-model:="loginData.email" placeholder="Введіть ваш e-mail" />
      </el-form-item>

      <AppInput type="password" show-password v-model:="loginData.password" placeholder="Введіть пароль" />

      <AppButton
        native-type="subnir"
        class="w-full mt-4"
        @click.prevent="handleLogin"
      >
        Увійти
      </AppButton>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import type { FormRules } from 'element-plus'

const loading = defineModel<boolean>()

const emit = defineEmits(['login'])

const loginData = ref<ISignIn>(authService.defaultLoginData)

const validationRules: FormRules = {
  email: [
    { type: 'email', message: 'Введіть валідний Email', trigger: 'blur' },
    { required: true, message: 'Введіть Email', trigger: 'blur' }
  ]
}

async function handleLogin () {
  loading.value = true

  emit('login', loginData.value)
}

</script>
