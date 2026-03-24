import { apiClient } from './client'
import type { ApiResponse, StatisticsDto } from '@/lib/types'

export async function getStatisticsApi(weekCount = 4): Promise<ApiResponse<StatisticsDto>> {
  const res = await apiClient.get<ApiResponse<StatisticsDto>>(`/api/statistics?weekCount=${weekCount}`)
  return res.data
}
