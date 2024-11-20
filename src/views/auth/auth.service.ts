class AuthService {
  get defaultLoginData (): ISignIn {
    return {
      email: '',
      password: ''
    }
  }

  get defaultRegisterData (): ISignUp {
    return {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      password: ''
    }
  }

  async getUserProfileInfo (userId: string) {
    const { data: user, error: userError } = await supabase
      .from('user_profiles')
      .select('*')
      .eq('id', userId)
      .single()

    return { user, userError }
  }

  async signUp (registrationData: ISignUp) {
    const { data, error } = await supabase.auth.signUp({
      email: registrationData.email,
      password: registrationData.password,
      options: {
        data: {
          first_name: registrationData.firstName,
          last_name: registrationData.lastName,
          phone: registrationData.phone
        }
      }
    })

    if (error) throw error

    return data
  }

  async signIn (loginData: ISignIn) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: loginData.email,
      password: loginData.password
    })

    if (error) throw error

    return data
  }

  async getSession () {
    const { data } = await supabase.auth.getSession()

    const { data: userDetails } = await supabase
      .from('user_profiles')
      .select('avatar')
      .eq('id', data.session?.user.user_metadata.sub)
      .single()

    return { ...data, avatar: userDetails?.avatar || '' }
  }

  async logout () {
    await supabase.auth.signOut()
  }
}

export const authService = new AuthService()
