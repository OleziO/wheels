import type { UserMetadata } from '@supabase/supabase-js'

export interface IUser extends UserMetadata{
  avatar?: string
}

export const useAuthStore = defineStore('authStore', () => {
  const user = ref<IUser>()
  const showAuthModal = ref(false)
  const redirectLink = ref<string | null>(null)

  async function signIn (loginData: ISignIn) {
    user.value = (await authService.signIn(loginData)).user.user_metadata
  }

  async function signUp (registerData: ISignUp) {
    user.value = (await authService.signUp(registerData)).user?.user_metadata
  }

  async function logout () {
    await authService.logout()
    user.value = undefined
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
