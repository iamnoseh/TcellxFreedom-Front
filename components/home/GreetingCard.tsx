import { ProgressBar } from '@/components/ui/ProgressBar'
import { formatDate } from '@/lib/utils/date'
import type { UserDto, PlanDto } from '@/lib/types'

interface GreetingCardProps {
  user: UserDto | null | undefined
  plans: PlanDto[]
}

export function GreetingCard({ user, plans }: GreetingCardProps) {
  const totalTasks = plans.reduce((sum, p) => sum + p.totalTasks, 0)
  const completedTasks = plans.reduce((sum, p) => sum + p.completedTasks, 0)
  const today = formatDate(new Date().toISOString())

  const initials = user?.firstName ? user.firstName[0].toUpperCase() : 'У'

  return (
    <div className="bg-gradient-to-br from-[#7B2FBE] to-[#4A1A8C] rounded-2xl p-4 shadow-md">
      {/* Top row: avatar + date + notification */}
      <div className="flex items-center gap-3 mb-4">
        <div className="w-11 h-11 rounded-full bg-white/20 flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
          {initials}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-white/70 text-xs">{today}</p>
          <h2 className="text-white font-bold text-base truncate">
            Рӯз хайр, {user?.firstName ?? 'Дӯст'}!
          </h2>
        </div>
      </div>

      {totalTasks > 0 ? (
        <div className="bg-white/10 rounded-xl px-4 py-3">
          <div className="flex justify-between items-center mb-2">
            <p className="text-white/80 text-sm">Вазифаҳои имрӯз</p>
            <span className="text-white font-semibold text-sm">
              {completedTasks}/{totalTasks}
            </span>
          </div>
          <ProgressBar value={completedTasks} max={totalTasks} className="h-1.5 bg-white/20" />
        </div>
      ) : (
        <div className="bg-white/10 rounded-xl px-4 py-3">
          <p className="text-white/80 text-sm">Имрӯз нақша нест.</p>
          <p className="text-white/50 text-xs mt-0.5">ИИ-нақша созед!</p>
        </div>
      )}
    </div>
  )
}
