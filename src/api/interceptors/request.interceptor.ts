import type { AxiosError, InternalAxiosRequestConfig } from 'axios'

// TODO: the following code is just an example. Please write your own project specific interceptors

const requestInterceptor = async (requestConfig: InternalAxiosRequestConfig): Promise<InternalAxiosRequestConfig> => {
  // if (requestConfig.headers) {
  //   requestConfig.headers.Authorization = `Bearer ${await authStore.getToken()}`
  // }

  return requestConfig
}

const requestErrorInterceptor = (error: AxiosError): Promise<AxiosError> => {
  return Promise.reject(error)
}

export {
  requestInterceptor,
  requestErrorInterceptor
}
