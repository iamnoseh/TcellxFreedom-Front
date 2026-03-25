'use client'

import { useState } from 'react'
import { useQueries } from '@tanstack/react-query'
import { PageHeader } from '@/components/layout/PageHeader'
import { DayTabs } from '@/components/schedule/DayTabs'
import { TimelineView } from '@/components/schedule/TimelineView'
import { AiTip } from '@/components/schedule/AiTip'
import { AddTaskSheet } from '@/components/schedule/AddTaskSheet'
import { FullPageSpinner } from '@/components/ui/Spinner'
import { usePlans, useCompleteTask, useSkipTask, useAddQuickTask } from '@/lib/hooks/usePlans'
import { getPlanByIdApi } from '@/lib/api/plans.api'
import type { TaskWithPlan } from '@/components/schedule/TimelineView'
import { useStatistics } from '@/lib/hooks/useStatistics'
import { isSameDay } from '@/lib/utils/date'

export default function SchedulePage() {
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [showAddSheet, setShowAddSheet] = useState(false)

  const { data: plans = [], isLoading } = usePlans()
  const { data: statistics } = useStatistics(1)
  const completeTask = useCompleteTask()
  const skipTask = useSkipTask()
  const addQuickTask = useAddQuickTask()

  // Plans whose date range covers the selected day
  const selectedPlans = plans.filter((p) => {
    const start = new Date(new Date(p.startDate).toDateString())
    const end = new Date(new Date(p.endDate).toDateString())
    const sel = new Date(selectedDate.toDateString())
    return sel >= start && sel <= end
  })

  // Load all selected plan details in parallel
  const planQueries = useQueries({
    queries: selectedPlans.map((plan) => ({
      queryKey: ['plan', plan.id],
      queryFn: () => getPlanByIdApi(plan.id),
      enabled: !!plan.id,
    })),
  })

  const isDetailLoading = planQueries.some((q) => q.isLoading)

  // Flatten all tasks from all plans for the selected day, attach planId, sort by time
  const allDayTasks: TaskWithPlan[] = planQueries
    .flatMap((q, i) => {
      const tasks = q.data?.data?.tasks ?? []
      const plan = selectedPlans[i]
      return tasks
        .filter((t) => isSameDay(new Date(t.scheduledAt), selectedDate))
        .map((t): TaskWithPlan => ({ ...t, planId: plan.id, planTitle: plan.title }))
    })
    .sort((a, b) => new Date(a.scheduledAt).getTime() - new Date(b.scheduledAt).getTime())

  const aiTip = statistics?.aiSuggestions?.[0]
  const isActionLoading = completeTask.isPending || skipTask.isPending

  return (
    <div className="flex flex-col min-h-[calc(100vh-80px)]">
      <PageHeader
        title="Рӯзнома"
        subtitle={selectedDate.toLocaleDateString('ru-RU', { weekday: 'long', day: 'numeric', month: 'long' })}
      />

      <div className="px-4 space-y-4">
        <DayTabs selectedDate={selectedDate} onSelectDate={setSelectedDate} />

        {isLoading || isDetailLoading ? (
          <FullPageSpinner />
        ) : selectedPlans.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 gap-3">
            <span className="text-4xl">📅</span>
            <p className="text-gray-500 text-center">
              Ин рӯз нақша нест.
              <br />
              ИИ-нақшаи нав созед!
            </p>
          </div>
        ) : allDayTasks.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 gap-3">
            <span className="text-4xl">✅</span>
            <p className="text-gray-500 text-center">Ин рӯз вазифа нест.</p>
          </div>
        ) : (
          <TimelineView
            tasks={allDayTasks}
            onComplete={(planId, taskId) => completeTask.mutate({ planId, taskId })}
            onSkip={(planId, taskId) => skipTask.mutate({ planId, taskId })}
            isLoading={isActionLoading}
          />
        )}

        {aiTip && (
          <div className="pt-2">
            <AiTip tip={aiTip} />
          </div>
        )}

        <div className="h-20" />
      </div>

      {/* FAB */}
      <button
        onClick={() => setShowAddSheet(true)}
        className="fixed bottom-24 right-5 w-14 h-14 bg-[#7B2FBE] rounded-full flex items-center justify-center shadow-lg shadow-purple-300/50 active:scale-95 transition-transform z-30"
      >
        <span className="text-white text-2xl leading-none">+</span>
      </button>

      {showAddSheet && (
        <AddTaskSheet
          selectedDate={selectedDate}
          onClose={() => setShowAddSheet(false)}
          isLoading={addQuickTask.isPending}
          onSubmit={async (data) => {
            await addQuickTask.mutateAsync(data)
            setShowAddSheet(false)
          }}
        />
      )}
    </div>
  )
}
