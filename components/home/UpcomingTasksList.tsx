import { formatTime, isToday } from '@/lib/utils/date'
import type { PlanDto, PlanDetailDto } from '@/lib/types'

const dotColors = ['bg-orange-500', 'bg-blue-500', 'bg-emerald-500', 'bg-purple-500']

interface UpcomingTasksListProps {
  plans: PlanDto[]
  planDetails?: PlanDetailDto[]
}

export function UpcomingTasksList({ plans, planDetails }: UpcomingTasksListProps) {
  const todayPlans = plans.filter((p) => isToday(p.startDate))

  const upcomingTasks = planDetails
    ?.flatMap((pd) => pd.tasks)
    .filter((t) => t.status !== 'Completed' && t.status !== 'Skipped')
    .sort((a, b) => new Date(a.scheduledAt).getTime() - new Date(b.scheduledAt).getTime())
    .slice(0, 5) ?? []

  if (upcomingTasks.length === 0 && todayPlans.length === 0) {
    return (
      <div className="text-gray-400 text-sm text-center py-4">
        Вазифаҳои наздик нест
      </div>
    )
  }

  return (
    <div className="space-y-2">
      {upcomingTasks.map((task, i) => (
        <div
          key={task.id}
          className="flex items-center gap-3 p-3 rounded-xl bg-[#1A1035]"
        >
          <div className={`w-2 h-2 rounded-full flex-shrink-0 ${dotColors[i % 4]}`} />
          <span className="text-gray-400 text-sm w-12 flex-shrink-0">
            {formatTime(task.scheduledAt)}
          </span>
          <span className="text-white text-sm flex-1 truncate">{task.title}</span>
        </div>
      ))}
      {upcomingTasks.length === 0 && todayPlans.map((plan, i) => (
        <div
          key={plan.id}
          className="flex items-center gap-3 p-3 rounded-xl bg-[#1A1035]"
        >
          <div className={`w-2 h-2 rounded-full flex-shrink-0 ${dotColors[i % 4]}`} />
          <span className="text-white text-sm flex-1">{plan.title}</span>
          <span className="text-gray-400 text-xs">
            {plan.completedTasks}/{plan.totalTasks}
          </span>
        </div>
      ))}
    </div>
  )
}
