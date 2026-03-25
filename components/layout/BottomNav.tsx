'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, Sparkles, Calendar, Flame, Bell } from 'lucide-react'
import { cn } from '@/lib/utils/cn'

const tabs = [
  { href: '/', icon: Home, label: 'Хона', exact: true },
  { href: '/ai-plan', icon: Sparkles, label: 'ИИ-Нақша', exact: false },
  { href: '/tcell-pass', icon: Flame, label: 'Пасс', exact: false },
  { href: '/schedule', icon: Calendar, label: 'Рӯзнома', exact: false },
  { href: '/notifications', icon: Bell, label: 'Хабарҳо', exact: false },
]

export function BottomNav() {
  const pathname = usePathname()

  return (
    <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] bg-white border-t border-gray-100 z-50 shadow-[0_-4px_16px_rgba(0,0,0,0.06)]">
      <div className="flex items-center justify-around pt-2 pb-safe px-1" style={{ paddingBottom: 'max(12px, env(safe-area-inset-bottom))' }}>
        {tabs.map(({ href, icon: Icon, label, exact }) => {
          const isActive = exact ? pathname === href : pathname.startsWith(href)
          return (
            <Link
              key={href}
              href={href}
              className="flex flex-col items-center gap-0.5 px-2 py-1 min-w-0 flex-1 relative"
            >
              <div className={cn(
                'w-10 h-8 rounded-xl flex items-center justify-center transition-all',
                isActive ? 'bg-purple-100' : ''
              )}>
                <Icon
                  size={22}
                  strokeWidth={isActive ? 2.5 : 1.8}
                  className={cn(isActive ? 'text-[#7B2FBE]' : 'text-gray-400')}
                />
              </div>
              <span className={cn(
                'text-[10px] truncate transition-colors',
                isActive ? 'text-[#7B2FBE] font-semibold' : 'text-gray-400 font-medium'
              )}>
                {label}
              </span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
