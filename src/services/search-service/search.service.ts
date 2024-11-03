import type { Database } from '@/api/types/database.types'

class SearchService {
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

  async getBrands (): Promise<TTables<'brands'>[]> {
    return this.fetchFromTable<TTables<'brands'>>('brands')
  }

  async getPopularBrands (): Promise<IPopularBrand[]> {
    const { data } = await supabase
      .rpc('get_car_counts_by_brand')
    return JSON.parse(JSON.stringify(data)) as IPopularBrand[]
  }

  async getFuelTypes (): Promise<TTables<'fuel_types'>[]> {
    return this.fetchFromTable<TTables<'fuel_types'>>('fuel_types')
  }

  async getDriveTypes (): Promise<TTables<'drive_types'>[]> {
    return this.fetchFromTable<TTables<'drive_types'>>('drive_types')
  }

  async getModels (): Promise<TTables<'models'>[]> {
    return this.fetchFromTable<TTables<'models'>>('models')
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

  async getPopularCars () {
    const { data } = await supabase
      .from('cars')
      .select(`
        *,
        models (*)`)
      .limit(9)

    return data
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

  async getLocations (): Promise<TTables<'locations'>[]> {
    const { data } = await supabase
      .from('locations')
      .select('*')
      .order('label')

    return data || []
  }

  async getCarsCount (filters: ICarsSearchDataExtended): Promise<number> {
    const { count } = await this.getFilteredCars(filters, { count: 'exact', head: true })
    return count || 0
  }

  get price () {
    return { min: 0, max: 1000000 } // 1M
  }

  get accidentTypes (): IFilterOption[] {
    return [
      { label: 'Не була в ДТП', value: true },
      { label: 'Була в ДТП', value: false }
    ]
  }

  getYears (start: number): { value: string; label: string }[] {
    const end = new Date().getFullYear()
    return Array.from({ length: end - start + 1 }, (_, i) => {
      const year = end - i
      return { value: `${year}`, label: `${year}` }
    })
  }

  get engineVolumes (): { value: string; label: string }[] {
    const start = 0.1; const end = 7; const step = 0.1
    const volumes = Array.from({ length: Math.ceil((end - start) / step) + 1 }, (_, i) => (end - i * step).toFixed(1))
    return volumes.map(item => ({ value: item, label: item })).reverse()
  }

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

  sort (data: TCar[], type: string) {
    const sortTypes = {
      date: (a: TCar, b: TCar) => b.created_at.localeCompare(a.created_at),
      price_asc: (a: TCar, b: TCar) => a.price - b.price,
      price_desc: (a: TCar, b: TCar) => b.price - a.price,
      year_asc: (a: TCar, b: TCar) => (a.manufacture_year || 0) - (b.manufacture_year || 0),
      year_desc: (a: TCar, b: TCar) => (b.manufacture_year || 0) - (a.manufacture_year || 0),
      mileage_asc: (a: TCar, b: TCar) => (a.mileage || 0) - (b.mileage || 0),
      mileage_desc: (a: TCar, b: TCar) => (b.mileage || 0) - (a.mileage || 0)
    }

    return [...data].sort(sortTypes[type as keyof typeof sortTypes])
  }

  get sortingTypes () {
    return [
      {
        label: 'Дата додавання',
        value: 'date'
      },
      {
        label: 'Від дешевих до дорогих',
        value: 'price_asc'
      },
      {
        label: 'Від дорогих до дешевих',
        value: 'price_desc'
      },
      {
        label: 'Рік випуску, за зростанням',
        value: 'year_asc'
      },
      {
        label: 'Рік випуску, за спаданням',
        value: 'year_desc'
      },
      {
        label: 'Пробіг, за зростанням',
        value: 'mileage_asc'
      },
      {
        label: 'Пробіг, за спаданням',
        value: 'mileage_desc'
      }
    ]
  }

  async getFilters (): Promise<any[]> {
    return Promise.all([
      this.getBrands(),
      this.getModels(),
      this.getLocations(),
      this.getVehicleTypes()
    ])
  }

  async getExtendedFilters (): Promise<any> {
    const [
      brands,
      models,
      location,
      vehicleTypes,
      carsConditions,
      bodyType,
      transmissionTypes,
      fuelTypes,
      driveTypes,
      techCondition,
      paintType
    ] = await Promise.all([
      this.getBrands(),
      this.getModels(),
      this.getLocations(),
      this.getVehicleTypes(),
      this.getCarConditions(),
      this.getBodyTypes(),
      this.getTransmissionTypes(),
      this.getFuelTypes(),
      this.getDriveTypes(),
      this.getCarTechConditions(),
      this.getCarPaintConditions()
    ])

    return {
      transmissionTypes,
      carsConditions,
      techCondition,
      vehicleTypes,
      driveTypes,
      fuelTypes,
      location,
      bodyType,
      paintType,
      brands,
      models
    }
  }

  async getCarsWithPagination (
    start: number,
    end: number,
    filters: ICarsSearchDataExtended
  ): Promise<any[]> {
    const query = this.getFilteredCars(filters, { count: 'exact' })
    const { data } = await query.range(start, end)
    return data || []
  }

  private getFilteredCars (
    filters: ICarsSearchDataExtended,
    selectOptions: any = {}
  ) {
    let queryReq = supabase
      .from('cars')
      .select('*, models!inner(*)', selectOptions)
      .order('created_at', { ascending: false })

    const matchFilters = {
      transmissionTypes: 'transmission_type',
      involvedAccident: 'was_in_accident',
      carsConditions: 'car_condition',
      engineVolume: 'engine_volume',
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

    const rangeFilters = {
      price: 'price',
      engineVolume: 'engine_volume',
      manufactureYear: 'manufacture_year',
      mileage: 'mileage'
    }

    for (const field in filters) {
      const key = field as keyof ICarsSearchDataExtended
      const allFilters = { ...matchFilters, ...rangeFilters }

      if (!filters.hasOwnProperty(field)) continue

      const databaseKey = allFilters[field as keyof typeof allFilters]
      if (!databaseKey) continue

      const data = Array.isArray(filters[key]) ? filters[key] : [filters[key]]
      if (!data) continue

      if (key in matchFilters) {
        queryReq = queryReq.in(databaseKey, data)
      } else if (key in rangeFilters) {
        const [min, max] = data
        if (min) queryReq = queryReq.gte(databaseKey, min)
        if (max) queryReq = queryReq.lte(databaseKey, max)
      }
    }

    return queryReq
  }

  getPickedModels (brands: string[], models: Record<string, IMappedCarModel>) {
    const pickedBrands = Array.isArray(brands) ? brands : [brands]
    const mappedModelsObj = models

    if (pickedBrands) {
      const filteredModels = pickedBrands.reduce((modelsAcc, brand) => {
        if (mappedModelsObj[brand]) {
          modelsAcc[brand] = mappedModelsObj[brand]
        }
        return modelsAcc
      }, {} as Record<string, IMappedCarModel>)

      return Object.values(filteredModels) as IMappedCarModel[]
    }

    return []
  }

  groupModelsByBrand (brands: TTables<'brands'>[], models: TTables<'models'>[]) {
    const brandMap = brands.reduce((acc, brand) => {
      acc[brand.brand] = { ...brand, models: [] as TTables<'models'>[] }
      return acc
    }, {} as Record<string, IMappedCarModel>)

    models.forEach(model => {
      brandMap[model.brand]?.models.push(model)
    })

    return brandMap
  }

  validateQuery (searchData: ICarsSearchDataExtended | ICarsSearchData) {
    return Object.fromEntries(
      Object.entries(searchData).filter(entry => {
        const value = entry[1]

        return !!(Array.isArray(value) && (value[0] || value[1])) || !!(!Array.isArray(value) && value)
      })
    ) as ICarsSearchDataExtended
  }

  get searchArrFieldsNames () {
    return [
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
  }

  getArrFields (query: any) {
    const result: any = {}

    this.searchArrFieldsNames.forEach(field => {
      const key = field as keyof ICarsSearchDataExtended
      const arrField = this.queryDataToArr(query[key])

      if (arrField) { result[key] = arrField }
    })

    return result
  }

  queryDataToArr (data: any) {
    return data ? (Array.isArray(data) ? data : [data]) : ''
  }

  parseSearchData (searchData: ICarsSearchDataExtended, query: Record<string, any>) {
    const parsedSearchData = {
      ...this.validateQuery(searchData),
      carsConditions: searchData.carsConditions === 'All'
        ? ['New', 'Used']
        : searchData.carsConditions
    }

    const filters = (query ? parsedSearchData : {}) as ICarsSearchDataExtended

    return filters
  }

  convertToLocationQueryRaw (searchData: any) {
    const validatedData = this.validateQuery({
      ...searchData
    })

    return validatedData as typeof searchData & { [key: string]: any }
  }
}

export default new SearchService()
