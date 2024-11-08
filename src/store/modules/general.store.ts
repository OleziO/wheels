export const useGeneralStore = defineStore('generalStore', () => {
  const user = ref<IUser | null>(null)

  return {
    user
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useGeneralStore, import.meta.hot))
}
