import { apiClient } from './client'
import type { ApiResponse, NotificationDto } from '@/lib/types'

export async function getUpcomingNotificationsApi(): Promise<ApiResponse<NotificationDto[]>> {
  const res = await apiClient.get<ApiResponse<NotificationDto[]>>('/api/notification/upcoming')
  return res.data
}
