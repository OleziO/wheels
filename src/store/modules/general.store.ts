export const useGeneralStore = defineStore('generalStore', () => {
  const rate = ref()
  const unreadMessagesCount = ref(0)

  return {
    rate,
    unreadMessagesCount
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useGeneralStore, import.meta.hot))
}
