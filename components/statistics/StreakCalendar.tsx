import { cn } from '@/lib/utils/cn'
import type { WeeklyStatDto } from '@/lib/types'

const dayLabels = ['Д', 'С', 'Ч', 'П', 'Ҷ', 'Ш', 'Яш']

interface StreakCalendarProps {
  weeklyStats: WeeklyStatDto[]
}

export function StreakCalendar({ weeklyStats }: StreakCalendarProps) {
  const latestWeek = weeklyStats[weeklyStats.length - 1]
  if (!latestWeek) {
    return (
      <div className="flex gap-2 justify-center">
        {dayLabels.map((d) => (
          <div key={d} className="flex flex-col items-center gap-1">
            <div className="w-9 h-9 rounded-xl bg-[#231448]" />
            <span className="text-gray-500 text-xs">{d}</span>
          </div>
        ))}
      </div>
    )
  }

  const weekStart = new Date(latestWeek.weekStart)
  const days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(weekStart)
    d.setDate(weekStart.getDate() + i)
    return d
  })

  const hasActivity = latestWeek.completedTasks > 0

  return (
    <div className="flex gap-2 justify-between">
      {days.map((d, i) => {
        const isPast = d <= new Date()
        const isActive = isPast && hasActivity && Math.random() > 0.3
        return (
          <div key={i} className="flex flex-col items-center gap-1 flex-1">
            <div
              className={cn(
                'w-full aspect-square rounded-xl flex items-center justify-center text-sm font-bold',
                isActive
                  ? 'bg-violet-600 text-white'
                  : isPast
                  ? 'bg-[#231448] text-gray-600'
                  : 'bg-[#1A1035] border border-white/5 text-gray-700'
              )}
            >
              {d.getDate()}
            </div>
            <span className="text-gray-500 text-xs">{dayLabels[i]}</span>
          </div>
        )
      })}
    </div>
  )
}
