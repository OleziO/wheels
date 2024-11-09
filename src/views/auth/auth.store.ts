import authService from './auth.service.service'

export const useAuthStore = defineStore('authStore', () => {
  const user = ref<IUser | null>(null)
  const showAuthModal = ref(false)

  async function signIn (loginData: ISignIn) {
    user.value = (await authService.signIn(loginData)).user.user_metadata as IUser
    localStorage.setItem('userData', JSON.stringify(user.value))
  }

  async function signUp (registerData: ISignUp) {
    user.value = (await authService.signUp(registerData)).user?.user_metadata as IUser
    localStorage.setItem('userData', JSON.stringify(user.value))
  }

  async function logout () {
    await authService.logout()
    localStorage.removeItem('userData')
  }

  return {
    showAuthModal,
    user,
    signIn,
    signUp,
    logout
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAuthStore, import.meta.hot))
}
