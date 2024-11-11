import type { Database } from '@/api/types/database.types'
import type { FormRules } from 'element-plus'

class CreateService {
  defaultCreateData = {
    location: '',
    manufacture_year: '',
    transmission_type: '',
    fuel_type: '',
    brand: '',
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
    car_pictures: [] as string[]
  }

  infoCards = [
    {
      icon: 'icon-camera',
      title: 'Робіть якісні фотографії',
      text: 'Це може здатися очевидним, але якісні фотографії можуть значно вплинути на час, необхідний для продажу вашого автомобіля. Оголошення з хорошими фотографіями продаються втричі швидше'
    },
    {
      icon: 'icon-filter',
      title: 'Дотримуйтесь простоти',
      text: 'Опис транспортного засобу повинен бути коротким і простим. Викликайте додаткові опції, яких можуть не мати інші подібні автомобілі. І не забудьте згадати повну історію обслуговування, якщо вона у вас є.'
    },
    {
      icon: 'icon-guard',
      title: 'Будьте чесними',
      text: 'Важливо, щоб опис автомобіля був точним. Якщо на вашому автомобілі є невелика подряпина - будьте чесними. Це заощадить час на непотрібних переглядах, якщо покупці знають про будь-які недоліки з самого початку.'
    }
  ]

  createCarValidationRules: FormRules = {
    location: [
      { required: true, message: 'Вкажіть місцезнаходження', trigger: 'blur' }
    ],
    manufacture_year: [
      { required: true, message: 'Вкажіть рік виробництва', trigger: 'blur' }
    ],
    transmission_type: [
      { required: true, message: 'Оберіть тип коробки передач', trigger: 'blur' }
    ],
    fuel_type: [
      { required: true, message: 'Оберіть тип пального', trigger: 'blur' }
    ],
    price: [
      { required: true, message: 'Вкажіть ціну', trigger: 'blur' },
      { min: 4, max: 7, message: 'Вкажіть ціну у проміжку $100-$999k', trigger: 'blur' }
    ],
    mileage: [
      { required: true, message: 'Вкажіть пробіг', trigger: 'blur' },
      { min: 0, max: 2000, message: 'Вкажіть пробіг у проміжку 0-2000 (тис.км)', trigger: 'blur' }
    ],
    vin: [
      { required: false, pattern: /^[A-HJ-NPR-Z0-9]{17}$/, message: 'Введіть коректний VIN-код (17 символів, букви або цифри, окрім "I", "O", "Q")', trigger: 'blur' }
    ],
    model_id: [
      { required: true, message: 'Оберіть модель', trigger: 'blur' }
    ],
    brand: [
      { required: true, message: 'Оберіть бренд', trigger: 'blur' }
    ],
    drive_type: [
      { required: true, message: 'Оберіть тип приводу', trigger: 'blur' }
    ],
    vehicle_type: [
      { required: true, message: 'Оберіть тип транспорту', trigger: 'blur' }
    ],
    body_type: [
      { required: true, message: 'Вкажіть тип кузова', trigger: 'blur' }
    ],
    engine_volume: [
      { required: true, message: 'Вкажіть об’єм двигуна', trigger: 'blur' }
    ],
    registration_plate: [
      { required: true, message: 'Вкажіть номерний знак', trigger: 'blur' }
    ],
    color: [
      { required: true, message: 'Вкажіть колір', trigger: 'blur' }
    ]
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
      { key: 'parking_features', method: this.addParkingFeatures.bind(this) },
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

  async createCar (car: any) {
    const { data, error } = await supabase
      .from('cars')
      .insert(
        {
          ...this.removeEmptyCarFields(car) as TTables<'cars'>,
          car_condition: +car.mileage > 2000 ? 'Used' : 'New',
          price: car.price.replace('$', '')
        }
      )
      .select('id')

    if (error) throw error

    return data ? data[0]?.id : null
  }

  toFeaturesArr <T> (features: string[], carId: string) {
    return features.map(feature => ({ car_id: carId, feature_value: feature })) as T[]
  }
}

const createService = new CreateService()
export default createService
