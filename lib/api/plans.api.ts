import { apiClient } from './client'
import type { ApiResponse, PlanDto, PlanDetailDto, PlanTaskDto } from '@/lib/types'

export interface CreatePlanFromChatRequest {
  text: string
  date: string
  userTimeZone: string
  endDate?: string
}

export interface ReviewDecision {
  taskId: string
  accept: boolean
}

export interface ReviewRequest {
  decisions: ReviewDecision[]
}

export async function getPlansApi(): Promise<ApiResponse<PlanDto[]>> {
  const res = await apiClient.get<ApiResponse<PlanDto[]>>('/api/plan')
  return res.data
}

export async function createPlanFromChatApi(data: CreatePlanFromChatRequest): Promise<ApiResponse<PlanDetailDto>> {
  const res = await apiClient.post<ApiResponse<PlanDetailDto>>('/api/plan/from-chat', data)
  return res.data
}

export async function getPlanSuggestionsApi(id: string): Promise<ApiResponse<PlanTaskDto[]>> {
  const res = await apiClient.get<ApiResponse<PlanTaskDto[]>>(`/api/plan/${id}/suggestions`)
  return res.data
}

export async function reviewPlanApi(id: string, data: ReviewRequest): Promise<ApiResponse<PlanDetailDto>> {
  const res = await apiClient.post<ApiResponse<PlanDetailDto>>(`/api/plan/${id}/review`, data)
  return res.data
}

export async function getPlanByIdApi(id: string): Promise<ApiResponse<PlanDetailDto>> {
  const res = await apiClient.get<ApiResponse<PlanDetailDto>>(`/api/plan/${id}`)
  return res.data
}

export interface AddQuickTaskRequest {
  title: string
  description?: string
  scheduledAt: string  // ISO8601 UTC
  estimatedMinutes: number
}

export async function addQuickTaskApi(data: AddQuickTaskRequest): Promise<ApiResponse<PlanDetailDto>> {
  const res = await apiClient.post<ApiResponse<PlanDetailDto>>('/api/plan/quick-task', data)
  return res.data
}

export async function completeTaskApi(planId: string, taskId: string): Promise<ApiResponse<PlanDetailDto>> {
  const res = await apiClient.put<ApiResponse<PlanDetailDto>>(`/api/plan/${planId}/task/${taskId}/complete`)
  return res.data
}

export async function skipTaskApi(planId: string, taskId: string): Promise<ApiResponse<PlanDetailDto>> {
  const res = await apiClient.put<ApiResponse<PlanDetailDto>>(`/api/plan/${planId}/task/${taskId}/skip`)
  return res.data
}
