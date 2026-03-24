export function AiBadge() {
  return (
    <span className="text-xs bg-orange-500 text-white px-2 py-0.5 rounded-full font-medium">
      Toell AI
    </span>
  )
}

interface BadgeProps {
  children: React.ReactNode
  variant?: 'violet' | 'orange' | 'green' | 'gray'
}

export function Badge({ children, variant = 'violet' }: BadgeProps) {
  const styles = {
    violet: 'bg-violet-600/20 text-violet-400',
    orange: 'bg-orange-500/20 text-orange-400',
    green: 'bg-emerald-500/20 text-emerald-400',
    gray: 'bg-gray-700 text-gray-300',
  }

  return (
    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${styles[variant]}`}>
      {children}
    </span>
  )
}
