class TopRatedService {
  async getTopRatedCars (): Promise<any[]> {
    const { data } = await supabase
      .from('cars')
      .select('*, models!inner(*), locations!inner(*), fuel_types(*), transmission_types(*)')
      .eq('is_in_auction', false)
      .order('car_rate', { ascending: false })
      .limit(30)

    return data || []
  }
}

const topRatedService = new TopRatedService()
export default topRatedService
