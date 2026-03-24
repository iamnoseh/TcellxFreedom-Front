import { cn } from '@/lib/utils/cn'

export function Spinner({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        'inline-block w-6 h-6 border-2 border-violet-500 border-t-transparent rounded-full animate-spin',
        className
      )}
    />
  )
}

export function FullPageSpinner() {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <Spinner className="w-10 h-10" />
    </div>
  )
}
