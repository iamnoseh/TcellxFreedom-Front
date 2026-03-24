'use client'

import { cn } from '@/lib/utils/cn'

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary' | 'ghost'
  loading?: boolean
}

export function Button({ variant = 'primary', loading, children, className, ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        'w-full py-3 px-4 rounded-xl font-medium transition-all active:scale-95',
        variant === 'primary' && 'bg-violet-600 text-white hover:bg-violet-500',
        variant === 'secondary' && 'bg-[#231448] text-white',
        variant === 'ghost' && 'text-violet-400 bg-transparent',
        className
      )}
      disabled={loading || props.disabled}
      {...props}
    >
      {loading ? '...' : children}
    </button>
  )
}
