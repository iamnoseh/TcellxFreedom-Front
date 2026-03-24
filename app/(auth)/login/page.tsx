'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button } from '@/components/ui/Button'
import { loginApi } from '@/lib/api/auth.api'

const schema = z.object({
  phone: z
    .string()
    .min(9, 'Рақами телефон нодуруст аст')
    .regex(/^[0-9]+$/, 'Танҳо рақам'),
})

type FormData = z.infer<typeof schema>

export default function LoginPage() {
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  const onSubmit = async (data: FormData) => {
    setError(null)
    try {
      const phoneNumber = '+992' + data.phone
      await loginApi({ phoneNumber })
      sessionStorage.setItem('phone', phoneNumber)
      router.push('/verify')
    } catch (err: unknown) {
      const e = err as { response?: { data?: { message?: string } } }
      setError(e?.response?.data?.message ?? 'Хатогӣ рӯй дод. Дубора кӯшиш кунед.')
    }
  }

  return (
    <div className="min-h-screen flex flex-col justify-center px-4 bg-[#0D0920]">
      <div className="mb-10 text-center">
        <div className="w-16 h-16 rounded-2xl bg-violet-600 flex items-center justify-center mx-auto mb-4">
          <span className="text-2xl font-bold text-white">T</span>
        </div>
        <h1 className="text-3xl font-bold text-white mb-2">Хуш омадед</h1>
        <p className="text-gray-400">Рақами телефони худро ворид кунед</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm text-gray-400 mb-2">Рақами телефон</label>
          <div className="flex items-center bg-[#1A1035] border border-white/10 rounded-xl overflow-hidden focus-within:border-violet-500 transition-colors">
            <span className="px-4 py-3 text-gray-300 font-medium border-r border-white/10 bg-[#231448] flex-shrink-0">
              +992
            </span>
            <input
              {...register('phone')}
              type="tel"
              placeholder="XX XXX XX XX"
              className="flex-1 px-4 py-3 bg-transparent text-white placeholder-gray-600 outline-none"
              inputMode="numeric"
            />
          </div>
          {errors.phone && (
            <p className="text-red-400 text-xs mt-1">{errors.phone.message}</p>
          )}
        </div>

        {error && (
          <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm">
            {error}
          </div>
        )}

        <Button type="submit" loading={isSubmitting}>
          Идома
        </Button>
      </form>
    </div>
  )
}
