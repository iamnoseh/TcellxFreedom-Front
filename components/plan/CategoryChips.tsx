'use client'

import { cn } from '@/lib/utils/cn'

const categories = [
  { label: '💻 Омӯзиши Python', prompt: 'Ман мехоҳам Python омӯзам, соати 22:00–23:30' },
  { label: '🌍 Забони Англисӣ', prompt: 'Ман мехоҳам забони Англисиро омӯзам, соати 19:00–20:00' },
  { label: '🏋️ Варзиш ва камвазнӣ', prompt: 'Мехоҳам 5кг вазн кам кунам, нақшаи варзиш ва хӯрок лозим аст' },
  { label: '📱 Flutter / Dart', prompt: 'Ман мехоҳам Flutter ва Dart омӯзам, соати 20:00–21:30' },
  { label: '📊 Бизнес', prompt: 'Барои оғоз кардани бизнеси хурд нақша тартиб деҳ' },
  { label: '📚 Омодагӣ ба имтиҳон', prompt: 'Ба имтиҳони муҳим омода шавам, соати 15:00–17:00' },
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
            'border-violet-500/40 text-violet-300 bg-violet-500/10 hover:bg-violet-500/20'
          )}
        >
          {cat.label}
        </button>
      ))}
    </div>
  )
}
