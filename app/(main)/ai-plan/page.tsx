'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { PageHeader } from '@/components/layout/PageHeader'
import { ChatInput } from '@/components/plan/ChatInput'
import { CategoryChips } from '@/components/plan/CategoryChips'
import { TaskItem } from '@/components/plan/TaskItem'
import { Button } from '@/components/ui/Button'
import { FullPageSpinner } from '@/components/ui/Spinner'
import { AiThinkingBubble } from '@/components/plan/AiThinkingBubble'
import { useCreatePlanFromChat } from '@/lib/hooks/usePlans'
import type { PlanDetailDto } from '@/lib/types'

type Step = 'chat' | 'plan' | 'done'

const DURATIONS = [
  { label: '1 рӯз', days: 0 },
  { label: '1 ҳафта', days: 6 },
  { label: '2 ҳафта', days: 13 },
  { label: '1 моҳ', days: 29 },
  { label: '3 моҳ', days: 89 },
]

function addDays(date: Date, days: number): Date {
  const d = new Date(date)
  d.setDate(d.getDate() + days)
  return d
}

export default function AiPlanPage() {
  const router = useRouter()
  const [step, setStep] = useState<Step>('chat')
  const [text, setText] = useState('')
  const [durationIdx, setDurationIdx] = useState(0)
  const [createdPlan, setCreatedPlan] = useState<PlanDetailDto | null>(null)

  const createPlan = useCreatePlanFromChat()

  const handleSend = async () => {
    if (!text.trim()) return
    try {
      const today = new Date()
      const date = today.toISOString().split('T')[0]
      const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone
      const selectedDays = DURATIONS[durationIdx].days
      const endDate = selectedDays > 0
        ? addDays(today, selectedDays).toISOString().split('T')[0]
        : undefined

      const res = await createPlan.mutateAsync({ text, date, userTimeZone, endDate })
      if (res.isSuccess && res.data) {
        setCreatedPlan(res.data)
        setStep('plan')
      }
    } catch {
      // error handled by mutation state
    }
  }

  const handleCategorySelect = (cat: string) => {
    setText((prev) => (prev ? `${prev}, ${cat}` : cat))
  }

  const handleReset = () => {
    setStep('chat')
    setText('')
    setDurationIdx(0)
    setCreatedPlan(null)
  }

  // STEP: chat
  if (step === 'chat') {
    return (
      <div className="flex flex-col min-h-[calc(100vh-80px)]">
        <PageHeader title="ИИ-Нақша" showAiBadge />
        <div className="flex-1 px-4 pt-2 pb-4 flex flex-col gap-4">
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-1">Нақшаи худро созед</h2>
            <p className="text-gray-500 text-sm">Хоиш кун — ИИ нақша месозад</p>
          </div>

          {/* AI message bubble */}
          <div className="bg-white rounded-2xl rounded-tl-sm p-4 max-w-[90%] shadow-sm border border-gray-100">
            <p className="text-gray-700 text-sm leading-relaxed">
              Салом! Ман ёрдамчии ИИ-и Tcell ҳастам 🤖
              <br /><br />
              Ба ман бигӯед чӣ мехоҳед ёд гиред ё анҷом диҳед —
              ман барои шумо нақшаи гом-ба-гом бо вазифаҳои рӯзона месозам!
            </p>
            <span className="text-xs text-[#7B2FBE] mt-2 block font-medium">Tcell AI</span>
          </div>

          <div>
            <p className="text-gray-500 text-xs mb-2">Намунаи суръат:</p>
            <CategoryChips onSelect={handleCategorySelect} />
          </div>

          {/* Duration selector */}
          <div>
            <p className="text-gray-500 text-xs mb-2">Давомнокии нақша:</p>
            <div className="flex flex-wrap gap-2">
              {DURATIONS.map((d, i) => (
                <button
                  key={d.label}
                  onClick={() => setDurationIdx(i)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                    durationIdx === i
                      ? 'bg-[#7B2FBE] text-white'
                      : 'bg-white text-gray-600 border border-gray-200 hover:border-[#7B2FBE]'
                  }`}
                >
                  {d.label}
                </button>
              ))}
            </div>
          </div>

          {/* AI thinking animation — shown while loading */}
          {createPlan.isPending && (
            <div className="mt-2">
              <AiThinkingBubble />
            </div>
          )}

          <div className="flex-1" />
        </div>

        <div className="px-4 pb-4">
          {createPlan.isError && (
            <p className="text-red-400 text-sm mb-2 text-center">Хатогӣ рӯй дод. Дубора кӯшиш кунед.</p>
          )}
          <ChatInput
            value={text}
            onChange={setText}
            onSend={handleSend}
            disabled={createPlan.isPending}
            placeholder="Хоиши худро нависед..."
          />
        </div>
      </div>
    )
  }

  // STEP: plan loading / showing plan
  if (step === 'plan') {
    if (createPlan.isPending) return <FullPageSpinner />

    const taskCount = createdPlan?.tasks.length ?? 0
    const startDate = createdPlan?.startDate
      ? new Date(createdPlan.startDate).toLocaleDateString('ru-RU', { day: 'numeric', month: 'long' })
      : null
    const endDate = createdPlan?.endDate
      ? new Date(createdPlan.endDate).toLocaleDateString('ru-RU', { day: 'numeric', month: 'long' })
      : null
    const isMultiDay = createdPlan?.startDate !== createdPlan?.endDate

    return (
      <div className="flex flex-col min-h-[calc(100vh-80px)]">
        <PageHeader title="Нақшаи шумо" showBack showAiBadge />
        <div className="px-4 pt-2 pb-4 space-y-3">
          {createdPlan && (
            <>
              <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
                <h2 className="text-gray-900 font-bold text-lg mb-1">{createdPlan.title}</h2>
                {createdPlan.description && (
                  <p className="text-gray-500 text-sm mb-2">{createdPlan.description}</p>
                )}
                <div className="flex items-center gap-3 text-xs text-[#7B2FBE]">
                  <span>📋 {taskCount} вазифа</span>
                  {isMultiDay && startDate && endDate && (
                    <span>📅 {startDate} — {endDate}</span>
                  )}
                </div>
              </div>

              <h3 className="text-gray-600 text-sm font-medium">Вазифаҳо:</h3>
              {createdPlan.tasks.slice(0, 5).map((task, i) => (
                <TaskItem key={task.id} task={task} index={i} />
              ))}
              {taskCount > 5 && (
                <p className="text-gray-400 text-xs text-center py-2">
                  +{taskCount - 5} вазифаи дигар дар рӯзнома
                </p>
              )}

              <Button onClick={() => router.push('/schedule')} className="mt-4">
                Рӯзноманро бинед
              </Button>
              <Button variant="ghost" onClick={handleReset}>
                Нақшаи нав созед
              </Button>
            </>
          )}
        </div>
      </div>
    )
  }

  // STEP: done (fallback)
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-80px)] px-4">
      <div className="text-center space-y-4">
        <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto">
          <span className="text-4xl">✅</span>
        </div>
        <h2 className="text-2xl font-bold text-gray-900">Нақша сохта шуд!</h2>
        <p className="text-gray-500">Нақшаи шумо бо муваффақият сохта шуд.</p>
        <Button onClick={() => router.push('/schedule')}>
          Рӯзноманро бинед
        </Button>
        <Button variant="ghost" onClick={handleReset}>
          Нақшаи нав созед
        </Button>
      </div>
    </div>
  )
}
