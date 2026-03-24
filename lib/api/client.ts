import axios from 'axios'
import { useAuthStore } from '@/lib/store/auth.store'

export const apiClient = axios.create({ baseURL: 'http://localhost:5035' })

apiClient.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})
