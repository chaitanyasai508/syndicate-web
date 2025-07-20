import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios'
import { useAuthStore } from '@/store/use-auth-store'
import { TokenService } from '@/lib/services/token-service'
import { toast } from '@/hooks/use-toast'
import { env } from '@/config/env'

if (!env.apiUrl) {
  throw new Error('NEXT_PUBLIC_API_URL is not defined')
}

const api = axios.create({
  baseURL: env.apiUrl,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Authorization': `Bearer ${TokenService.getAccessToken()}`,
  },
})

api.interceptors.request.use(async (config: InternalAxiosRequestConfig) => {
  const tokens = useAuthStore.getState().tokens
  if (tokens?.access.token) {
    if (TokenService.isAccessTokenExpired(tokens.access.token)) {
      try {
        await useAuthStore.getState().refreshTokens()
        const newTokens = useAuthStore.getState().tokens
        if (newTokens?.access.token) {
          config.headers.Authorization = `Bearer ${newTokens.access.token}`
        }
      } catch (error) {
        useAuthStore.getState().signOut()
        throw error
      }
    } else {
      config.headers.Authorization = `Bearer ${tokens.access.token}`
    }
  }
  return config
})

api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    if (error.response?.status === 401) {
      useAuthStore.getState().signOut()
      toast({
        variant: "destructive",
        title: "Session Expired",
        description: "Please sign in again",
      })
    } else if (error.response?.status === 403) {
      toast({
        variant: "destructive",
        title: "Access Denied",
        description: "You don't have permission to perform this action",
      })
    } else if (error.response?.status === 404) {
      // toast({
      //   variant: "destructive",
      //   title: "Not Found",
      //   description: (error.response?.data as any)?.error || "The requested resource was not found",
      // })
    } else {
      // toast({
      //   variant: "destructive",
      //   title: "Error",
      //   description: (error.response?.data as any)?.error || "Something went wrong",
      // })
    }
    return Promise.resolve(error.response?.data)
  }
)

export default api