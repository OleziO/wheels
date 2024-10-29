interface IVehicleType {
  label: string
  value: string
}

interface IMappedCarModel extends TTables<'car brands'>{
  models: TTables<'car models'>[]
}

interface ICarCity {
  cityName: string
  cityId: string
}

interface ICarYearFilter {
  label: string
  value: string
}

interface ICarPriceFilter {
  min: number
  max: number
}

type TCarPriceRangePrice = [number, number]

interface ICarsSearchData {
  vehicleTypes: string[]
  brands: number[]
  models: string[]
  cities: string[]
  years: number[]
  price: TCarPriceRangePrice
}
