<template>
  <el-dialog
    v-model="authStore.showAuthModal"
    class="authModal max-w-[600px] rounded-lg bg-creamy-light"
    @close="handleClose"
  >
    <AppAuthSignIn v-if="isLogin" @login="handleSubmit" />
    <AppAuthSignUp v-else @register="handleSubmit" />
    <AppButton type="text" text class="hover:!bg-transparent mx-auto mt-2" @click="isLogin = !isLogin">
      {{ isLogin ? 'Зареєструватися на Wheels.com' : 'Вже зареєстровані?' }}
    </AppButton>
  </el-dialog>
</template>

<script setup lang="ts">
import { useAuthStore } from './app-auth.store'
import authService from './app-auth.service.service'

const authStore = useAuthStore()
const router = useRouter()

const isLogin = ref(true)

async function handleSubmit (
  method: 'signIn' | 'signUp',
  data: ISignIn | ISignUp
) {
  try {
    if (method === 'signIn') await authService[method](data as ISignIn)
    else if (method === 'signUp') await authService[method](data as ISignUp)

    const session = await authService.getSession()

    if (session.session) {
      const redirectPath = localStorage.getItem('redirectAfterLogin')

      if (redirectPath) {
        localStorage.removeItem('redirectAfterLogin')
        router.push({ name: redirectPath })
      }
    }

    authStore.showAuthModal = false
  } catch (error) {
    ElNotification({
      title: 'Помилка',
      message: isLogin.value ? 'Невірні дані для входу' : 'Невірні дані для реєстрації',
      type: 'error'
    })
  }
}

function handleClose () {
  authStore.showAuthModal = false
}

</script>
