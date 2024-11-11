export const useGeneralStore = defineStore('generalStore', () => {
  const mainContainerRef = ref()
  return {
    mainContainerRef
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useGeneralStore, import.meta.hot))
}
