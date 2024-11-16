export const useGeneralStore = defineStore('generalStore', () => {
  const rate = ref()

  return {
    rate
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useGeneralStore, import.meta.hot))
}
