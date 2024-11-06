class CarService {
  getMainInfo (car: TCar) {
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
      spare_wheels: spareWheel,
      comfort_features: comfortFeatures,
      safety_features: safetyFeatures,
      multimedia_features: multimediaFeatures,
      optic_features: opticFeatures,
      parking_assistance: parkingAssistance,
      airbag_features: airbagFeatures
    } = car ?? {}

    return [
      {
        label: 'Марка, модель, рік випуску',
        value: `${models?.brand} ${models?.model} ${manufactureYear} `
      },
      {
        label: 'Пробіг',
        value: mileage && `${mileage?.toString()} тис.км`
      },
      {
        label: 'Двигун',
        value: engineVolume && `${engineVolume} л ${enginePower ? `(${enginePower} к.с.)` : ''}`
      },
      {
        label: 'Пальне',
        value: fuelType?.label
      },
      {
        label: 'Коробка передач',
        value: transmissionType?.label
      },
      {
        label: 'Привід',
        value: driveType?.label
      },
      {
        label: 'Колір',
        value: color?.label
      },
      {
        label: 'Лакофарбове покриття',
        value: paintCondition?.label
      },
      {
        label: 'Технічний стан',
        value: technicalCondition?.label
      },
      {
        label: 'Фари',
        value: headlights?.label
      },
      {
        label: 'Матеріали салону',
        value: interiorMaterial?.label
      },
      {
        label: 'Колір салону',
        value: interiorColor?.label
      },
      {
        label: 'Регулювання сидінь салону',
        value: interiorSeatsAdjustments?.label
      },
      {
        label: 'Підігрів сидінь',
        value: heatedSeats?.label
      },
      {
        label: 'Електросклопідйомники',
        value: electricWindows?.label
      },
      {
        label: 'Кондиціонер',
        value: airConditioning?.label
      },
      {
        label: 'Підсилювач керма',
        value: powerSteering?.label
      },
      {
        label: 'Регулювання керма',
        value: steeringWheelAdjustment?.label
      },
      {
        label: 'Запасне колесо',
        value: spareWheel?.label
      },
      {
        label: 'Безпека',
        value: safetyFeatures?.join(' • ')
      },
      {
        label: 'Салон та комфорт',
        value: comfortFeatures?.join(' • ')
      },
      {
        label: 'Мультимедіа',
        value: multimediaFeatures?.join(' • ')
      },
      {
        label: 'Оптика',
        value: opticFeatures?.join(' • ')
      },
      {
        label: 'Система допомоги при паркуванні',
        value: parkingAssistance?.join(' • ')
      },
      {
        label: 'Подушки безпеки',
        value: airbagFeatures?.join(' • ')
      }

    ].filter(item => item.value && item.value !== 'null')
  }

  async getCarData (id: string) {
    const { data } = await supabase
      .from('cars')
      .select(`
        *, 
        models(*), 
        locations(*), 
        user_profiles(*),
        air_conditionings(*),
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

    return (data ? data[0] : {}) as TCar
  }

  async getRecomendedCars (price: number, id: string) {
    const { data } = await supabase
      .from('cars')
      .select('*, models!inner(*), locations!inner(*)')
      .lte('price', price + 1500)
      .gte('price', price - 1500)
      .neq('id', id)
      .limit(9)

    const { data: altData } = await supabase
      .from('cars')
      .select('*, models!inner(*), locations!inner(*)')
      .order('car_rate', { ascending: false })
      .limit(9)

    const result = data && data.length ? data : altData

    return (result || []) as TCar[]
  }
}

const carService = new CarService()
export default carService
