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
