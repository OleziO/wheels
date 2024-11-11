import { cloneDeep } from 'lodash-es'

export const useCreateStore = defineStore('createStore', () => {
  const createData = ref(cloneDeep(createService.defaultCreateData))

  const carFeatures = ref<ICarFeatures>({
    safety_features: [],
    comfort_features: [],
    multimedia_features: [],
    optic_features: [],
    parking_features: [],
    airbag_features: []
  })

  function clearCarData () {
    Object.assign(createData.value, cloneDeep(createService.defaultCreateData))
  }

  return {
    createData,
    carFeatures,
    clearCarData
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useCreateStore, import.meta.hot))
}
