'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/Button'

interface Props {
  selectedDate: Date
  onClose: () => void
  onSubmit: (data: { title: string; scheduledAt: string; estimatedMinutes: number }) => void
  isLoading: boolean
}

export function AddTaskSheet({ selectedDate, onClose, onSubmit, isLoading }: Props) {
  const [title, setTitle] = useState('')
  const [hour, setHour] = useState(9)
  const [minute, setMinute] = useState(0)
  const [duration, setDuration] = useState('60')

  const handleSubmit = () => {
    if (!title.trim()) return
    const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone
    const h = Math.max(0, Math.min(23, hour))
    const m = Math.max(0, Math.min(59, minute))
    const dateStr = selectedDate.toLocaleDateString('en-CA')
    const localStr = `${dateStr}T${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:00`
    const localDate = new Date(localStr)
    const utcDate = new Date(localDate.toLocaleString('en-US', { timeZone: userTimeZone }))
    const diff = localDate.getTime() - utcDate.getTime()
    const utcTime = new Date(localDate.getTime() + diff)

    onSubmit({
      title: title.trim(),
      scheduledAt: utcTime.toISOString(),
      estimatedMinutes: Math.max(1, parseInt(duration) || 60),
    })
  }

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/60 z-40" onClick={onClose} />

      {/* Sheet — pb-[90px] to clear the bottom nav bar */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-[#120D2E] rounded-t-2xl px-5 pt-4 pb-[90px] space-y-4">
        <div className="w-10 h-1 bg-gray-600 rounded-full mx-auto" />
        <h3 className="text-white font-semibold text-lg">Вазифаи нав</h3>

        {/* Title */}
        <div>
          <label className="text-gray-400 text-xs mb-1 block">Унвон</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
            placeholder="Вазифаро нависед..."
            className="w-full bg-[#1A1035] text-white rounded-xl px-4 py-3 text-sm outline-none border border-[#2D1F5E] focus:border-violet-500"
            autoFocus
          />
        </div>

        {/* Time + Duration on one row */}
        <div className="flex gap-3">
          <div className="flex-1">
            <label className="text-gray-400 text-xs mb-1 block">Вақт</label>
            <div className="flex items-center gap-1.5">
              <input
                type="number"
                min={0}
                max={23}
                value={hour}
                onChange={(e) => setHour(parseInt(e.target.value) || 0)}
                className="w-14 bg-[#1A1035] text-white rounded-xl px-2 py-3 text-sm text-center outline-none border border-[#2D1F5E] focus:border-violet-500"
              />
              <span className="text-white font-bold text-lg">:</span>
              <input
                type="number"
                min={0}
                max={59}
                step={5}
                value={minute}
                onChange={(e) => setMinute(parseInt(e.target.value) || 0)}
                className="w-14 bg-[#1A1035] text-white rounded-xl px-2 py-3 text-sm text-center outline-none border border-[#2D1F5E] focus:border-violet-500"
              />
            </div>
          </div>

          <div className="flex-1">
            <label className="text-gray-400 text-xs mb-1 block">Давомнокӣ (дақ)</label>
            <input
              type="number"
              min={1}
              max={480}
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              placeholder="60"
              className="w-full bg-[#1A1035] text-white rounded-xl px-4 py-3 text-sm outline-none border border-[#2D1F5E] focus:border-violet-500"
            />
          </div>
        </div>

        <Button onClick={handleSubmit} loading={isLoading} disabled={!title.trim()}>
          Илова кун
        </Button>
      </div>
    </>
  )
}
