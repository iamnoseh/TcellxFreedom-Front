'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { BottomNav } from '@/components/layout/BottomNav'
import { useAuthStore } from '@/lib/store/auth.store'

export default function MainLayout({ children }: { children: React.ReactNode }) {
  const token = useAuthStore((s) => s.token)
  const hasHydrated = useAuthStore((s) => s._hasHydrated)
  const router = useRouter()

  useEffect(() => {
    if (hasHydrated && !token) {
      router.replace('/login')
    }
  }, [token, hasHydrated, router])

  if (!hasHydrated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0D0920]">
        <div className="w-8 h-8 border-2 border-violet-500 border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  if (!token) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0D0920]">
        <div className="w-8 h-8 border-2 border-violet-500 border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#0D0920]">
      <main className="pb-20">{children}</main>
      <BottomNav />
    </div>
  )
}
