type TSearchFilters = string | string[] | number | number[] | [numeber, number]

interface IPopularBrand {
  brand: string
  brand_logo: string
  car_count: number
}

interface IFilterOption {
  label: string
  value: string | boolean
}

interface IMappedCarModel extends TTables<'brands'>{
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
  manufactureYear: number[]
  price: [number, number]
}

interface ICarsSearchDataExtended extends ICarsSearchData{
  page: number
  carsConditions: string
  mileage: [number, number]
  engineVolume: number[]
  involvedAccident: string[]
  techCondition: string[]
  paintType: string[]
  bodyType: string[]
  transmissionTypes: string[]
  driveTypes: string[]
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

  price: IRangeOption
  mileage: IRangeOption

  models: Record<string, IMappedCarModel>
}
