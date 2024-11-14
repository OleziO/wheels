<template>
  <el-dialog
    v-model="authStore.showAuthModal"
    class="authModal max-w-[600px] rounded-lg bg-creamy-light"
    @close="handleClose"
  >
    <AuthSignIn v-if="isLoginMode" @login="handleSubmit" />
    <AuthSignUp v-else @register="handleSubmit" />
    <AppButton type="text" text class="hover:!bg-transparent mx-auto mt-2" @click="isLoginMode = !isLoginMode">
      {{ isLoginMode ? 'Зареєструватися на Wheels.com' : 'Вже зареєстровані?' }}
    </AppButton>
  </el-dialog>
</template>

<script setup lang="ts">
import { ElNotification } from 'element-plus'
import { useAuthStore } from './auth.store'
import AuthSignIn from './AuthSignIn.vue'
import AuthSignUp from './AuthSignUp.vue'

const authStore = useAuthStore()
const router = useRouter()

const isLoginMode = ref(true)

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

    authStore.showAuthModal = false
  } catch {
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
