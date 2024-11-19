import type { Database } from '@/api/types/database.types'

class CreateCarService {
  defaultCreateData: ICarData = {
    location: '',
    manufacture_year: '',
    transmission_type: '',
    fuel_type: '',
    models: {
      brand: ''
    },
    price: '',
    mileage: '',
    vin: '',
    car_rate: '0',
    model_id: '',
    drive_type: '',
    paint_condition: '',
    was_in_accident: '',
    technical_condition: '',
    vehicle_type: '',
    body_type: '',
    engine_volume: '',
    registration_plate: '',
    description: '',
    engine_power: '',
    color: '',
    headlights: '',
    interior_material: '',
    interior_color: '',
    interior_seats_adjustment: '',
    spare_wheel: '',
    heated_seats: '',
    electric_windows: '',
    air_conditioning: '',
    power_steering: '',
    steering_wheel_adjustment: '',
    car_pictures: []
  }

  async addFeature (tableName: keyof Database['public']['Tables'], features: TTables<typeof tableName>[]) {
    const { data, error } = await supabase
      .from(tableName)
      .insert(features)
      .select()

    if (error) throw error

    return data
  }

  async addSafetyFeature (features: IFeature[]) {
    return this.addFeature('cars_with_safety_features', features as unknown as TTables<'cars_with_safety_features'>[])
  }

  async addComfortFeature (features: IFeature[]) {
    return this.addFeature('cars_with_comfort_features', features as unknown as TTables<'cars_with_comfort_features'>[])
  }

  async addMultimediaFeature (features: IFeature[]) {
    return this.addFeature('cars_with_multimedia_features', features as unknown as TTables<'cars_with_multimedia_features'>[])
  }

  async addOpticFeature (features: IFeature[]) {
    return this.addFeature('cars_with_optic_features', features as unknown as TTables<'cars_with_optic_features'>[])
  }

  async addParkingFeatures (features: IFeature[]) {
    return this.addFeature('cars_with_parking_assistance', features as unknown as TTables<'cars_with_parking_assistance'>[])
  }

  async addAirbagFeatures (features: IFeature[]) {
    return this.addFeature('cars_with_airbag_features', features as unknown as TTables<'cars_with_airbag_features'>[])
  }

  async addAllFeatures (allFeatures: ICarFeatures, carId: string) {
    const featureMethods: { key: keyof ICarFeatures; method: (features: IFeature[]) => Promise<any> }[] = [
      { key: 'safety_features', method: this.addSafetyFeature.bind(this) },
      { key: 'comfort_features', method: this.addComfortFeature.bind(this) },
      { key: 'multimedia_features', method: this.addMultimediaFeature.bind(this) },
      { key: 'optic_features', method: this.addOpticFeature.bind(this) },
      { key: 'parking_assistance', method: this.addParkingFeatures.bind(this) },
      { key: 'airbag_features', method: this.addAirbagFeatures.bind(this) }
    ]

    const tasks = featureMethods
      .filter(({ key }) => allFeatures[key].length > 0)
      .map(({ key, method }) => method(this.toFeaturesArr<IFeature>(allFeatures[key], carId)))

    if (tasks.length === 0) {
      return []
    }

    return await Promise.all(tasks).catch(error => { throw error })
  }

  async removeAllFeatures (carId: string) {
    const featureTableNames = [
      'cars_with_safety_features',
      'cars_with_comfort_features',
      'cars_with_multimedia_features',
      'cars_with_optic_features',
      'cars_with_parking_assistance',
      'cars_with_airbag_features'
    ]

    const deletePromises = featureTableNames.map(table =>
      supabase
        .from(table as keyof Database['public']['Tables'])
        .delete()
        .eq('car_id', carId)
        .select()
    )

    await Promise.all(deletePromises)
  }

  removeEmptyCarFields (car: object) {
    return Object.fromEntries(
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      Object.entries(car).filter(([_, value]) =>
        value !== '' &&
        !(Array.isArray(value) && value.length === 0) &&
        !(typeof value === 'object' && value !== null && Object.keys(value).length === 0)
      )
    )
  }

  removeFeatures (car: any) {
    const {
      safety_features: safetyFeatures,
      airbag_features: airbagFeatures,
      optic_features: opticFeatures,
      multimedia_features: mediaFeatures,
      comfort_features: comfortFeatures,
      parking_assistance: parkingFeatures,
      ...carOnly
    } = car

    return carOnly
  }

  removeMappedFields (car: any) {
    const {
      models,
      locations,
      user_profiles: userProfiles,
      air_conditioning: airConditioning,
      electric_windows: electricWindows,
      heated_seats: heatedSeats,
      interior_seats_adjustments: interiorSeatsAdjustments,
      interior_colors: interiorColors,
      interior_materials: interiorMaterials,
      headlights,
      car_colors: carColors,
      car_conditions: carConditions,
      paint_conditions: paintConditions,
      tech_conditions: techConditions,
      vehicle_types: vehicleTypes,
      body_types: bodyTypes,
      drive_types: driveTypes,
      fuel_types: fuelTypes,
      transmission_types: transmissionTypes,
      spare_wheels: spareWheels,
      steering_wheel_adjustments: steeringWheelAdjustments,
      power_steering: powerSteering,
      ...carOnly
    } = car

    return carOnly
  }

  async createCar (car: any) {
    const { data, error } = await supabase
      .from('cars')
      .insert(
        {
          ...this.removeMappedFields({ ...this.removeEmptyCarFields(car) }) as TTables<'cars'>,
          car_condition: +car.mileage > 2000 ? 'Used' : 'New',
          price: car.price.replace('$', '')
        }
      )
      .select('id')
      .single()

    if (error) throw error

    return data.id || null
  }

  async updateCar (car: any, carId: string) {
    const { data, error } = await supabase
      .from('cars')
      .update(
        {
          ...this.removeMappedFields({
            ...this.removeFeatures({
              ...this.removeEmptyCarFields(car) as TTables<'cars'>,
              car_condition: +car.mileage > 2000 ? 'Used' : 'New',
              price: car.price.replace('$', '')
            })
          })
        } as TTables<'cars'>
      )
      .eq('id', carId)
      .select('id')
      .single()

    if (error) throw error

    return data.id || null
  }

  toFeaturesArr <T> (features: string[], carId: string) {
    return features.map(feature => ({ car_id: carId, feature_value: feature })) as T[]
  }
}

export const createCarService = new CreateCarService()
