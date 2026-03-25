import { formatTime } from '@/lib/utils/date'
import { AiBadge } from '@/components/ui/Badge'
import { Clock } from 'lucide-react'
import type { PlanTaskDto } from '@/lib/types'

const dotColors = ['bg-orange-500', 'bg-blue-500', 'bg-emerald-500', 'bg-purple-500']

interface TaskItemProps {
  task: PlanTaskDto
  index: number
}

export function TaskItem({ task, index }: TaskItemProps) {
  return (
    <div className="flex gap-3 p-3 rounded-xl bg-white shadow-sm border border-gray-100">
      <div className="flex flex-col items-center gap-1 flex-shrink-0">
        <span className="text-gray-400 text-xs font-mono">{formatTime(task.scheduledAt)}</span>
        <div className={`w-2 h-2 rounded-full ${dotColors[index % 4]}`} />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-gray-800 text-sm font-medium truncate">{task.title}</span>
          {task.isAiSuggested && <AiBadge />}
        </div>
        {task.description && (
          <p className="text-gray-500 text-xs mb-1 line-clamp-2">{task.description}</p>
        )}
        <div className="flex items-center gap-1 text-gray-400 text-xs">
          <Clock size={12} />
          <span>{task.estimatedMinutes} дақ.</span>
        </div>
      </div>
    </div>
  )
}
