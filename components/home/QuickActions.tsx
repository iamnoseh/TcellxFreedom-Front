'use client'

import Link from 'next/link'
import { Sparkles, Calendar, BarChart2, Bell } from 'lucide-react'

const actions = [
  { href: '/ai-plan', icon: Sparkles, label: 'Нақшаи нав', color: 'text-violet-400', bg: 'bg-violet-500/10' },
  { href: '/schedule', icon: Calendar, label: 'Расписание', color: 'text-blue-400', bg: 'bg-blue-500/10' },
  { href: '/statistics', icon: BarChart2, label: 'Омор', color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
  { href: '/notifications', icon: Bell, label: 'Хабарҳо', color: 'text-orange-400', bg: 'bg-orange-500/10' },
]

export function QuickActions() {
  return (
    <div className="grid grid-cols-2 gap-3">
      {actions.map(({ href, icon: Icon, label, color, bg }) => (
        <Link
          key={href}
          href={href}
          className="flex flex-col items-center gap-2 p-4 rounded-2xl bg-[#1A1035] hover:bg-[#231448] transition-colors active:scale-95"
        >
          <div className={`p-3 rounded-xl ${bg}`}>
            <Icon size={22} className={color} />
          </div>
          <span className="text-sm font-medium text-gray-200">{label}</span>
        </Link>
      ))}
    </div>
  )
}
