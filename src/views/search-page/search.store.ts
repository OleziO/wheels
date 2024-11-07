import searchService from '@/views/search-page/search.service'
import { cloneDeep } from 'lodash-es'

export const useSearchStore = defineStore('searchStore', () => {
  const isFetchedSearcFilters = ref(false)
  const defaultSearchData: ICarsSearchData = {
    involvedAccident: null,
    fromManufactureYear: null,
    toManufactureYear: null,
    fromEngineVolume: null,
    toEngineVolume: null,
    carsConditions: '',
    page: 1,
    perPage: '20',
    sortingType: 'created_at' as keyof TCar,
    sortingOrder: 'desc',
    search: '',
    vehicleTypes: [],
    brands: [],
    models: [],
    location: [],
    price: [0, 1000000],
    mileage: [0, 2000],
    techCondition: [],
    paintType: [],
    bodyType: [],
    transmissionTypes: [],
    driveTypes: [],
    fuelTypes: []
  }

  const searchData = ref<ICarsSearchData>(cloneDeep(defaultSearchData))

  const searchFilterOptions = ref<ISearchFiltersOptions>({
    transmissionTypes: [],
    carsConditions: [],
    vehicleTypes: [],
    driveTypes: [],
    fuelTypes: [],
    location: [],
    bodyType: [],
    techCondition: [],
    brands: [],
    models: [],
    paintType: [],
    colors: [],
    airConditioning: [],
    electricWindows: [],
    interiorMaterials: [],
    interiorColors: [],
    powerSteering: [],
    steeringWheelAdjustments: [],
    interiorSeatsAdjustments: [],
    spareWheels: [],
    headlights: [],
    heatedSeats: [],
    safetyFeature: [],
    comformFeatures: [],
    multimediaFeatures: [],
    opticFeatures: [],
    parkingFeatures: [],
    airbagFeatures: [],
    price: { min: 0, max: 1000000 },
    mileage: { min: 0, max: 2000 },
    manufactureYear: searchService.getYears(),
    perPage: searchService.perPage,
    involvedAccident: searchService.accidentTypes,
    engineVolume: searchService.engineVolumes,
    sortingTypes: searchService.sortingTypes
  })

  async function getSearchFilterOptions () {
    if (isFetchedSearcFilters.value) return searchFilterOptions.value

    const [
      brands,
      models,
      location,
      vehicleTypes,
      carsConditions,
      bodyType,
      transmissionTypes,
      fuelTypes,
      driveTypes,
      techCondition,
      paintType,
      colors,
      airConditioning,
      electricWindows,
      interiorMaterials,
      interiorColors,
      powerSteering,
      steeringWheelAdjustments,
      spareWheels,
      headlights,
      interiorSeatsAdjustments,
      heatedSeats,
      safetyFeature,
      comformFeatures,
      multimediaFeatures,
      opticFeatures,
      parkingFeatures,
      airbagFeatures
    ] = await Promise.all([
      searchService.getBrands(),
      searchService.getModels(),
      searchService.getLocations(),
      searchService.getVehicleTypes(),
      searchService.getCarConditions(),
      searchService.getBodyTypes(),
      searchService.getTransmissionTypes(),
      searchService.getFuelTypes(),
      searchService.getDriveTypes(),
      searchService.getCarTechConditions(),
      searchService.getCarPaintConditions(),
      searchService.getColors(),
      searchService.getAirConditioning(),
      searchService.getElectricWindows(),
      searchService.getInteriorMaterials(),
      searchService.getInteriorColors(),
      searchService.getPowerSteering(),
      searchService.getSteeringWheelAdjustments(),
      searchService.getSpareWheels(),
      searchService.getHeadlights(),
      searchService.getInteriorSeatsAdjustments(),
      searchService.getHeatedSeats(),
      searchService.getSafetyFeatures(),
      searchService.getComformFeatures(),
      searchService.getMultimediaFeatures(),
      searchService.getOpticFeatures(),
      searchService.getParkingFeatures(),
      searchService.getAirbagFeatures()
    ])

    searchFilterOptions.value = {
      ...searchFilterOptions.value,
      transmissionTypes,
      carsConditions,
      techCondition,
      vehicleTypes,
      driveTypes,
      fuelTypes,
      location,
      bodyType,
      paintType,
      brands,
      models,
      colors,
      airConditioning,
      electricWindows,
      interiorMaterials,
      interiorColors,
      powerSteering,
      steeringWheelAdjustments,
      spareWheels,
      headlights,
      interiorSeatsAdjustments,
      heatedSeats,
      safetyFeature,
      comformFeatures,
      multimediaFeatures,
      opticFeatures,
      parkingFeatures,
      airbagFeatures
    }

    isFetchedSearcFilters.value = true
  }

  function setSearchDataFromQuery (query: ICarsSearchData) {
    searchData.value = {
      ...searchService.getArrFields(query),
      involvedAccident: query.involvedAccident || defaultSearchData.involvedAccident,
      fromManufactureYear: query.fromManufactureYear || defaultSearchData.fromManufactureYear,
      toManufactureYear: query.toManufactureYear || defaultSearchData.toManufactureYear,
      fromEngineVolume: query.fromEngineVolume || defaultSearchData.fromEngineVolume,
      toEngineVolume: query.fromEngineVolume || defaultSearchData.toEngineVolume,
      carsConditions: query.carsConditions || defaultSearchData.carsConditions,
      page: query.page || defaultSearchData.page,
      perPage: query.perPage || defaultSearchData.perPage,
      sortingType: query.sortingType || defaultSearchData.sortingType,
      sortingOrder: query.sortingType || defaultSearchData.sortingOrder,
      search: query.search || defaultSearchData.search
    }
  }

  function mappedModels (brands: string[]) {
    return searchFilterOptions.value.models.filter(model => (brands || [] as string[]).includes(model.brand))
  }

  return {
    searchData,
    searchFilterOptions,
    defaultSearchData,
    mappedModels,
    getSearchFilterOptions,
    setSearchDataFromQuery
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useGeneralStore, import.meta.hot))
}
