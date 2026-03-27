'use client'

import { cn } from '@/lib/utils/cn'

const categories = [
  { label: '💻 Изучение Python', prompt: 'Хочу изучить Python, время 22:00–23:30' },
  { label: '🌍 Английский язык', prompt: 'Хочу изучить английский язык, время 19:00–20:00' },
  { label: '🏋️ Спорт и похудение', prompt: 'Хочу похудеть на 5кг, нужен план тренировок и питания' },
  { label: '📱 Flutter / Dart', prompt: 'Хочу изучить Flutter и Dart, время 20:00–21:30' },
  { label: '📊 Бизнес', prompt: 'Составь план для открытия малого бизнеса' },
  { label: '📚 Подготовка к экзамену', prompt: 'Подготовиться к важному экзамену, время 15:00–17:00' },
]

interface CategoryChipsProps {
  onSelect: (prompt: string) => void
}

export function CategoryChips({ onSelect }: CategoryChipsProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {categories.map((cat) => (
        <button
          key={cat.label}
          onClick={() => onSelect(cat.prompt)}
          className={cn(
            'px-3 py-1.5 rounded-full text-sm font-medium border transition-all active:scale-95',
            'border-purple-200 text-[#7B2FBE] bg-purple-50 hover:bg-purple-100'
          )}
        >
          {cat.label}
        </button>
      ))}
    </div>
  )
}
