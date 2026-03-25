import { Check } from 'lucide-react'

const MONTHS_TJ: Record<number, string> = {
  0: 'Январ', 1: 'Феврал', 2: 'Март', 3: 'Апрел',
  4: 'Май', 5: 'Июн', 6: 'Июл', 7: 'Август',
  8: 'Сентябр', 9: 'Октябр', 10: 'Ноябр', 11: 'Декабр',
}

interface QuestCalendarProps {
  currentDay: number      // today's day number (1-8 shown)
  totalDays?: number      // default 20
}

export function QuestCalendar({ currentDay, totalDays = 20 }: QuestCalendarProps) {
  const now = new Date()
  const monthName = MONTHS_TJ[now.getMonth()] ?? ''
  const year = now.getFullYear()

  const displayDays = Math.min(totalDays, 8)

  return (
    <div className="bg-white rounded-2xl p-4 mx-4 mb-3 shadow-sm">
      {/* Month header */}
      <div className="flex items-center gap-2 mb-3">
        <div className="w-8 h-8 bg-orange-100 rounded-xl flex items-center justify-center">
          <span className="text-lg">🌸</span>
        </div>
        <div>
          <p className="text-gray-800 font-semibold text-sm">Моҳи {monthName}</p>
          <p className="text-gray-400 text-xs">{monthName} {year}</p>
        </div>
      </div>

      {/* Day circles */}
      <div className="flex items-center gap-2 flex-wrap">
        {Array.from({ length: displayDays }, (_, i) => {
          const day = i + 1
          const isDone = day < currentDay
          const isToday = day === currentDay
          return (
            <div key={day} className="flex flex-col items-center gap-0.5">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                isDone
                  ? 'bg-[#7B2FBE] text-white'
                  : isToday
                  ? 'bg-purple-100 border-2 border-[#7B2FBE] text-[#7B2FBE]'
                  : 'bg-gray-100 text-gray-400'
              }`}>
                {isDone ? <Check size={14} strokeWidth={3} /> : day}
              </div>
            </div>
          )
        })}
        {totalDays > displayDays && (
          <span className="text-gray-500 text-xs ml-1">…</span>
        )}
      </div>
    </div>
  )
}
