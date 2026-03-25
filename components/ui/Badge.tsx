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
    violet: 'bg-purple-100 text-[#7B2FBE]',
    orange: 'bg-orange-100 text-orange-600',
    green: 'bg-emerald-100 text-emerald-600',
    gray: 'bg-gray-100 text-gray-600',
  }

  return (
    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${styles[variant]}`}>
      {children}
    </span>
  )
}
