'use client'

import { AiBadge } from '@/components/ui/Badge'
import { Clock } from 'lucide-react'
import { formatTime } from '@/lib/utils/date'
import type { PlanTaskDto } from '@/lib/types'

interface SuggestionCardProps {
  task: PlanTaskDto
  selected: boolean
  onToggle: () => void
}

export function SuggestionCard({ task, selected, onToggle }: SuggestionCardProps) {
  return (
    <button
      onClick={onToggle}
      className={`w-full text-left p-4 rounded-2xl border transition-all ${
        selected
          ? 'bg-violet-600/20 border-violet-500'
          : 'bg-[#1A1035] border-white/10 hover:border-violet-500/40'
      }`}
    >
      <div className="flex items-start gap-3">
        <div
          className={`w-5 h-5 rounded-md border-2 flex-shrink-0 mt-0.5 flex items-center justify-center transition-colors ${
            selected ? 'bg-violet-600 border-violet-600' : 'border-gray-600'
          }`}
        >
          {selected && (
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M2 6L5 9L10 3" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-white text-sm font-medium">{task.title}</span>
            <AiBadge />
          </div>
          <div className="flex items-center gap-3 text-xs text-gray-400 mb-2">
            <span>{formatTime(task.scheduledAt)}</span>
            <div className="flex items-center gap-1">
              <Clock size={11} />
              <span>{task.estimatedMinutes} дақ.</span>
            </div>
          </div>
          {task.aiRationale && (
            <p className="text-gray-500 text-xs italic">{task.aiRationale}</p>
          )}
        </div>
      </div>
    </button>
  )
}
