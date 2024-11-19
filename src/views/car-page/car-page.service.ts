import type { Database } from '@/api/types/database.types'

class CarService {
  getMainInfo (car: TCar) {
    if (!car) return []

    const {
      models,
      mileage,
      car_colors: color,
      headlights,
      manufacture_year: manufactureYear,
      engine_volume: engineVolume,
      engine_power: enginePower,
      fuel_types: fuelType,
      transmission_types: transmissionType,
      drive_types: driveType,
      paint_conditions: paintCondition,
      tech_conditions: technicalCondition,
      interior_materials: interiorMaterial,
      interior_colors: interiorColor,
      interior_seats_adjustments: interiorSeatsAdjustments,
      heated_seats: heatedSeats,
      electric_windows: electricWindows,
      air_conditioning: airConditioning,
      power_steering: powerSteering,
      steering_wheel_adjustments: steeringWheelAdjustment,
      spare_wheels: spareWheel
    } = car

    const createInfo = (label: string, value: any) => value ? { label, value } : null

    return [
      createInfo('Марка, модель, рік випуску', `${models?.brand} ${models?.model} ${manufactureYear}`),
      createInfo('Пробіг', mileage ? `${mileage.toString()} тис.км` : null),
      createInfo('Двигун', engineVolume ? `${engineVolume} л ${enginePower ? `(${enginePower} к.с.)` : ''}` : null),
      createInfo('Пальне', fuelType?.label),
      createInfo('Коробка передач', transmissionType?.label),
      createInfo('Привід', driveType?.label),
      createInfo('Колір', color?.label),
      createInfo('Лакофарбове покриття', paintCondition?.label),
      createInfo('Технічний стан', technicalCondition?.label),
      createInfo('Фари', headlights?.label),
      createInfo('Матеріали салону', interiorMaterial?.label),
      createInfo('Колір салону', interiorColor?.label),
      createInfo('Регулювання сидінь салону', interiorSeatsAdjustments?.label),
      createInfo('Підігрів сидінь', heatedSeats?.label),
      createInfo('Електросклопідйомники', electricWindows?.label),
      createInfo('Кондиціонер', airConditioning?.label),
      createInfo('Підсилювач керма', powerSteering?.label),
      createInfo('Регулювання керма', steeringWheelAdjustment?.label),
      createInfo('Запасне колесо', spareWheel?.label)
    ].filter(item => item?.value) as IFilterOption[]
  }

  async getCarData (id: string, userId?: string) {
    const { data } = await supabase
      .from('cars')
      .select(`
        *, 
        models(*), 
        locations(*), 
        user_profiles(*),
        air_conditioning(*),
        electric_windows(*),
        heated_seats(*),
        interior_seats_adjustments(*),
        interior_colors(*),
        interior_materials(*),
        headlights(*),
        car_colors(*),
        car_conditions(*),
        paint_conditions(*),
        tech_conditions(*),
        vehicle_types(*),
        body_types(*),
        drive_types(*),
        fuel_types(*),
        transmission_types(*),
        spare_wheels(*),
        steering_wheel_adjustments(*),
        power_steering(*)
      `)
      .eq('id', id)
      .single()

    if (userId && data) {
      await supabase
        .from('cars_with_views')
        .insert({
          car_id: data.id,
          user_id: userId,
          model_id: data.models?.id
        })
    }

    return (data || {}) as TCar
  }

  async getCarFeatureData<T extends keyof Database['public']['Tables']> (
    tableName: T, carId: string
  ) {
    const { data } = await supabase
      .from(`cars_with_${tableName}` as T)
      .select(`*, ${tableName}!inner(*)`)
      .eq('car_id', carId)

    return (data || []) as any[]
  }

  async getCarFeatures (carId: string, isTextMode = true) {
    const featureTables = [
      'safety_features',
      'comfort_features',
      'airbag_features',
      'multimedia_features',
      'optic_features',
      'parking_assistance'
    ] as const

    const featureLabels = [
      'Безпека',
      'Салон та комфорт',
      'Подушка безпеки',
      'Мультимедіа',
      'Оптика',
      'Паркування'
    ]

    const featureData = await Promise.all(
      featureTables.map((table) => this.getCarFeatureData(table, carId))
    )

    if (!isTextMode) {
      const featureIdsMap = featureTables.reduce((acc, table, index) => {
        acc[table] = (featureData[index] || []).map((feature) => feature[table].value)
        return acc
      }, {} as { [key: string]: string[] })

      return featureIdsMap
    }

    return featureLabels.map((label, index) => ({
      label,
      value: (featureData[index] || []).map((feature) => feature[featureTables[index] || ''].label).join(' • ')
    })).filter(item => item?.value) as IFilterOption[]
  }

  async getRecommendedCars (price: number, id: string) {
    const { data } = await supabase
      .from('cars')
      .select('*, models!inner(*), locations!inner(*), fuel_types!inner(*), transmission_types!inner(*)')
      .eq('is_in_auction', false)
      .lte('price', price + 1500)
      .gte('price', price - 1500)
      .neq('id', id)
      .limit(9)

    if (data && data.length) {
      return data as TCar[]
    }

    const { data: altData } = await supabase
      .from('cars')
      .select('*, models!inner(*), locations!inner(*), fuel_types!inner(*), transmission_types!inner(*)')
      .eq('is_in_auction', false)
      .order('car_rate', { ascending: false })
      .limit(9)

    return (altData || []) as TCar[]
  }
}

export const carService = new CarService()
