'use client'

import { PageHeader } from '@/components/layout/PageHeader'
import { StatCard } from '@/components/statistics/StatCard'
import { StreakCalendar } from '@/components/statistics/StreakCalendar'
import { CategoryBars } from '@/components/statistics/CategoryBars'
import { FullPageSpinner } from '@/components/ui/Spinner'
import { Card } from '@/components/ui/Card'
import { AiBadge } from '@/components/ui/Badge'
import { useStatistics } from '@/lib/hooks/useStatistics'

export default function StatisticsPage() {
  const { data: statistics, isLoading } = useStatistics(4)

  if (isLoading) return <FullPageSpinner />

  const weeklyStats = statistics?.weeklyStats ?? []
  const latestWeek = weeklyStats[weeklyStats.length - 1]

  const totalTasks = weeklyStats.reduce((s, w) => s + w.totalTasks, 0)
  const completedTasks = weeklyStats.reduce((s, w) => s + w.completedTasks, 0)
  const skippedTasks = weeklyStats.reduce((s, w) => s + w.skippedTasks, 0)
  const avgCompletion =
    weeklyStats.length > 0
      ? Math.round(weeklyStats.reduce((s, w) => s + w.completionRate, 0) / weeklyStats.length)
      : 0

  // Simulate category breakdown from total tasks
  const categoryData = [
    { label: 'Кор', value: Math.floor(completedTasks * 0.4), max: Math.floor(totalTasks * 0.4) },
    { label: 'Варзиш', value: Math.floor(completedTasks * 0.3), max: Math.floor(totalTasks * 0.3) },
    { label: 'Таҳсил', value: Math.floor(completedTasks * 0.3), max: Math.floor(totalTasks * 0.3) },
  ]

  return (
    <div className="flex flex-col min-h-[calc(100vh-80px)]">
      <PageHeader title="Пешрафт" subtitle="4 ҳафтаи охир" />

      <div className="px-4 space-y-5">
        {/* Stat cards */}
        <div className="grid grid-cols-2 gap-3">
          <StatCard
            label="Ҳамаи вазифаҳо"
            value={totalTasks}
            sub="4 ҳафта"
            color="violet"
          />
          <StatCard
            label="Иҷро шуд"
            value={completedTasks}
            sub={`${avgCompletion}% иҷро`}
            color="green"
          />
          <StatCard
            label="Гузаронида шуд"
            value={skippedTasks}
            color="orange"
          />
          <StatCard
            label="Ҳафтаи ҷорӣ"
            value={latestWeek ? `${latestWeek.completedTasks}/${latestWeek.totalTasks}` : '—'}
            sub="вазифа"
            color="blue"
          />
        </div>

        {/* Streak calendar */}
        <Card>
          <h3 className="text-sm font-semibold text-gray-300 mb-3">Ҳафтаи ҷорӣ</h3>
          <StreakCalendar weeklyStats={weeklyStats} />
        </Card>

        {/* Category bars */}
        {totalTasks > 0 && (
          <Card>
            <h3 className="text-sm font-semibold text-gray-300 mb-3">Категорияҳо</h3>
            <CategoryBars categories={categoryData} />
          </Card>
        )}

        {/* AI suggestions */}
        {statistics?.aiSuggestions && statistics.aiSuggestions.length > 0 && (
          <Card className="border border-orange-500/20">
            <div className="flex items-center gap-2 mb-3">
              <h3 className="text-sm font-semibold text-gray-300">Маслиҳатҳои AI</h3>
              <AiBadge />
            </div>
            <div className="space-y-2">
              {statistics.aiSuggestions.map((tip, i) => (
                <div key={i} className="flex gap-2">
                  <span className="text-orange-400 text-sm">•</span>
                  <p className="text-gray-300 text-sm leading-relaxed">{tip}</p>
                </div>
              ))}
            </div>
          </Card>
        )}
      </div>
    </div>
  )
}
