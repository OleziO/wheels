import type { UserMetadata } from '@supabase/supabase-js'
import authService from './auth.service.service'

export interface IUser extends UserMetadata{
  avatar?: string
}

export const useAuthStore = defineStore('authStore', () => {
  const user = ref<IUser | undefined>()
  const showAuthModal = ref(false)
  const redirectLink = ref<string | null>(null)

  async function signIn (loginData: ISignIn) {
    user.value = (await authService.signIn(loginData)).user.user_metadata
    localStorage.setItem('userData', JSON.stringify(user.value))
  }

  async function signUp (registerData: ISignUp) {
    user.value = (await authService.signUp(registerData)).user?.user_metadata
    localStorage.setItem('userData', JSON.stringify(user.value))
  }

  async function logout () {
    await authService.logout()
    localStorage.removeItem('userData')
  }

  return {
    showAuthModal,
    user,
    redirectLink,
    signIn,
    signUp,
    logout
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAuthStore, import.meta.hot))
}
