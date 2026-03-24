'use client'

import { formatTime } from '@/lib/utils/date'
import { Check, SkipForward, Clock } from 'lucide-react'
import { AiBadge } from '@/components/ui/Badge'
import { cn } from '@/lib/utils/cn'
import type { PlanTaskDto } from '@/lib/types'

export interface TaskWithPlan extends PlanTaskDto {
  planId: string
  planTitle?: string
}

const dotColors = ['bg-orange-500', 'bg-blue-500', 'bg-emerald-500', 'bg-purple-500']
const dotBorderColors = ['border-orange-500', 'border-blue-500', 'border-emerald-500', 'border-purple-500']

interface TimelineViewProps {
  tasks: TaskWithPlan[]
  onComplete: (planId: string, taskId: string) => void
  onSkip: (planId: string, taskId: string) => void
  isLoading?: boolean
}

export function TimelineView({ tasks, onComplete, onSkip, isLoading }: TimelineViewProps) {
  if (tasks.length === 0) {
    return (
      <div className="text-gray-400 text-sm text-center py-8">
        Ин рӯз вазифа нест
      </div>
    )
  }

  const sortedTasks = [...tasks].sort(
    (a, b) => new Date(a.scheduledAt).getTime() - new Date(b.scheduledAt).getTime()
  )

  return (
    <div className="relative">
      <div className="absolute left-4 top-3 bottom-3 w-px bg-white/10" />
      <div className="space-y-3">
        {sortedTasks.map((task, i) => {
          const isCompleted = task.status === 'Completed'
          const isSkipped = task.status === 'Skipped'
          const isDone = isCompleted || isSkipped

          return (
            <div key={task.id} className="flex gap-4 items-start">
              <div className="flex flex-col items-center flex-shrink-0 z-10">
                <div
                  className={cn(
                    'w-8 h-8 rounded-full border-2 flex items-center justify-center',
                    isCompleted
                      ? 'bg-emerald-500 border-emerald-500'
                      : isSkipped
                      ? 'bg-gray-600 border-gray-600'
                      : `bg-[#0D0920] ${dotBorderColors[i % 4]}`
                  )}
                >
                  {isCompleted ? (
                    <Check size={14} className="text-white" />
                  ) : isSkipped ? (
                    <SkipForward size={12} className="text-white" />
                  ) : (
                    <div className={`w-2 h-2 rounded-full ${dotColors[i % 4]}`} />
                  )}
                </div>
              </div>
              <div
                className={cn(
                  'flex-1 p-3 rounded-xl border transition-all',
                  isCompleted
                    ? 'bg-emerald-500/10 border-emerald-500/20 opacity-70'
                    : isSkipped
                    ? 'bg-gray-700/20 border-gray-600/20 opacity-50'
                    : 'bg-[#1A1035] border-white/10'
                )}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span
                        className={cn(
                          'text-sm font-medium',
                          isDone ? 'line-through text-gray-400' : 'text-white'
                        )}
                      >
                        {task.title}
                      </span>
                      {task.isAiSuggested && <AiBadge />}
                    </div>
                    <div className="flex items-center gap-3 text-xs text-gray-500">
                      <span>{formatTime(task.scheduledAt)}</span>
                      <div className="flex items-center gap-1">
                        <Clock size={10} />
                        <span>{task.estimatedMinutes} дақ.</span>
                      </div>
                    </div>
                  </div>
                  {!isDone && (
                    <div className="flex gap-1 flex-shrink-0">
                      <button
                        onClick={() => onComplete(task.planId, task.id)}
                        disabled={isLoading}
                        className="p-1.5 rounded-lg bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30 transition-colors"
                      >
                        <Check size={14} />
                      </button>
                      <button
                        onClick={() => onSkip(task.planId, task.id)}
                        disabled={isLoading}
                        className="p-1.5 rounded-lg bg-gray-700/50 text-gray-400 hover:bg-gray-700 transition-colors"
                      >
                        <SkipForward size={14} />
                      </button>
                    </div>
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
