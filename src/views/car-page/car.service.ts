class CarService {
  getMainInfo (car: TCar) {
    const {
      models,
      mileage,
      color,
      headlights,
      manufacture_year: manufactureYear,
      engine_volume: engineVolume,
      engine_power: enginePower,
      fuel_type: fuelType,
      transmission_type: transmissionType,
      drive_type: driveType,
      paint_condition: paintCondition,
      technical_condition: technicalCondition,
      interior_material: interiorMaterial,
      interior_color: interiorColor,
      interior_seats_adjustments: interiorSeatsAdjustments,
      heated_seats: heatedSeats,
      electric_windows: electricWindows,
      air_conditioning: airConditioning,
      power_steering: powerSteering,
      steering_wheel_adjustment: steeringWheelAdjustment,
      spare_wheel: spareWheel,
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
        value: fuelType && `${fuelType}`
      },
      {
        label: 'Коробка передач',
        value: `${transmissionType}`
      },
      {
        label: 'Привід',
        value: `${driveType}`
      },
      {
        label: 'Колір',
        value: `${color}`
      },
      {
        label: 'Лакофарбове покриття',
        value: `${paintCondition}`
      },
      {
        label: 'Технічний стан',
        value: `${technicalCondition}`
      },
      {
        label: 'Фари',
        value: `${headlights}`
      },
      {
        label: 'Матеріали салону',
        value: `${interiorMaterial}`
      },
      {
        label: 'Колір салону',
        value: `${interiorColor}`
      },
      {
        label: 'Регулювання сидінь салону',
        value: `${interiorSeatsAdjustments}`
      },
      {
        label: 'Підігрів сидінь',
        value: `${heatedSeats}`
      },
      {
        label: 'Електросклопідйомники',
        value: `${electricWindows}`
      },
      {
        label: 'Кондиціонер',
        value: `${airConditioning}`
      },
      {
        label: 'Підсилювач керма',
        value: `${powerSteering}`
      },
      {
        label: 'Регулювання керма',
        value: `${steeringWheelAdjustment}`
      },
      {
        label: 'Запасне колесо',
        value: `${spareWheel}`
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
      .select('*, models!inner(*), locations!inner(*)')
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

    return result || []
  }
}

const carService = new CarService()
export default carService
