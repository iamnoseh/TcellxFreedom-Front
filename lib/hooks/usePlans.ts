import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import {
  getPlansApi,
  getPlanByIdApi,
  getPlanSuggestionsApi,
  completeTaskApi,
  skipTaskApi,
  createPlanFromChatApi,
  reviewPlanApi,
  addQuickTaskApi,
  type CreatePlanFromChatRequest,
  type ReviewRequest,
  type AddQuickTaskRequest,
} from '@/lib/api/plans.api'
import type { ApiResponse, PlanDetailDto } from '@/lib/types'

export function usePlans() {
  return useQuery({
    queryKey: ['plans'],
    queryFn: getPlansApi,
    select: (data) => data.data,
  })
}

export function usePlan(id: string) {
  return useQuery({
    queryKey: ['plan', id],
    queryFn: () => getPlanByIdApi(id),
    enabled: !!id,
    select: (data) => data.data,
  })
}

export function usePlanSuggestions(id: string) {
  return useQuery({
    queryKey: ['plan-suggestions', id],
    queryFn: () => getPlanSuggestionsApi(id),
    enabled: !!id,
    select: (data) => data.data,
  })
}

export function useCreatePlanFromChat() {
  return useMutation({
    mutationFn: (data: CreatePlanFromChatRequest) => createPlanFromChatApi(data),
  })
}

export function useReviewPlan(planId: string) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (data: ReviewRequest) => reviewPlanApi(planId, data),
    onSuccess: (data) => {
      if (data.data) queryClient.setQueryData<ApiResponse<PlanDetailDto>>(['plan', planId], data)
      queryClient.invalidateQueries({ queryKey: ['plans'] })
    },
  })
}

// ─── Optimistic task update helper ───────────────────────────────────────────
function applyTaskStatus(
  queryClient: ReturnType<typeof useQueryClient>,
  planId: string,
  taskId: string,
  newStatus: 'Completed' | 'Skipped'
) {
  queryClient.setQueryData<ApiResponse<PlanDetailDto>>(
    ['plan', planId],
    (old) => {
      if (!old?.data) return old
      return {
        ...old,
        data: {
          ...old.data,
          tasks: old.data.tasks.map((t) =>
            t.id === taskId ? { ...t, status: newStatus } : t
          ),
        },
      }
    }
  )
}

export function useCompleteTask() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ planId, taskId }: { planId: string; taskId: string }) =>
      completeTaskApi(planId, taskId),
    // Immediately update UI before server responds
    onMutate: ({ planId, taskId }) => {
      applyTaskStatus(queryClient, planId, taskId, 'Completed')
    },
    // Confirm with real server data
    onSuccess: (data) => {
      if (data.data) queryClient.setQueryData<ApiResponse<PlanDetailDto>>(['plan', data.data.id], data)
      queryClient.invalidateQueries({ queryKey: ['plans'] })
    },
    // On error — refetch to restore correct state
    onError: (_err, { planId }) => {
      queryClient.invalidateQueries({ queryKey: ['plan', planId] })
    },
  })
}

export function useSkipTask() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ planId, taskId }: { planId: string; taskId: string }) =>
      skipTaskApi(planId, taskId),
    onMutate: ({ planId, taskId }) => {
      applyTaskStatus(queryClient, planId, taskId, 'Skipped')
    },
    onSuccess: (data) => {
      if (data.data) queryClient.setQueryData<ApiResponse<PlanDetailDto>>(['plan', data.data.id], data)
      queryClient.invalidateQueries({ queryKey: ['plans'] })
    },
    onError: (_err, { planId }) => {
      queryClient.invalidateQueries({ queryKey: ['plan', planId] })
    },
  })
}

export function useAddQuickTask() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (data: AddQuickTaskRequest) => addQuickTaskApi(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['plans'] })
    },
  })
}
