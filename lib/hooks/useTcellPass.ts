'use client'

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import {
  getMyPassApi,
  getAllRewardsApi,
  completePassTaskApi,
  claimRewardApi,
  activatePremiumApi,
  getLeaderboardApi,
} from '@/lib/api/tcell-pass.api'

export const PASS_KEYS = {
  myPass: ['tcell-pass', 'me'] as const,
  rewards: ['tcell-pass', 'rewards'] as const,
  leaderboard: ['tcell-pass', 'leaderboard'] as const,
}

export function useMyPass() {
  return useQuery({
    queryKey: PASS_KEYS.myPass,
    queryFn: async () => {
      const res = await getMyPassApi()
      return res.data
    },
  })
}

export function useAllRewards() {
  return useQuery({
    queryKey: PASS_KEYS.rewards,
    queryFn: async () => {
      const res = await getAllRewardsApi()
      return res.data
    },
  })
}

export function useLeaderboard(topN = 50) {
  return useQuery({
    queryKey: [...PASS_KEYS.leaderboard, topN],
    queryFn: async () => {
      const res = await getLeaderboardApi(topN)
      return res.data
    },
  })
}

export function useCompletePassTask() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (taskId: string) => completePassTaskApi(taskId),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: PASS_KEYS.myPass })
    },
  })
}

export function useClaimReward() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (level: number) => claimRewardApi(level),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: PASS_KEYS.myPass })
      qc.invalidateQueries({ queryKey: PASS_KEYS.rewards })
    },
  })
}

export function useActivatePremium() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: activatePremiumApi,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: PASS_KEYS.myPass })
    },
  })
}
