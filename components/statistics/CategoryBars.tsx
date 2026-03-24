import { ProgressBar } from '@/components/ui/ProgressBar'

interface CategoryData {
  label: string
  value: number
  max: number
  color?: string
}

interface CategoryBarsProps {
  categories: CategoryData[]
}

export function CategoryBars({ categories }: CategoryBarsProps) {
  return (
    <div className="space-y-4">
      {categories.map((cat) => (
        <div key={cat.label}>
          <div className="flex justify-between items-center mb-1.5">
            <span className="text-sm text-gray-300">{cat.label}</span>
            <span className="text-xs text-gray-500">
              {cat.value}/{cat.max}
            </span>
          </div>
          <ProgressBar value={cat.value} max={cat.max} />
        </div>
      ))}
    </div>
  )
}
