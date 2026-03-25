import axios from 'axios'
import { useAuthStore } from '@/lib/store/auth.store'

export const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL ?? 'https://tcellxfreedom-git-227323021876.europe-west1.run.app',
})

apiClient.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})
