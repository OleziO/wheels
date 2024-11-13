type TBidItem = TTables<'auction_bids'> & { user_profiles: TTables<'user_profiles'> }

interface INewAuction {
  auction_owner_id: string
  car_id: string
  bid_time: string
  default_bid: string
}
