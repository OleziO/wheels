class SearchFilters {
  generateYears (start: number, end: number) {
    return Array.from({ length: end - start + 1 }, (_, i) => start + i)
  }

  convertToLocationQueryRaw (searchData: ICarsSearchData) {
    const params = {
      ...searchData,
      price: searchData.price.map(String)
    }

    return params
  }

  getFilters () {
    const vehicleTypes: IVehicleType[] = [
      { label: 'Легкові', value: 'Car' },
      { label: 'Вантажівки', value: 'Truck-2' },
      { label: 'Мото', value: 'Motorbike' },
      { label: 'Сільгосптехніка', value: 'Backhoe' },
      { label: 'Автобуси', value: 'Minibus' },
      { label: 'Спецтехніка', value: 'Truck' },
      { label: 'Причепи', value: 'Caravan' },
      { label: 'Автобудинки', value: 'Camper' }
    ]

    const brands: ICarBrand[] = [
      {
        brandName: 'Mercedes-Benz',
        brandId: '1'
      },
      {
        brandName: 'BMW',
        brandId: '2'
      },
      {
        brandName: 'Audi',
        brandId: '3'
      }
    ]

    const models: ICarModel[] = [
      {
        modelId: '1',
        modelName: '3 Series',
        brandId: brands[1]!.brandId
      },
      {
        modelId: '2',
        modelName: '5 Series',
        brandId: brands[1]!.brandId
      },
      {
        modelId: '3',
        modelName: '7 Series',
        brandId: brands[1]!.brandId
      },
      {
        modelId: '4',
        modelName: 'S600',
        brandId: brands[0]!.brandId
      },
      {
        modelId: '5',
        modelName: 'S500',
        brandId: brands[0]!.brandId
      },
      {
        modelId: '6',
        modelName: 'W126',
        brandId: brands[0]!.brandId
      },
      {
        modelId: '7',
        modelName: 'Q5',
        brandId: brands[2]!.brandId
      },
      {
        modelId: '8',
        modelName: 'Q7',
        brandId: brands[2]!.brandId
      },
      {
        modelId: '9',
        modelName: 'S7',
        brandId: brands[2]!.brandId
      }
    ]

    const cities: ICarCity[] = [
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

    const years: IYearItem[] = this.generateYears(2020, 2024).map(item => ({ value: `${item}`, label: `${item}` }))

    const price: ICarFilterOptionPrice = {
      min: 0,
      max: 50000
    }

    function groupModelsByBrand (brands: ICarBrand[], models: ICarModel[]) {
      const brandMap = Object.fromEntries(brands.map((brand) =>
        [
          brand.brandId,
          {
            brandId: brand.brandId,
            brandName: brand.brandName,
            modelsList: [] as unknown as ICarModel[]
          }
        ]))

      models.forEach((model) => {
        brandMap[model.brandId]?.modelsList.push(model)
      })

      return Object.values(brandMap)
    }

    const selectOptions = {
      vehicleTypes,
      brands,
      models: groupModelsByBrand(brands, models),
      cities,
      years,
      price
    }

    return Promise.resolve({
      ...selectOptions
    })
  }
}

export default new SearchFilters()
