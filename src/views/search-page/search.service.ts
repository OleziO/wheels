import type { Database } from '@/api/types/database.types'
import { validateData } from '@/router'
import { groupBy, orderBy } from 'lodash-es'

class SearchService {
  matchFilters = {
    transmissionTypes: 'transmission_type',
    involvedAccident: 'was_in_accident',
    carsConditions: 'car_condition',
    vehicleTypes: 'vehicle_types',
    paintType: 'paint_condition',
    driveTypes: 'drive_type',
    type: 'tech_conditions',
    fuelTypes: 'fuel_type',
    brands: 'models.brand',
    bodyType: 'body_type',
    location: 'location',
    models: 'models.id'
  }

  rangeFilters = {
    price: 'price',
    mileage: 'mileage'
  }

  gteFilters = {
    fromEnginveVolume: 'engine_volume',
    fromManufactureYear: 'manufacture_year'
  }

  lteFilters = {
    toEnginveVolume: 'engine_volume',
    toManufactureYear: 'manufacture_year'
  }

  searchArrFieldsNames = [
    'transmissionTypes',
    'involvedAccident',
    'vehicleTypes',
    'mileage',
    'price',
    'driveTypes',
    'techCondition',
    'fuelTypes',
    'location',
    'bodyType',
    'coating',
    'brands',
    'models'
  ]

  get perPage () {
    return [
      {
        label: 'Показувати по 5 оголошень',
        value: '5'
      },
      {
        label: 'Показувати по 10 оголошень',
        value: '10'
      },
      {
        label: 'Показувати по 15 оголошень',
        value: '15'
      },
      {
        label: 'Показувати по 20 оголошень',
        value: '20'
      },
      {
        label: 'Показувати по 25 оголошень',
        value: '25'
      },
      {
        label: 'Показувати по 30 оголошень',
        value: '30'
      }
    ]
  }

  get sortingTypes () {
    return [
      {
        label: 'Дата додавання',
        value: {
          type: 'created_at',
          order: 'desc'
        }
      },
      {
        label: 'Від дешевих до дорогих',
        value: {
          type: 'price',
          order: 'asc'
        }
      },
      {
        label: 'Від дорогих до дешевих',
        value: {
          type: 'price',
          order: 'desc'
        }
      },
      {
        label: 'Рік випуску, за зростанням',
        value: {
          type: 'manufacture_year',
          order: 'asc'
        }
      },
      {
        label: 'Рік випуску, за спаданням',
        value: {
          type: 'manufacture_year',
          order: 'desc'
        }
      },
      {
        label: 'Пробіг, за зростанням',
        value: {
          type: 'mileage',
          order: 'asc'

        }
      },
      {
        label: 'Пробіг, за спаданням',
        value: {
          type: 'mileage',
          order: 'desc'
        }
      }
    ]
  }

  get price () {
    return { min: 0, max: 1000000 } // 1M
  }

  get engineVolumes (): { value: string; label: string }[] {
    const start = 0.1; const end = 7; const step = 0.1
    const volumes = Array.from({ length: Math.ceil((end - start) / step) + 1 }, (_, i) => (end - i * step).toFixed(1))
    return volumes.map(item => ({ value: item, label: item })).reverse()
  }

  get accidentTypes (): IFilterOption[] {
    return [
      { label: 'Не була в ДТП', value: 'FALSE' },
      { label: 'Була в ДТП', value: 'TRUE' }
    ]
  }

  private async fetchFromTable<T> (tableName: keyof Database['public']['Tables']): Promise<T[]> {
    const { data } = await supabase
      .from(tableName)
      .select('*')

    return (data || []) as T[]
  }

  async getVehicleTypes (): Promise<TTables<'vehicle_types'>[]> {
    return this.fetchFromTable<TTables<'vehicle_types'>>('vehicle_types')
  }

  async getBodyTypes (): Promise<TTables<'body_types'>[]> {
    return this.fetchFromTable<TTables<'body_types'>>('body_types')
  }

  async getTransmissionTypes (): Promise<TTables<'transmission_types'>[]> {
    return this.fetchFromTable<TTables<'transmission_types'>>('transmission_types')
  }

  async getAirConditioning (): Promise<TTables<'air_conditioning'>[]> {
    return this.fetchFromTable<TTables<'air_conditioning'>>('air_conditioning')
  }

  async getElectricWindows (): Promise<TTables<'electric_windows'>[]> {
    return this.fetchFromTable<TTables<'electric_windows'>>('electric_windows')
  }

  async getInteriorMaterials (): Promise<TTables<'interior_materials'>[]> {
    return this.fetchFromTable<TTables<'interior_materials'>>('interior_materials')
  }

  async getInteriorColors (): Promise<TTables<'interior_colors'>[]> {
    return this.fetchFromTable<TTables<'interior_colors'>>('interior_colors')
  }

  async getPowerSteering (): Promise<TTables<'power_steering'>[]> {
    return this.fetchFromTable<TTables<'power_steering'>>('power_steering')
  }

  async getSteeringWheelAdjustments (): Promise<TTables<'steering_wheel_adjustments'>[]> {
    return this.fetchFromTable<TTables<'steering_wheel_adjustments'>>('steering_wheel_adjustments')
  }

  async getSpareWheels (): Promise<TTables<'spare_wheels'>[]> {
    return this.fetchFromTable<TTables<'spare_wheels'>>('spare_wheels')
  }

  async getHeadlights (): Promise<TTables<'headlights'>[]> {
    return this.fetchFromTable<TTables<'headlighst'>>('headlights')
  }

  async getInteriorSeatsAdjustments (): Promise<TTables<'interior_seats_adjustments'>[]> {
    return this.fetchFromTable<TTables<'interior_seats_adjustments'>>('interior_seats_adjustments')
  }

  async getHeatedSeats (): Promise<TTables<'heated_seats'>[]> {
    return this.fetchFromTable<TTables<'heated_seats'>>('heated_seats')
  }

  async getSafetyFeatures (): Promise<TTables<'safety_features'>[]> {
    return this.fetchFromTable<TTables<'safety_features'>>('safety_features')
  }

  async getComformFeatures (): Promise<TTables<'comfort_features'>[]> {
    return this.fetchFromTable<TTables<'comfort_features'>>('comfort_features')
  }

  async getMultimediaFeatures (): Promise<TTables<'multimedia_features'>[]> {
    return this.fetchFromTable<TTables<'multimedia_features'>>('multimedia_features')
  }

  async getOpticFeatures (): Promise<TTables<'optic_features'>[]> {
    return this.fetchFromTable<TTables<'optic_features'>>('optic_features')
  }

  async getAirbagFeatures (): Promise<TTables<'airbag_features'>[]> {
    return this.fetchFromTable<TTables<'airbag_features'>>('airbag_features')
  }

  async getParkingFeatures (): Promise<TTables<'parking_assistance'>[]> {
    return this.fetchFromTable<TTables<'parking_assistance'>>('parking_assistance')
  }

  async getBrands (): Promise<TTables<'brands'>[]> {
    return this.fetchFromTable<TTables<'brands'>>('brands')
  }

  async getColors (): Promise<TTables<'car_colors'>[]> {
    return this.fetchFromTable<TTables<'car_colors'>>('car_colors')
  }

  async getFuelTypes (): Promise<TTables<'fuel_types'>[]> {
    return this.fetchFromTable<TTables<'fuel_types'>>('fuel_types')
  }

  async getDriveTypes (): Promise<TTables<'drive_types'>[]> {
    return this.fetchFromTable<TTables<'drive_types'>>('drive_types')
  }

  async getModels (): Promise<IMappedCarModel[]> {
    const models = await this.fetchFromTable<TTables<'models'>>('models')

    return searchService.groupModelsByBrand(models)
  }

  async getCarConditions (): Promise<TTables<'car_conditions'>[]> {
    return this.fetchFromTable<TTables<'car_conditions'>>('car_conditions')
  }

  async getCarTechConditions (): Promise<TTables<'tech_conditions'>[]> {
    return this.fetchFromTable<TTables<'tech_conditions'>>('tech_conditions')
  }

  async getCarPaintConditions (): Promise<TTables<'paint_conditions'>[]> {
    return this.fetchFromTable<TTables<'paint_conditions'>>('paint_conditions')
  }

  async getLocations (): Promise<TTables<'locations'>[]> {
    const { data } = await supabase
      .from('locations')
      .select('*')
      .order('label')

    return data || []
  }

  async getCarsCount (filters: ICarsSearchData): Promise<number> {
    const { count } = await this.getFilteredCars(validateData(filters), { count: 'exact', head: true })
    return count || 0
  }

  getYears (start = 1940): IFilterOption[] {
    const end = new Date().getFullYear()

    return Array.from({ length: end - start + 1 }, (_, i) => {
      const year = end - i
      return { value: `${year}`, label: `${year}` }
    })
  }

  async getCarsWithPagination (
    start: number,
    end: number
  ): Promise<any[]> {
    const searchStore = useSearchStore()

    const query = this.getFilteredCars(validateData(searchStore.searchData))
    const { data } = await query.range(start, end)

    const type = searchStore.searchData.sortingType
    const order = searchStore.searchData.sortingOrder

    return orderBy(data || [], type, order || 'asc')
  }

  private getFilteredCars (
    filters: any,
    selectOptions: any = {}
  ) {
    let queryReq = supabase
      .from('cars')
      .select('*, models!inner(*), locations!inner(*)', selectOptions)
      .order('created_at', { ascending: false })

    for (const field in filters) {
      const key = field as keyof ICarsSearchData
      const allFilters = { ...this.matchFilters, ...this.rangeFilters, ...this.gteFilters, ...this.lteFilters }

      if (!filters.hasOwnProperty(field)) continue

      const databaseKey = allFilters[field as keyof typeof allFilters]
      if (!databaseKey && key !== 'search') continue

      const data = Array.isArray(filters[key]) ? filters[key] : [filters[key]]
      if (!data) continue

      if (key in this.matchFilters) {
        queryReq = queryReq.in(databaseKey, data)
      } else if (key in this.rangeFilters) {
        const [min, max] = data.toString().split(',')
        if (min) queryReq = queryReq.gte(databaseKey, min)
        if (max) queryReq = queryReq.lte(databaseKey, max)
      } else if (key in this.gteFilters) {
        queryReq = queryReq.gte(databaseKey, filters[key])
      } else if (key in this.lteFilters) {
        queryReq = queryReq.lte(databaseKey, filters[key])
      }
    }

    return queryReq
  }

  async updateCarRating (carId: string, operation: 1 | -1) {
    const { data: car } = await supabase
      .from('cars')
      .select()
      .eq('id', carId)

    if (car?.length && car[0]) {
      await supabase
        .from('cars')
        .update({ car_rate: car[0]?.car_rate + operation })
        .eq('id', car[0].id)
    }
  }

  groupModelsByBrand (models: TTables<'models'>[]) {
    return Object.entries(groupBy(models, 'brand')).map(([brand, models]) => ({ brand, models }))
  }

  getArrFields (query: any) {
    const result: any = {}

    this.searchArrFieldsNames.forEach(field => {
      const key = field as keyof ICarsSearchData
      const arrField = this.queryDataToArr(query[key])

      if (arrField) { result[key] = arrField }
    })

    return result
  }

  queryDataToArr (data: any) {
    return data ? (Array.isArray(data) ? data : [data]) : ''
  }
}

const searchService = new SearchService()
export default searchService
