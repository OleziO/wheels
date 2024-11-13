class HomeService {
  async getPopularBrands (): Promise<IPopularBrand[]> {
    const { data } = await supabase
      .rpc('get_car_counts_by_brand')
    return JSON.parse(JSON.stringify(data)) as IPopularBrand[]
  }

  async getPopularCars () {
    const { data } = await supabase
      .from('cars')
      .select('*, models!inner(*), locations!inner(*), fuel_types!inner(*), transmission_types!inner(*)')
      .limit(9)

    return data
  }
}

const homeService = new HomeService()
export default homeService
