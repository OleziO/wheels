class AuthService {
  defaultLoginData: ISignIn = {
    login: '',
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
    const userStore = useGeneralStore()

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

    userStore.user = data.user?.user_metadata as IUser
    localStorage.setItem('userData', JSON.stringify(userStore.user))

    return data
  }

  async signIn (loginData: ISignIn) {
    const userStore = useGeneralStore()

    const { data, error } = await supabase.auth.signInWithPassword({
      email: loginData.login,
      password: loginData.password
    })

    if (error) throw error

    userStore.user = data.user?.user_metadata as IUser
    localStorage.setItem('userData', JSON.stringify(userStore.user))

    return data
  }

  async getSession () {
    const { data } = await supabase.auth.getSession()

    return data
  }

  async logout () {
    const userStore = useGeneralStore()
    await supabase.auth.signOut()
    localStorage.removeItem('userData')
    userStore.user = null
  }
}

const authService = new AuthService()
export default authService
