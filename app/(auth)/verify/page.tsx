'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/Button'
import { verifyOtpApi } from '@/lib/api/auth.api'
import { useAuthStore } from '@/lib/store/auth.store'

export default function VerifyPage() {
  const router = useRouter()
  const setAuth = useAuthStore((s) => s.setAuth)
  const [otp, setOtp] = useState('')
  const [phone, setPhone] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const stored = sessionStorage.getItem('phone')
    if (!stored) {
      router.replace('/login')
    } else {
      setPhone(stored)
    }
  }, [router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (otp.length < 4 || otp.length > 6) return
    setError(null)
    setLoading(true)
    try {
      const res = await verifyOtpApi({ phoneNumber: phone, otpCode: otp })
      setAuth(res.token, res.user)
      sessionStorage.removeItem('phone')
      router.replace('/')
    } catch (err: unknown) {
      const e = err as { response?: { data?: { message?: string } } }
      setError(e?.response?.data?.message ?? 'Хатогӣ рӯй дод. Дубора кӯшиш кунед.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col justify-center px-4 bg-[#0D0920]">
      <div className="mb-10 text-center">
        <div className="w-16 h-16 rounded-2xl bg-violet-600 flex items-center justify-center mx-auto mb-4">
          <span className="text-2xl">🔐</span>
        </div>
        <h1 className="text-3xl font-bold text-white mb-2">Рамзро ворид кун</h1>
        <p className="text-gray-400">
          Рамзи тасдиқ ба рақами
        </p>
        <p className="text-violet-300 font-medium mt-1">{phone}</p>
        <p className="text-gray-400">фиристода шуд</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm text-gray-400 mb-2">Рамзи тасдиқ</label>
          <input
            type="text"
            value={otp}
            onChange={(e) => {
              const v = e.target.value.replace(/\D/g, '').slice(0, 4)
              setOtp(v)
            }}
            placeholder="XXXX"
            maxLength={4}
            inputMode="numeric"
            className="w-full px-4 py-4 bg-[#1A1035] border border-white/10 rounded-xl text-white text-center text-2xl font-bold tracking-[0.5em] placeholder-gray-700 outline-none focus:border-violet-500 transition-colors"
          />
        </div>

        {error && (
          <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm">
            {error}
          </div>
        )}

        <Button type="submit" loading={loading} disabled={otp.length < 4}>
          Тасдиқ кун
        </Button>

        <button
          type="button"
          onClick={() => router.push('/login')}
          className="w-full text-center text-violet-400 text-sm py-2"
        >
          Рақамро тағйир деҳ
        </button>
      </form>
    </div>
  )
}
