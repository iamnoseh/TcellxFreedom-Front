'use client'

import { getNext7Days, isSameDay } from '@/lib/utils/date'
import { cn } from '@/lib/utils/cn'

const dayNames = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб']

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
                ? 'bg-[#7B2FBE] text-white shadow-sm'
                : 'bg-white text-gray-500 hover:bg-gray-50 shadow-sm'
            )}
          >
            <span className="text-xs font-medium">{dayNames[date.getDay()]}</span>
            <span className={cn('text-base font-bold', isToday && !isSelected && 'text-[#7B2FBE]')}>
              {date.getDate()}
            </span>
          </button>
        )
      })}
    </div>
  )
}
