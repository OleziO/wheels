import authService from './app-auth.service.service'

export const useAuthStore = defineStore('authStore', () => {
  const showAuthModal = ref(false)
  const registerData = ref<ISignUp>(authService.defaultRegisterData)
  const loginData = ref<ISignIn>(authService.defaultLoginData)

  return {
    showAuthModal,
    registerData,
    loginData
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useGeneralStore, import.meta.hot))
}
