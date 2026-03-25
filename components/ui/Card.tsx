import { cn } from '@/lib/utils/cn'

interface CardProps {
  children: React.ReactNode
  className?: string
  variant?: 'default' | 'elevated'
}

export function Card({ children, className, variant = 'default' }: CardProps) {
  return (
    <div
      className={cn(
        'rounded-2xl p-4',
        variant === 'default' && 'bg-white shadow-sm',
        variant === 'elevated' && 'bg-white shadow-md',
        className
      )}
    >
      {children}
    </div>
  )
}
