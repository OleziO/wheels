interface IFeature {
  car_id: string
  feature_id: string
}

interface ICarFeatures {
  safety_features: string[]
  comfort_features: string[]
  multimedia_features: string[]
  optic_features: string[]
  parking_assistance: string[]
  airbag_features: string[]
}

interface ICarData {
  location: string
  manufacture_year: string
  transmission_type: string
  fuel_type: string
  models: {
    brand: string
  }
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
  paint_condition: string
  was_in_accident: string
  technical_condition: string
  vehicle_type: string
  body_type: string
  engine_volume: string
  registration_plate: string
  description: string
  engine_power: string
  color: string
  headlights: string
  interior_material: string
  interior_color: string
  interior_seats_adjustment: string
  spare_wheel: string
  heated_seats: string
  electric_windows: string
  air_conditioning: string
  power_steering: string
  steering_wheel_adjustment: string
  car_pictures: []
}

interface IPublishStatus {
  isReqEnd: boolean
  isProgressEnd: boolean
}
