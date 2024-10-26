interface IVehicleType {
  label: string
  value: string
}

interface ICarBrand {
  brandName: string
  brandId: string
}

interface ICarModel {
  brandId: string
  modelId: string
  modelName: string
}

interface IMappedCarModel extends ICarBrand {
  modelsList: ICarModel[]
}

interface ICarCity {
  cityName: string
  cityId: string
}

interface IYearItem {
  label: string
  value: string
}

interface ICarFilterOptionPrice {
  min: number
  max: number
}

type TCarPriceRangePrice = [number, number]

interface ICarsSearchData {
  vehicleTypes: string[]
  brands: string[]
  models: string[]
  cities: string[]
  years: string[]
  price: TCarPriceRangePrice
}

interface ICarsFiltersOptions {
  vehicleTypes: IVehicleType[]
  brands: ICarBrand[]
  models: IMappedCarModel[]
  cities: ICarCity[]
  years: IYearItem[]
  price: ICarFilterOptionPrice
}
