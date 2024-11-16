class AuthService {
  defaultLoginData: ISignIn = {
    email: '',
    password: ''
  }

  defaultRegisterData: ISignUp = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: ''
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

    return data
  }

  async logout () {
    await supabase.auth.signOut()
  }
}

export const authService = new AuthService()
