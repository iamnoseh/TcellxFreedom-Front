import { apiClient } from './client'
import type {
  ApiResponse,
  UserTcellPassDto,
  UserDailyTaskDto,
  LevelRewardDto,
  CompleteTaskResultDto,
  ClaimRewardResultDto,
  ActivatePremiumResultDto,
  LeaderboardEntryDto,
} from '@/lib/types'

export async function getMyPassApi(): Promise<ApiResponse<UserTcellPassDto>> {
  const res = await apiClient.get<ApiResponse<UserTcellPassDto>>('/api/tcell-pass/me')
  return res.data
}

export async function getTodayTasksApi(): Promise<ApiResponse<UserDailyTaskDto[]>> {
  const res = await apiClient.get<ApiResponse<UserDailyTaskDto[]>>('/api/tcell-pass/tasks/today')
  return res.data
}

export async function completePassTaskApi(taskId: string): Promise<ApiResponse<CompleteTaskResultDto>> {
  const res = await apiClient.post<ApiResponse<CompleteTaskResultDto>>(`/api/tcell-pass/tasks/${taskId}/complete`)
  return res.data
}

export async function getAllRewardsApi(): Promise<ApiResponse<LevelRewardDto[]>> {
  const res = await apiClient.get<ApiResponse<LevelRewardDto[]>>('/api/tcell-pass/rewards')
  return res.data
}

export async function claimRewardApi(level: number): Promise<ApiResponse<ClaimRewardResultDto>> {
  const res = await apiClient.post<ApiResponse<ClaimRewardResultDto>>(`/api/tcell-pass/rewards/${level}/claim`)
  return res.data
}

export async function activatePremiumApi(): Promise<ApiResponse<ActivatePremiumResultDto>> {
  const res = await apiClient.post<ApiResponse<ActivatePremiumResultDto>>('/api/tcell-pass/premium/activate')
  return res.data
}

export async function getLeaderboardApi(topN = 50): Promise<ApiResponse<LeaderboardEntryDto[]>> {
  const res = await apiClient.get<ApiResponse<LeaderboardEntryDto[]>>(`/api/tcell-pass/leaderboard?topN=${topN}`)
  return res.data
}
