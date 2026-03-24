'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, Sparkles, Calendar, BarChart2, Bell } from 'lucide-react'
import { cn } from '@/lib/utils/cn'

const tabs = [
  { href: '/', icon: Home, label: 'Хона' },
  { href: '/ai-plan', icon: Sparkles, label: 'ИИ-Нақша' },
  { href: '/schedule', icon: Calendar, label: 'Рӯзнома' },
  { href: '/statistics', icon: BarChart2, label: 'Омор' },
  { href: '/notifications', icon: Bell, label: 'Хабарҳо' },
]

export function BottomNav() {
  const pathname = usePathname()

  return (
    <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] bg-[#1A1035] border-t border-white/10 z-50">
      <div className="flex items-center justify-around py-2 px-1">
        {tabs.map(({ href, icon: Icon, label }) => {
          const isActive = pathname === href
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                'flex flex-col items-center gap-0.5 px-2 py-1 rounded-xl transition-colors min-w-0 flex-1',
                isActive ? 'text-violet-400' : 'text-gray-500 hover:text-gray-300'
              )}
            >
              <Icon size={22} />
              <span className="text-[10px] font-medium truncate">{label}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
