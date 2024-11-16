import type { IUser } from '@/views/auth/auth.store'

class AuctionsService {
  createAuctionChanel (
    auctionId: string,
    onAdd: (newBid: TTables<'auction_bids'>, userProfile: TTables<'user_profiles'>) => void,
    onRemove: () => void,
    userProfile: IUser,
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
              onAdd(newBid, user)
            }
          } catch (err) {
            console.error('Error processing new bid:', err)
            throw err
          }
        }
      )
      .on(
        'postgres_changes',
        { event: 'DELETE', schema: 'public', table: 'auction_bids' },
        async () => {
          onRemove()
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

  async leaveAuction (auctionId: string, userId: string) {
    const { error } = await supabase
      .from('auction_bids')
      .delete()
      .eq('auction_id', auctionId)
      .eq('user_id', userId)

    if (error) throw error
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

  async updateAuctionData (auctionId: string, amount: number, bidUser: string): Promise<any> {
    const { data, error } = await supabase
      .from('active_auctions')
      .update({ current_bid: amount, current_bid_user_id: bidUser })
      .eq('id', auctionId)

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

  async getAuctionsList () {
    const { data, error } = await supabase
      .from('active_auctions')
      .select(`
        *, 
        user_profiles!inner(*),
        cars!inner(
          *,  
          models!inner(*),
          locations!inner(*),
          fuel_types!inner(*),
          transmission_types!inner(*))
      `)
      .eq('is_ended', false)
      .order('started_at', { ascending: false })

    if (error) throw error

    return (data || []) as IAuctionExtended[]
  }

  async getUserCars (userId: string) {
    const { data, error } = await supabase
      .from('cars')
      .select('*, models!inner(*), locations!inner(*), car_colors!inner(*)')
      .eq('user_id', userId)
      .eq('is_in_auction', false)

    if (error) throw error

    return (data || []) as TCar[]
  }

  async createNewAuction (auctionData: INewAuction) {
    const { data: auctionResData, error: auctionError } = await supabase
      .from('active_auctions')
      .insert({
        ...auctionData,
        bid_time: +auctionData.bid_time,
        default_bid: +auctionData.default_bid
      })
      .select('*')

    const { error: carError } = await supabase
      .from('cars')
      .update({ is_in_auction: true })
      .eq('id', auctionData.car_id)
      .select('*')

    if (auctionError || carError) throw auctionError

    return auctionResData || []
  }
}

export const auctionsService = new AuctionsService()
