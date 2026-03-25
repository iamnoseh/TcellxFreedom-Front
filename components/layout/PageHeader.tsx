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
    <div className="px-4 pt-4 pb-2 bg-white border-b border-gray-100">
      <div className="flex items-center gap-3">
        {showBack && (
          <button
            onClick={() => router.back()}
            className="p-2 rounded-xl bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors"
          >
            <ArrowLeft size={20} />
          </button>
        )}
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-gray-900">{title}</h1>
            {showAiBadge && <AiBadge />}
          </div>
          {subtitle && <p className="text-sm text-gray-500 mt-0.5">{subtitle}</p>}
        </div>
      </div>
    </div>
  )
}
