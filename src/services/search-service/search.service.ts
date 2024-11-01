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
      .select()
      .order('cars_count', { ascending: false })

    return data || []
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
      .select('*, models (*)')

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

  get price () {
    return {
      min: 0,
      max: 1000000 // 1M
    }
  }

  getYears (start: number) {
    const end = new Date().getFullYear()
    const yearList = Array.from({ length: end - start + 1 }, (_, i) => end - i)

    return yearList.map(item => ({ value: `${item}`, label: `${item}` }))
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
      this.getDriveTypes()
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
      .select('*, models (*)', selectOptions)

    enum EMatchFilters {
      brands = 'models.brand',
      models = 'models.model',
      location = 'location',
      bodyType = 'body_type',
      transmissionTypes = 'transmission_type',
      fuelTypes = 'fuel_type',
      driveTypes = 'drive_type',
      vehicleTypes = 'vehicle_types',
      engineType = 'engine_type',
      carsConditions = 'car_condition'

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

  convertToLocationQueryRaw (searchData: Record<string, any>) {
    const params = {
      ...searchData
    }

    return params
  }
}

export default new SearchService()
