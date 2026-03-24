import { Card } from '@/components/ui/Card'
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

  return (
    <Card className="bg-gradient-to-br from-violet-700/40 to-[#1A1035] border border-violet-500/20">
      <div className="mb-3">
        <p className="text-gray-400 text-sm">{today}</p>
        <h2 className="text-2xl font-bold mt-1">
          Рӯз хайр, {user?.firstName ?? 'Дӯст'}!
        </h2>
      </div>
      {totalTasks > 0 ? (
        <>
          <p className="text-gray-300 text-sm mb-2">
            {completedTasks} аз {totalTasks} вазифа — Давом деҳ!
          </p>
          <ProgressBar value={completedTasks} max={totalTasks} />
          <p className="text-violet-400 text-xs mt-2 text-right font-medium">
            {totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0}%
          </p>
        </>
      ) : (
        <p className="text-gray-400 text-sm">Имрӯз нақша нест. ИИ-нақша созед!</p>
      )}
    </Card>
  )
}
