class AuctionsListService {
  async getAuctionsList () {
    const { data, error } = await supabase
      .from('active_auctions')
      .select(`
        *, 
        user_profiles!inner(*),
        cars!inner(*,  models!inner(*),
        locations!inner(*),
        fuel_types(*),
        transmission_types(*))
      `)
      .eq('is_ended', false)
      .order('started_at', { ascending: false })

    if (error) throw error

    return data || []
  }

  async getUserCars (userId: string) {
    const { data, error } = await supabase
      .from('cars')
      .select('*, models!inner(*), locations!inner(*), car_colors!inner(*)')
      .eq('user_id', userId)

    if (error) throw error

    return (data || []) as TCar[]
  }

  async createNewAuction (auctionData: INewAuction) {
    const { data, error } = await supabase
      .from('active_auctions')
      .insert({
        ...auctionData,
        bid_time: +auctionData.bid_time,
        default_bid: +auctionData.default_bid
      })
      .select('*')

    if (error) throw error

    return data || []
  }
}

export const auctionsListService = new AuctionsListService()
