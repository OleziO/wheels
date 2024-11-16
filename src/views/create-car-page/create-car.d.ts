interface IFeature {
  car_id: string
  feature_id: string
}

interface ICarFeatures {
  safety_features: string[]
  comfort_features: string[]
  multimedia_features: string[]
  optic_features: string[]
  parking_features: string[]
  airbag_features: string[]
}

interface ICarData {
  location: string
  manufacture_year: string
  transmission_type: string
  fuel_type: string
  brand: string
  price: string
  mileage: string
  vin: string
  description: string
  car_rate: string
  engine_volume: string
  engine_power: string
  registration_plate: string
  model_id: string
  drive_type: string
  car_pictures: string[]
  [key: string]: string | string[]
}

interface IPublishStatus {
  isReqEnd: boolean
  isProgressEnd: boolean
}
