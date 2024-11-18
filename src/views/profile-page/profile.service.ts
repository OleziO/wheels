import type { IUser } from '@/views/auth/auth.store'
import { calculateYearAvgViews } from '@/views/profile-page/helpers'

class ProfileService {
  async getViewsHistory (userId: string) {
    const carsIdList: string[] = (await supabase
      .from('cars_with_views')
      .select('*')
      .eq('user_id', userId)).data?.map(item => item.car_id) as string[]

    const { data: cars } = await supabase
      .from('cars')
      .select('*, models!inner(*), locations!inner(*), fuel_types(*), transmission_types(*)')
      .in('id', carsIdList)
      .order('created_at', { ascending: false })

    return cars as TCar[]
  }

  async getMyCars (userId: string) {
    const { data: cars } = await supabase
      .from('cars')
      .select('*, models!inner(*)')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })

    return cars as TCar[]
  }

  async deleteCar (carId: string) {
    await supabase
      .from('cars')
      .delete()
      .eq('id', carId)
  }

  async updateUserInfo (user: IUser) {
    await supabase.auth.updateUser({
      email: user.email,
      data: {
        phone: user.phone,
        email: user.email,
        first_name: user.first_name,
        last_name: user.last_name
      }
    }, {
      emailRedirectTo: import.meta.env.VITE_APP_BASE_URL
    })

    await this.updatePublicUserInfo(user)
  }

  async updatePublicUserEmail (user: IUser) {
    await supabase
      .from('user_profiles')
      .update({
        email: user.email
      })
      .eq('id', user.sub)
  }

  async updatePublicUserInfo (user: IUser) {
    await supabase
      .from('user_profiles')
      .update({
        phone: user.phone,
        first_name: user.first_name,
        last_name: user.last_name,
        avatar: user.avatar
      })
      .eq('id', user.sub)
  }

  async verifyEmail (user: IUser, token: string, email: string) {
    await supabase.auth.verifyOtp({
      email,
      token,
      type: 'email_change'
    })

    await this.updatePublicUserEmail(user)
  }

  async getCarsViews (carId: string) {
    const { data } = await supabase
      .from('cars_with_views')
      .select('*')
      .eq('car_id', carId)

    if (data) {
      const carsViewsArr = calculateYearAvgViews(data)
      return carsViewsArr
    }

    return []
  }

  async getCarsViewsAmount (carId: string) {
    const { count } = await supabase
      .from('cars_with_views')
      .select('*', { count: 'exact' })
      .eq('car_id', carId)

    return count || 0
  }

  async getModelViews (carId: string, modelId: string) {
    const { data } = await supabase
      .from('cars_with_views')
      .select('*')
      .eq('model_id', modelId)
      .neq('car_id', carId)

    const { count: carsCount } = await supabase
      .from('cars')
      .select('*', { count: 'exact' })
      .eq('model_id', modelId)

    if (data) {
      const carsViewsArr = calculateYearAvgViews(data, (carsCount || 2) - 1)
      return carsViewsArr
    }

    return []
  }

  async carTopRatePlace (carRate: string | number) {
    const { count: placeInTop } = await supabase
      .from('cars')
      .select('car_rate', { count: 'exact' })
      .gt('car_rate', carRate)

    return (placeInTop || 0) + 1
  }
}

export const profileService = new ProfileService()
