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

  validationRules = {
    email: [
      { type: 'email', message: 'Введіть валідний Email', trigger: 'blur' },
      { required: true, message: 'Введіть Email', trigger: 'blur' }
    ],
    password: [
      { required: true, message: 'Введіть пароль', trigger: 'blur' },
      { min: 6, message: 'Пароль повинен бути довшим за 6 символів', trigger: 'blur' }
    ],
    firstName: [
      { required: true, min: 2, message: "Введіть коректне ім'я", trigger: 'blur' }

    ],
    lastName: [
      { required: true, min: 2, message: 'Введіть коректне прізвище', trigger: 'blur' }
    ],
    phone: [
      { required: true, message: 'Введіть номер телефону', trigger: 'blur' },
      { min: 19, message: 'Введіть коректний номер телефону', trigger: 'blur' }
    ]
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
