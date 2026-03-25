'use client'

import Link from 'next/link'
import { Sparkles, Calendar, BarChart2, Bell } from 'lucide-react'

const actions = [
  { href: '/ai-plan', icon: Sparkles, label: 'ИИ-Нақша', color: 'text-[#7B2FBE]', bg: 'bg-purple-100' },
  { href: '/schedule', icon: Calendar, label: 'Рӯзнома', color: 'text-blue-600', bg: 'bg-blue-100' },
  { href: '/statistics', icon: BarChart2, label: 'Омор', color: 'text-emerald-600', bg: 'bg-emerald-100' },
  { href: '/notifications', icon: Bell, label: 'Хабарҳо', color: 'text-orange-600', bg: 'bg-orange-100' },
]

export function QuickActions() {
  return (
    <div className="grid grid-cols-2 gap-3">
      {actions.map(({ href, icon: Icon, label, color, bg }) => (
        <Link
          key={href}
          href={href}
          className="flex flex-col items-center gap-2 p-4 rounded-2xl bg-white shadow-sm hover:shadow-md transition-shadow active:scale-95"
        >
          <div className={`p-3 rounded-xl ${bg}`}>
            <Icon size={22} className={color} />
          </div>
          <span className="text-sm font-semibold text-gray-700">{label}</span>
        </Link>
      ))}
    </div>
  )
}
