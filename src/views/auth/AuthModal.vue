<template>
  <el-dialog
    v-model="authStore.showAuthModal"
    class="custom-modal max-w-[600px] rounded-lg bg-creamy-light"
    @close="handleClose"
  >
    <AuthSignIn v-if="isLoginMode" v-model="loading" @login="handleSubmit" />
    <AuthSignUp v-else v-model="loading" @register="handleSubmit" />
    <AppButton type="text" text class="hover:!bg-transparent mx-auto mt-2" @click="isLoginMode = !isLoginMode">
      {{ isLoginMode ? 'Зареєструватися на Wheels.com' : 'Вже зареєстровані?' }}
    </AppButton>
  </el-dialog>
</template>

<script setup lang="ts">
import { ElNotification } from 'element-plus'
import { useAuthStore } from './auth.store'
import authService from './auth.service.service'
import AuthSignIn from './AuthSignIn.vue'
import AuthSignUp from './AuthSignUp.vue'

const authStore = useAuthStore()
const router = useRouter()

const isLoginMode = ref(true)
const loading = ref(false)

async function handleSubmit (data: ISignIn | ISignUp) {
  try {
    if (isLoginMode.value) {
      await authStore.signIn(data as ISignIn)
    } else {
      await authStore.signUp(data as ISignUp)
    }

    const session = await authService.getSession()

    if (session.session) {
      if (authStore.redirectLink) {
        router.push({ name: authStore.redirectLink })
        authStore.redirectLink = null
      }
    }

    loading.value = false
    authStore.showAuthModal = false
  } catch (error) {
    ElNotification({
      title: 'Помилка',
      message: isLoginMode.value ? 'Невірні дані для входу' : 'Невірні дані для реєстрації',
      type: 'error'
    })
  }
}

function handleClose () {
  authStore.showAuthModal = false
}

</script>
