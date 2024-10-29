class CarsService {
  async getPopularCars () {
    const { data } = await supabase
      .from('cars')
      .select(`
        *,
        "car models" (model)
        `)
      .limit(9)

    return data
  }

  async getPopularBrands () {
    const { data } = await supabase
      .from('car brands')
      .select()
      .order('cars_count', { ascending: false })
      .limit(5)

    return data
  }
}

export default new CarsService()
