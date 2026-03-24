import { Card } from '@/components/ui/Card'
import { cn } from '@/lib/utils/cn'

interface StatCardProps {
  label: string
  value: string | number
  sub?: string
  color?: 'violet' | 'orange' | 'green' | 'blue'
}

const colorMap = {
  violet: 'text-violet-400',
  orange: 'text-orange-400',
  green: 'text-emerald-400',
  blue: 'text-blue-400',
}

export function StatCard({ label, value, sub, color = 'violet' }: StatCardProps) {
  return (
    <Card variant="elevated" className="flex flex-col gap-1">
      <span className="text-gray-400 text-xs">{label}</span>
      <span className={cn('text-2xl font-bold', colorMap[color])}>{value}</span>
      {sub && <span className="text-gray-500 text-xs">{sub}</span>}
    </Card>
  )
}
