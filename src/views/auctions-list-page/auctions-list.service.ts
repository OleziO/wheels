class AuctionsListService {
  async getAuctionsList () {
    const { data } = await supabase
      .from('active_auctions')
      .select('*, user_profiles!inner(*), cars!inner(*,  models!inner(*), locations!inner(*), fuel_types(*), transmission_types(*))')
      .eq('is_ended', false)
      .order('started_at', { ascending: false })

    return data || []
  }
}

export const auctionsListService = new AuctionsListService()
