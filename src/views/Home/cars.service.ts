class CarsService {
  async getPopularCars () {
    const { data } = await supabase
      .from('cars')
      .select(`
        *,
        models (*)`)
      .limit(9)

    return data
  }

  async getPopularBrands () {
    const { data } = await supabase
      .from('brands')
      .select()
      .order('cars_count', { ascending: false })
      .limit(5)

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
}

export default new CarsService()
