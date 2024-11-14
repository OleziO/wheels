export const useGeneralStore = defineStore('generalStore', () => {

})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useGeneralStore, import.meta.hot))
}
