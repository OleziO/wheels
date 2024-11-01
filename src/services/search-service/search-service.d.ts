/* eslint-disable @typescript-eslint/no-unused-vars */
type TSearchFilters = string | string[] | number | number[] | [numeber, number]

interface IFilterOption {
  label: string
  value: string
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
  engine: number[]
  involvedAccident: string[]
  techCondition: string[]
  coating: string[]
  bodyType: string[]
  transmissionTypes: string[]
  driveTypes: string[]
  fuelTypes: string[]
}
