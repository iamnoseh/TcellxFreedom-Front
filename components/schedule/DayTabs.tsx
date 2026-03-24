'use client'

import { getNext7Days, isSameDay } from '@/lib/utils/date'
import { cn } from '@/lib/utils/cn'

const dayNames = ['Яш', 'Д', 'С', 'Ч', 'П', 'Ҷ', 'Ш']

interface DayTabsProps {
  selectedDate: Date
  onSelectDate: (date: Date) => void
}

export function DayTabs({ selectedDate, onSelectDate }: DayTabsProps) {
  const days = getNext7Days()

  return (
    <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-hide">
      {days.map((date) => {
        const isSelected = isSameDay(date, selectedDate)
        const isToday = isSameDay(date, new Date())
        return (
          <button
            key={date.toISOString()}
            onClick={() => onSelectDate(date)}
            className={cn(
              'flex flex-col items-center gap-1 px-3 py-2 rounded-xl flex-shrink-0 transition-all min-w-[48px]',
              isSelected
                ? 'bg-violet-600 text-white'
                : 'bg-[#1A1035] text-gray-400 hover:bg-[#231448]'
            )}
          >
            <span className="text-xs font-medium">{dayNames[date.getDay()]}</span>
            <span className={cn('text-base font-bold', isToday && !isSelected && 'text-violet-400')}>
              {date.getDate()}
            </span>
          </button>
        )
      })}
    </div>
  )
}
