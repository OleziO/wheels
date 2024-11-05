type TSearchFilters = string | string[] | number | number[] | [numeber, number]

interface IPopularBrand {
  brand: string
  brand_logo: string
  car_count: number
}

interface IFilterOption {
  label: string
  value: string | any
}

interface IMappedCarModel{
  brand: string
  models: TTables<'models'>[]
}

interface ICarCity {
  cityName: string
  cityId: string
}

interface IRangeOption {
  min: number
  max: number
}

interface ICarsSearchData {
  vehicleTypes: string[]
  brands: string[]
  models: string[]
  location: string[]
  fromManufactureYear: number | null
  toManufactureYear: number | null
  price: [number, number]
  page: number
  perPage: string
  sortingType: keyof TCar
  sortingOrder: 'asc' | 'desc'
  carsConditions: string
  mileage: [number, number]
  fromEngineVolume: number | null
  toEngineVolume: number | null
  involvedAccident: string[] | null
  techCondition: string[]
  paintType: string[]
  bodyType: string[]
  transmissionTypes: string[]
  driveTypes: string[]
  search: string
  fuelTypes: string[]
}

interface ISearchFiltersOptions {
  transmissionTypes: TTables<'transmission_types'>[]
  carsConditions: TTables<'car_conditions'>[]
  vehicleTypes: TTables<'vehicle_types'>[]
  driveTypes: TTables<'drive_types'>[]
  fuelTypes: TTables<'fuel_types'>[]
  location: TTables<'locations'>[]
  bodyType: TTables<'body_types'>[]
  brands: TTables<'brands'>[]

  involvedAccident: IFilterOption[]
  manufactureYear: IFilterOption[]
  techCondition: IFilterOption[]
  engineVolume: IFilterOption[]
  paintType: IFilterOption[]
  perPage: IFilterOption[]
  sortingTypes: IFilterOption[]

  price: IRangeOption
  mileage: IRangeOption

  models: IMappedCarModel[]
}
