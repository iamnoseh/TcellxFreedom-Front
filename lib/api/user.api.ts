import { apiClient } from './client'
import type { ApiResponse, UserDto } from '@/lib/types'

export async function getMeApi(): Promise<ApiResponse<UserDto>> {
  const res = await apiClient.get<ApiResponse<UserDto>>('/user/me')
  return res.data
}
