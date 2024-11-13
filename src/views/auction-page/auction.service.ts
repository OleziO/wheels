class AuctionService {
  createAuctionChanel (auctionId: string,
    onSuccess: (newBid: TTables<'auction_bids'>, userProfile: TTables<'user_profiles'>) => void
  ) {
    supabase
      .channel(`auction_channel_${auctionId}`)
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'auction_bids' },
        async (payload) => {
          const newBid = payload.new as TTables<'auction_bids'>

          const { data: user } = await supabase
            .from('user_profiles')
            .select('*')
            .eq('id', newBid.user_id)
            .single()

          if (user && newBid.auction_id === auctionId) {
            onSuccess(newBid, user)
          }
        }
      )
      .subscribe()
  }

  async getBidsWithUserProfiles (auctionId: string) {
    const { data, error } = await supabase
      .from('auction_bids')
      .select('*, user_profiles!inner(*)')
      .eq('auction_id', auctionId)
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching bids with user profiles:', error)
      return []
    }

    return (data || []) as TBidItem[]
  }

  async getAuctionData (auctionId: string) {
    const { data } = await supabase
      .from('active_auctions')
      .select('*')
      .eq('id', auctionId)

    return (data ? data[0] : {}) as TTables<'active_auctions'>
  }

  async makeBid (amount: number, userId: string, auctionId: string) {
    const { data } = await supabase
      .from('auction_bids')
      .insert({
        auction_id: auctionId,
        user_id: userId,
        amount
      })

    return data
  }
}

export const auctionService = new AuctionService()
