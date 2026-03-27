'use client'

import { Check, Lock } from 'lucide-react'
import { useAllRewards, useClaimReward } from '@/lib/hooks/useTcellPass'
import type { UserTcellPassDto } from '@/lib/types'

const REWARD_EMOJI: Record<string, string> = {
  MB: '📶', GB: '📶', Minutes: '📞', SMS: '💬',
  Badge: '🏅', VipStatus: '👑', Service: '🎵', Bonus: '🎁', Raffle: '📱',
}

interface RewardsTabProps {
  pass: UserTcellPassDto
}

export function RewardsTab({ pass }: RewardsTabProps) {
  const { data: rewards = [], isLoading } = useAllRewards()
  const { mutate: claimReward, isPending } = useClaimReward()

  const freeRewards = rewards.filter((r) => r.tier === 'Free')
  const premRewards = rewards.filter((r) => r.tier === 'Premium')

  if (isLoading) {
    return (
      <div className="flex justify-center py-10">
        <div className="w-6 h-6 border-2 border-violet-500 border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <div className="pb-24">
      {/* Column headers — full-width sticky */}
      <div className="sticky top-0 bg-[#F4F6FA] py-2 z-10 px-4">
        <div className="grid grid-cols-2 gap-3">
          <div className="text-center text-gray-600 text-sm font-semibold border border-gray-200 rounded-xl py-1.5 bg-white">БЕСПЛАТНО</div>
          <div className="text-center text-orange-500 text-sm font-semibold border border-orange-300 rounded-xl py-1.5 bg-orange-50">⭐ PREMIUM</div>
        </div>
      </div>

      {/* Level rows */}
      <div className="space-y-2 px-4 pt-1">
        {Array.from({ length: 20 }, (_, i) => {
          const level = i + 1
          const free = freeRewards.find((r) => r.level === level)
          const prem = premRewards.find((r) => r.level === level)
          const isCurrentLevel = pass.currentLevel === level
          // Level N reward unlocks after reaching level N+1 (level 20 unlocks at level 20)
          const reached = level === 20 ? pass.currentLevel >= 20 : pass.currentLevel > level

          return (
            <div key={level} className={`grid grid-cols-[1fr_36px_1fr] gap-1.5 items-center ${isCurrentLevel ? 'opacity-100' : reached ? 'opacity-90' : 'opacity-40'}`}>
              {/* Free reward */}
              <div className={`flex items-center gap-1.5 p-2 rounded-xl min-w-0 ${reached ? 'bg-white shadow-sm' : 'bg-gray-100'}`}>
                <span className="text-base flex-shrink-0">{REWARD_EMOJI[free?.rewardType ?? ''] ?? '🎁'}</span>
                <div className="min-w-0 flex-1">
                  <p className="text-gray-700 text-[11px] font-medium truncate leading-tight">{free?.rewardDescription ?? '-'}</p>
                  {free?.isClaimedByCurrentUser ? (
                    <p className="text-green-500 text-[10px] flex items-center gap-0.5 mt-0.5">
                      <Check size={9} /> Получено
                    </p>
                  ) : reached ? (
                    <button
                      onClick={() => pass.tier === 'Free' && claimReward(level)}
                      disabled={isPending || pass.tier !== 'Free'}
                      className="text-[#7B2FBE] text-[10px] font-medium hover:underline disabled:opacity-50 mt-0.5"
                    >
                      Получить
                    </button>
                  ) : (
                    <p className="text-gray-400 text-[10px] mt-0.5">Заблок.</p>
                  )}
                </div>
              </div>

              {/* Level number */}
              <div className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mx-auto ${
                isCurrentLevel ? 'bg-[#7B2FBE] text-white ring-2 ring-purple-300' : reached ? 'bg-purple-100 text-[#7B2FBE]' : 'bg-gray-200 text-gray-400'
              }`}>
                {level}
              </div>

              {/* Premium reward */}
              <div className={`flex items-center gap-1.5 p-2 rounded-xl min-w-0 ${pass.tier === 'Premium' && reached ? 'bg-orange-50 border border-orange-200' : 'bg-gray-100'}`}>
                <span className="text-base flex-shrink-0">{REWARD_EMOJI[prem?.rewardType ?? ''] ?? '🎁'}</span>
                <div className="min-w-0 flex-1">
                  <p className="text-gray-700 text-[11px] font-medium truncate leading-tight">{prem?.rewardDescription ?? '-'}</p>
                  {prem?.isClaimedByCurrentUser ? (
                    <p className="text-green-500 text-[10px] flex items-center gap-0.5 mt-0.5">
                      <Check size={9} /> Получено
                    </p>
                  ) : pass.tier === 'Premium' && reached ? (
                    <button
                      onClick={() => claimReward(level)}
                      disabled={isPending}
                      className="text-orange-500 text-[10px] font-medium hover:underline mt-0.5"
                    >
                      Получить
                    </button>
                  ) : (
                    <p className="text-orange-400 text-[10px] flex items-center gap-0.5 mt-0.5">
                      <Lock size={9} /> Premium
                    </p>
                  )}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
