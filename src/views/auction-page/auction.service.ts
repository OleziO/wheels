class AuctionService {
  createAuctionChanel (
    auctionId: string,
    onSuccess: (newBid: TTables<'auction_bids'>, userProfile: TTables<'user_profiles'>) => void,
    userProfile: TTables<'user_profiles'>,
    setConnectedUsers: (key: string, presences: any) => void
  ) {
    const channel = supabase.channel(`auction_channel_${auctionId}`)

    channel
      .on('presence', { event: 'join' }, (status) => {
        setConnectedUsers('join', status.newPresences)
      })
      .on('presence', { event: 'leave' }, (status) => {
        setConnectedUsers('leave', status.leftPresences)
      })
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'auction_bids' },
        async (payload) => {
          const newBid = payload.new as TTables<'auction_bids'>

          try {
            const { user, userError } = await this.getUserProfileInfo(newBid.user_id)

            if (userError) {
              throw userError
            }

            if (user && newBid.auction_id === auctionId) {
              onSuccess(newBid, user)
            }
          } catch (err) {
            console.error('Error processing new bid:', err)
            throw err
          }
        }
      )
      .subscribe(async (status) => {
        if (status !== 'SUBSCRIBED') { return }

        await channel.track(userProfile)
      })

    return channel
  }

  async getUserProfileInfo (userId: string) {
    const { data: user, error: userError } = await supabase
      .from('user_profiles')
      .select('*')
      .eq('id', userId)
      .single()

    return { user, userError }
  }

  async getBidsWithUserProfiles (auctionId: string): Promise<TBidItem[]> {
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

  async getAuctionData (auctionId: string): Promise<TTables<'active_auctions'>> {
    const { data, error } = await supabase
      .from('active_auctions')
      .select('*')
      .eq('id', auctionId)
      .single()

    if (error || !data) {
      console.error('Error fetching auction data:', error)
      return {} as TTables<'active_auctions'>
    }

    return data as TTables<'active_auctions'>
  }

  async endAuction (auctionId: string) {
    await supabase
      .from('active_auctions')
      .update({ is_ended: true })
      .eq('id', auctionId)
  }

  async updateAuctionData (bidData: TTables<'auction_bids'>): Promise<any> {
    const { data, error } = await supabase
      .from('active_auctions')
      .update({ current_bid: bidData.amount, current_bid_user_id: bidData.user_id })
      .eq('id', bidData.auction_id)

    if (error) {
      console.error('Error updating auction data:', error)
      return null
    }

    return data
  }

  async makeBid (amount: number, userId: string, auctionId: string): Promise<any> {
    const { data, error } = await supabase
      .from('auction_bids')
      .insert({
        auction_id: auctionId,
        user_id: userId,
        amount
      })

    if (error) {
      console.error('Error making bid:', error)
      return null
    }

    return data
  }
}

export const auctionService = new AuctionService()
