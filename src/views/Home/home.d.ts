interface IVehicleType {
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

interface ICarYearFilter {
  label: string
  value: string
}

interface ICarPriceFilter {
  min: number
  max: number
}

interface ICarsSearchData {
  vehicleTypes: string[]
  brands: string[]
  models: string[]
  cities: string[]
  years: number[]
  price: [number, number]
  page?: number
}
