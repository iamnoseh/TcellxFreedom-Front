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
        variant === 'primary' && 'bg-[#7B2FBE] text-white hover:bg-[#6A27A8] shadow-sm',
        variant === 'secondary' && 'bg-gray-100 text-gray-800 hover:bg-gray-200',
        variant === 'ghost' && 'text-[#7B2FBE] bg-transparent hover:bg-purple-50',
        className
      )}
      disabled={loading || props.disabled}
      {...props}
    >
      {loading ? '...' : children}
    </button>
  )
}
