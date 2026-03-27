'use client'

import { useState } from 'react'
import { Flame, ChevronRight } from 'lucide-react'
import { useMyPass, useCompletePassTask } from '@/lib/hooks/useTcellPass'
import { PassHeader } from '@/components/tcell-pass/PassHeader'
import { QuestCalendar } from '@/components/tcell-pass/QuestCalendar'
import { DailyTaskCard } from '@/components/tcell-pass/DailyTaskCard'
import { RewardsTab } from '@/components/tcell-pass/RewardsTab'
import { XpToast } from '@/components/tcell-pass/XpToast'
import { PremiumSheet } from '@/components/tcell-pass/PremiumSheet'
import { FullPageSpinner } from '@/components/ui/Spinner'
import type { CompleteTaskResultDto } from '@/lib/types'

type Tab = 'quest' | 'rewards'

export default function TcellPassPage() {
  const [tab, setTab] = useState<Tab>('quest')
  const [toast, setToast] = useState<CompleteTaskResultDto | null>(null)
  const [showPremium, setShowPremium] = useState(false)

  const { data: pass, isLoading } = useMyPass()
  const { mutate: completeTask, isPending } = useCompletePassTask()

  if (isLoading) return <FullPageSpinner />
  if (!pass) return null

  const freeTasks = pass.todayTasks.filter((t) => !t.isPremiumOnly)
  const premTasks = pass.todayTasks.filter((t) => t.isPremiumOnly)
  const freeCompleted = freeTasks.filter((t) => t.status === 'Completed').length
  const premCompleted = premTasks.filter((t) => t.status === 'Completed').length

  // Which day is today (approximate from streak + assigned tasks)
  const currentDay = Math.max(1, pass.currentStreakDays)

  function handleComplete(taskId: string) {
    completeTask(taskId, {
      onSuccess: (res) => {
        if (res.data) setToast(res.data)
      },
    })
  }

  return (
    <div className="min-h-screen bg-[#F4F6FA]">
      {/* Header */}
      <PassHeader pass={pass} />

      {/* Tab bar */}
      <div className="flex mx-4 mt-3 mb-1 bg-white rounded-2xl p-1 gap-1 shadow-sm">
        <button
          onClick={() => setTab('quest')}
          className={`flex-1 py-2 rounded-xl text-sm font-semibold transition-all ${
            tab === 'quest' ? 'bg-[#7B2FBE] text-white shadow' : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          Квесты
        </button>
        <button
          onClick={() => setTab('rewards')}
          className={`flex-1 py-2 rounded-xl text-sm font-semibold transition-all ${
            tab === 'rewards' ? 'bg-[#7B2FBE] text-white shadow' : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          🏆 Награды
        </button>
      </div>

      {/* ── QUEST TAB ── */}
      {tab === 'quest' && (
        <div className="pb-6">
          {/* Calendar */}
          <QuestCalendar currentDay={currentDay} />

          {/* Streak banner */}
          {pass.todayTasks.length > 0 && (
            <div className="mx-4 mb-3 flex items-center justify-between bg-white rounded-2xl px-4 py-2.5 shadow-sm">
              <div className="flex items-center gap-2">
                <Flame size={16} className="text-orange-500" />
                <span className="text-gray-800 text-sm font-semibold">
                  Streak: {freeCompleted}/{freeTasks.length} задач
                </span>
              </div>
              <span className="text-[#7B2FBE] text-xs font-medium">
                {freeTasks.length} задач → +30 XP
              </span>
            </div>
          )}

          {/* Free daily tasks */}
          <div className="mx-4 bg-white rounded-2xl overflow-hidden mb-3 shadow-sm">
            <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
              <span className="text-gray-800 font-semibold text-sm">Ежедневные задачи</span>
              <span className="text-gray-400 text-xs">{freeCompleted}/{freeTasks.length}</span>
            </div>
            {freeTasks.length === 0 ? (
              <div className="px-4 py-6 text-center">
                <p className="text-gray-500 text-sm">Задачи на сегодня ещё не готовы</p>
                <p className="text-gray-400 text-xs mt-1">Заходите завтра!</p>
              </div>
            ) : (
              <div className="divide-y divide-gray-50">
                {freeTasks.map((task) => (
                  <DailyTaskCard
                    key={task.id}
                    task={task}
                    onComplete={handleComplete}
                    isLoading={isPending}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Premium tasks */}
          <div className="mx-4 bg-white rounded-2xl overflow-hidden mb-4 shadow-sm">
            <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
              <span className="text-orange-500 font-semibold text-sm flex items-center gap-1.5">
                ⭐ Premium задачи
              </span>
              <span className="text-gray-400 text-xs">
                {pass.tier === 'Premium' ? `${premCompleted}/${premTasks.length}` : '0/2'}
              </span>
            </div>

            {pass.tier === 'Premium' && premTasks.length > 0 ? (
              <div className="divide-y divide-gray-50">
                {premTasks.map((task) => (
                  <DailyTaskCard
                    key={task.id}
                    task={task}
                    onComplete={handleComplete}
                    isLoading={isPending}
                  />
                ))}
              </div>
            ) : (
              /* Locked premium tasks preview */
              <div>
                {[
                  { title: 'Смотри Ajoib TV', xp: 100 },
                  { title: 'Пригласи друга', xp: 50 },
                ].map((t) => (
                  <div key={t.title} className="flex items-center gap-3 px-4 py-3 opacity-60">
                    <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center">
                      <span className="text-orange-400 text-lg">🔒</span>
                    </div>
                    <div className="flex-1">
                      <p className="text-gray-500 text-sm">{t.title}</p>
                      <p className="text-orange-400 text-xs">Только Premium</p>
                    </div>
                  </div>
                ))}

                <button
                  onClick={() => setShowPremium(true)}
                  className="w-full flex items-center justify-center gap-2 py-3 text-orange-500 text-sm font-semibold border-t border-gray-100 hover:bg-orange-50 transition-colors active:scale-95"
                >
                  ⚡ Получить Premium — 19 сом/мес
                  <ChevronRight size={16} />
                </button>
              </div>
            )}
          </div>

          {/* Upgrade banner (for free users) */}
          {pass.tier === 'Free' && (
            <button
              onClick={() => setShowPremium(true)}
              className="mx-4 w-[calc(100%-2rem)] bg-gradient-to-r from-orange-500 to-amber-500 rounded-2xl px-4 py-3 flex items-center justify-between active:scale-95 shadow-md"
            >
              <div>
                <p className="text-white font-semibold text-sm">⚡ Активировать Premium</p>
                <p className="text-white/70 text-xs mt-0.5">XP ×2 + 5 задач / день</p>
              </div>
              <ChevronRight size={18} className="text-white" />
            </button>
          )}
        </div>
      )}

      {/* ── REWARDS TAB ── */}
      {tab === 'rewards' && <RewardsTab pass={pass} />}

      {/* XP Toast */}
      {toast && (
        <XpToast
          xp={toast.xpAwarded}
          bonusXp={toast.streakBonusXp}
          leveledUp={toast.leveledUp}
          newLevel={toast.newLevel}
          onClose={() => setToast(null)}
        />
      )}

      {/* Premium Sheet */}
      {showPremium && (
        <PremiumSheet
          onClose={() => setShowPremium(false)}
          onSuccess={() => {}}
        />
      )}
    </div>
  )
}
