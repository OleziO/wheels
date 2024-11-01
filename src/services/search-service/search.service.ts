class SearchService {
  async getVehicleTypes (): Promise<TTables<'vehicle_types'>[]> {
    const { data } = await supabase
      .from('vehicle_types')
      .select('*')

    return data || []
  }

  async getBodyTypes (): Promise<TTables<'body_types'>[]> {
    const { data } = await supabase
      .from('body_types')
      .select('*')

    return data || []
  }

  async getTransmissionTypes (): Promise<TTables<'transmission_types'>[]> {
    const { data } = await supabase
      .from('transmission_types')
      .select('*')

    return data || []
  }

  async getBrands (): Promise<TTables<'brands'>[]> {
    const { data } = await supabase
      .from('brands')
      .select('*')

    return data || []
  }

  async getPopularBrands () {
    const { data } = await supabase
      .rpc('get_car_counts_by_brand')

    return JSON.parse(JSON.stringify(data)) as IPopularBrand[]
  }

  async getLocations (): Promise<TTables<'locations'>[]> {
    const { data } = await supabase
      .from('locations')
      .select('*')
      .order('label', { ascending: true })

    return data || []
  }

  async getFuelTypes (): Promise<TTables<'fuel_types'>[]> {
    const { data } = await supabase
      .from('fuel_types')
      .select('*')

    return data || []
  }

  async getDriveTypes (): Promise<TTables<'drive_types'>[]> {
    const { data } = await supabase
      .from('drive_types')
      .select('*')

    return data || []
  }

  async getModels (): Promise<TTables<'models'>[]> {
    const { data } = await supabase
      .from('models')
      .select()

    return data || []
  }

  async getCars () {
    const { data } = await supabase
      .from('cars')
      .select('*, models!inner(*)')

    return data
  }

  async getCarsCount (filters: ICarsSearchDataExtended) {
    const { count } = await this.getFilteredCars(filters, { count: 'exact', head: true })

    return count || 0
  }

  async getCarConditions (): Promise<TTables<'car_conditions'>[]> {
    const { data } = await supabase
      .from('car_conditions')
      .select('*')
    return data || []
  }

  async getCarTechConditions (): Promise<TTables<'tech_conditions'>[]> {
    const { data } = await supabase
      .from('tech_conditions')
      .select('*')
    return data || []
  }

  async getCarPaintConditions (): Promise<TTables<'paint_conditions'>[]> {
    const { data } = await supabase
      .from('paint_conditions')
      .select('*')

    return data || []
  }

  get price () {
    return {
      min: 0,
      max: 1000000 // 1M
    }
  }

  get accidentTypes (): IFilterOption[] {
    return [
      { label: 'Не була в ДТП', value: true },
      { label: 'Була в ДТП', value: false }
    ]
  }

  getYears (start: number) {
    const end = new Date().getFullYear()
    const yearList = Array.from({ length: end - start + 1 }, (_, i) => end - i)

    return yearList.map(item => ({ value: `${item}`, label: `${item}` }))
  }

  get engineVolumes () {
    const start = 0.1
    const end = 7
    const step = 0.1

    const engineList = Array.from({ length: Math.ceil((end - start) / step) + 1 }, (_, i) => {
      const value = (end - i * step).toFixed(1)
      return parseFloat(value)
    })

    return engineList.map(item => ({ value: `${item}`, label: `${item}` })).reverse()
  }

  async getFilters () {
    return await Promise.all([
      this.getBrands(),
      this.getModels(),
      this.getLocations(),
      this.getVehicleTypes()
    ])
  }

  async getExtendedFilters () {
    return await Promise.all([
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
  }

  async getCarsWithPagination (
    start: number,
    end: number,
    filters: ICarsSearchDataExtended
  ) {
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

    enum EMatchFilters {
      transmissionTypes = 'transmission_type',
      involvedAccident = 'was_in_accident',
      carsConditions = 'car_condition',
      engineVolume = 'engine_volume',
      vehicleTypes = 'vehicle_types',
      paintType = 'paint_condition',
      driveTypes = 'drive_type',
      Type = ' tech_conditions',
      brands = 'models.brand',
      fuelTypes = 'fuel_type',
      bodyType = 'body_type',
      location = 'location',
      models = 'models.id',

    }

    enum EGreaterOrLessFilters {
      price = 'price',
      engineVolume = 'engine_volume',
      manufactureYear = 'manufacture_year',
      mileage = 'mileage'
    }

    const clientKeysMatchFilter = Object.keys(EMatchFilters) as string[]
    const clientKeysGreaterOrLessFilter = Object.keys(EGreaterOrLessFilters) as string[]

    for (const field in filters) {
      const key = field as keyof typeof filters
      const allFilters = { ...EMatchFilters, ...EGreaterOrLessFilters }

      if (!filters.hasOwnProperty(field)) continue

      const databaseKey = allFilters[field as keyof typeof allFilters]
      if (!databaseKey) continue

      const data = Array.isArray(filters[key]) ? filters[key] : [filters[key]]
      if (!data.length) continue

      else if (clientKeysMatchFilter.includes(key)) {
        queryReq = queryReq.in(databaseKey, data)
      } else if (clientKeysGreaterOrLessFilter.includes(key)) {
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

    if (pickedBrands.length) {
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
      acc[brand.brand] = {
        ...brand,
        models: [] as TTables<'models'>[]
      }

      return acc
    }, {} as Record<string, IMappedCarModel>)

    models.forEach((model) => {
      brandMap[model.brand]?.models.push(model)
    })

    return brandMap
  }

  validateQuery (searchData: ICarsSearchDataExtended) {
    const result: any = {}

    for (const key in searchData) {
      const field = searchData[key as keyof ICarsSearchDataExtended]

      if (
        (Array.isArray(field) && field.length && (field[0] || field[1])) ||
        (!Array.isArray(field) && field)
      ) {
        result[key as keyof ICarsSearchDataExtended] = field
      }
    }

    return result
  }

  get sarchArrFieldsNames () {
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

    this.sarchArrFieldsNames.forEach(field => {
      const key = field as keyof ICarsSearchDataExtended
      const arrField = this.queryDataToArr(query[key])

      if (arrField) { result[key] = arrField }
    })

    return result
  }

  queryDataToArr (data: any) {
    if (!data || !data.length || !Object.values(data).length) return ''
    return Array.isArray(data) ? data : [data]
  }

  parseSearchData (searchData: ICarsSearchDataExtended, query: Record<string, any>) {
    const parsedSearchData = {
      ...this.validateQuery(searchData),
      carsConditions: searchData.carsConditions === 'All'
        ? ['New', 'Used']
        : searchData.carsConditions
    }

    const filters = (Object.values(query).length ? parsedSearchData : {}) as ICarsSearchDataExtended

    return filters
  }

  convertToLocationQueryRaw (searchData: Record<string, any>) {
    const params = {
      ...searchData
    }

    return this.validateQuery(params as ICarsSearchDataExtended)
  }
}

export default new SearchService()
