class HomeService {
  async getPopularBrands (): Promise<IPopularBrand[]> {
    const { data } = await supabase
      .rpc('get_car_counts_by_brand')
    return JSON.parse(JSON.stringify(data)) as IPopularBrand[]
  }
}

const homeService = new HomeService()
export default homeService
