'use client'

import { useRouter } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import { AiBadge } from '@/components/ui/Badge'

interface PageHeaderProps {
  title: string
  showBack?: boolean
  showAiBadge?: boolean
  subtitle?: string
}

export function PageHeader({ title, showBack, showAiBadge, subtitle }: PageHeaderProps) {
  const router = useRouter()

  return (
    <div className="px-4 pt-4 pb-2">
      <div className="flex items-center gap-3">
        {showBack && (
          <button
            onClick={() => router.back()}
            className="p-2 rounded-xl bg-[#1A1035] text-gray-300 hover:text-white transition-colors"
          >
            <ArrowLeft size={20} />
          </button>
        )}
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-white">{title}</h1>
            {showAiBadge && <AiBadge />}
          </div>
          {subtitle && <p className="text-sm text-gray-400 mt-0.5">{subtitle}</p>}
        </div>
      </div>
    </div>
  )
}
