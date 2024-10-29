class SearchService {
  get cities (): ICarCity[] {
    return [
      {
        cityId: '1',
        cityName: 'Львів'
      },
      {
        cityId: '2',
        cityName: 'Київ'
      },
      {
        cityId: '3',
        cityName: 'Тернопіль'
      }
    ]
  }

  get vehicleTypes (): IVehicleType[] {
    return [
      { label: 'Легкові', value: 'car' },
      { label: 'Вантажівки', value: 'truck-2' },
      { label: 'Мото', value: 'motorbike' },
      { label: 'Сільгосптехніка', value: 'backhoe' },
      { label: 'Автобуси', value: 'minibus' },
      { label: 'Спецтехніка', value: 'truck' },
      { label: 'Причепи', value: 'caravan' },
      { label: 'Автобудинки', value: 'camper' }
    ]
  }

  async getBrands (): Promise<TTables<'car brands'>[]> {
    const { data } = await supabase
      .from('car brands')
      .select()

    return data || []
  }

  async getModels (): Promise<TTables<'car models'>[]> {
    const { data } = await supabase
      .from('car models')
      .select()

    return data || []
  }

  get price () {
    return {
      min: 0,
      max: 100000
    }
  }

  getYears (start: number, end: number) {
    return this.generateYears(start, end).map(item => ({ value: `${item}`, label: `${item}` }))
  }

  generateYears (start: number, end: number) {
    const yearList = Array.from({ length: end - start + 1 }, (_, i) => end - i)

    return yearList
  }

  convertToLocationQueryRaw (searchData: Record<string, TSearchFilters>) {
    const params = {
      ...searchData
    }

    return params
  }

  groupModelsByBrand (brands: TTables<'car brands'>[], models: TTables<'car models'>[]) {
    const brandMap = brands.reduce((acc, brand) => {
      acc[brand.id] = {
        ...brand,
        models: []
      }

      return acc
    }, {} as Record<number, IMappedCarModel>)

    models.forEach((model) => {
      brandMap[model.brand_id]?.models.push(model)
    })

    return brandMap
  }
}

export default new SearchService()
