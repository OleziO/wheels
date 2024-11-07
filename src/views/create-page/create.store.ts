export const useCreate = defineStore('createStore', () => {
  const createData = ref <TTables<'cars'> | any>({
    carPictures: [] as string[],
    vehicleType: '',
    brand: '',
    model: '',
    manufactureYear: null,
    mileage: null,
    bodyType: '',
    location: '',
    description: '',
    color: '',
    involvedAccident: '',
    techCondition: '',
    paintType: '',
    price: null,
    airbagFeatures: [],
    parkingFeatures: [],
    opticFeatures: [],
    multimediaFeatures: [],
    comformFeatures: [],
    safetyFeature: []
  })

  return {
    createData
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useGeneralStore, import.meta.hot))
}
