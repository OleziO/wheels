<template>
  <div class="px-25 pt-6">
    <h3 class="h3 text-gray-dark mb-10">Вхід на сайт Wheels.com</h3>

    <el-form
      ref="loginFormRef"
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
import { type FormInstance, type FormRules } from 'element-plus'

const emit = defineEmits(['login'])

const loginData = defineModel<ISignIn>({ required: true })

const loginFormRef = ref<FormInstance>()

const validationRules: FormRules = {
  email: [
    { type: 'email', message: 'Введіть валідний Email', trigger: 'blur' },
    { required: true, message: 'Введіть Email', trigger: 'blur' }
  ]
}

async function handleLogin () {
  emit('login', loginData.value)
}

watch(() => loginData.value, () => {
  if (!loginData.value.email && !loginData.value.password) {
    loginFormRef.value?.resetFields()
  }
},
{ deep: true })

</script>
