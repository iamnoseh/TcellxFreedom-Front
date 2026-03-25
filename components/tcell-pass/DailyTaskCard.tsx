'use client'

import { Check, Lock, Smartphone, Wallet, CreditCard, Tv, Users, Star } from 'lucide-react'
import { cn } from '@/lib/utils/cn'
import type { UserDailyTaskDto } from '@/lib/types'

const CATEGORY_ICON: Record<string, React.ReactNode> = {
  Balance: <Wallet size={16} />,
  Settings: <Smartphone size={16} />,
  Tariff: <Star size={16} />,
  Traffic: <CreditCard size={16} />,
  Payment: <CreditCard size={16} />,
  General: <Tv size={16} />,
}

const CATEGORY_COLOR: Record<string, string> = {
  Balance: 'bg-violet-100 text-[#7B2FBE]',
  Settings: 'bg-blue-100 text-blue-600',
  Tariff: 'bg-emerald-100 text-emerald-600',
  Traffic: 'bg-cyan-100 text-cyan-600',
  Payment: 'bg-purple-100 text-purple-600',
  General: 'bg-orange-100 text-orange-500',
}

interface DailyTaskCardProps {
  task: UserDailyTaskDto
  onComplete: (id: string) => void
  isLoading: boolean
}

export function DailyTaskCard({ task, onComplete, isLoading }: DailyTaskCardProps) {
  const isDone = task.status === 'Completed'
  const isExpired = task.status === 'Expired'
  const isLocked = task.isPremiumOnly

  return (
    <div className={cn(
      'flex items-center gap-3 p-3 rounded-xl transition-all',
      isDone ? 'opacity-70' : '',
      isExpired ? 'opacity-40' : '',
    )}>
      {/* Icon */}
      <div className={cn(
        'w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0',
        isLocked ? 'bg-orange-500/10' : (CATEGORY_COLOR[task.category] ?? 'bg-gray-500/20 text-gray-400')
      )}>
        {isLocked
          ? <Lock size={16} className="text-orange-400" />
          : (CATEGORY_ICON[task.category] ?? <Star size={16} />)}
      </div>

      {/* Title + XP */}
      <div className="flex-1 min-w-0">
        <p className={cn(
          'text-sm font-medium truncate',
          isDone ? 'text-gray-400 line-through' : isLocked ? 'text-gray-400' : 'text-gray-800'
        )}>
          {task.title}
        </p>
        {isLocked && (
          <p className="text-orange-400 text-xs font-medium mt-0.5">Танҳо Премиум</p>
        )}
        {!isLocked && (
          <p className={cn('text-xs mt-0.5', isDone ? 'text-[#7B2FBE]' : 'text-gray-400')}>
            +{task.xpReward} XP
          </p>
        )}
      </div>

      {/* Action button */}
      {!isLocked && !isExpired && (
        <button
          onClick={() => !isDone && onComplete(task.id)}
          disabled={isDone || isLoading}
          className={cn(
            'w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 border-2 transition-all active:scale-90',
            isDone
              ? 'bg-[#7B2FBE] border-[#7B2FBE]'
              : 'border-gray-300 hover:border-[#7B2FBE]'
          )}
        >
          {isDone && <Check size={13} strokeWidth={3} className="text-white" />}
        </button>
      )}
    </div>
  )
}
