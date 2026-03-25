'use client'

import Link from 'next/link'
import { Bell, Flame, ChevronRight, Sparkles, Calendar, BarChart2, Plus, Grid2x2, PieChart, Phone } from 'lucide-react'
import { useAuthStore } from '@/lib/store/auth.store'
import { usePlans, usePlan } from '@/lib/hooks/usePlans'
import { useMyPass } from '@/lib/hooks/useTcellPass'
import { FullPageSpinner } from '@/components/ui/Spinner'
import type { PlanDto } from '@/lib/types'

const LevelXpThresholds = [0,100,200,350,500,700,950,1250,1600,2000,2500,3100,3800,4600,5500,6500,7600,8800,10100,11500,13000]
const dotColors = ['bg-orange-500', 'bg-blue-500', 'bg-emerald-500', 'bg-purple-500', 'bg-pink-500']

function formatTaskDate(iso: string) {
  const d = new Date(iso)
  const now = new Date()
  const isToday = d.toDateString() === now.toDateString()
  const tomorrow = new Date(now); tomorrow.setDate(now.getDate() + 1)
  const isTomorrow = d.toDateString() === tomorrow.toDateString()
  if (isToday) return 'Имрӯз'
  if (isTomorrow) return 'Фардо'
  return d.toLocaleDateString('tg-TJ', { day: 'numeric', month: 'short' })
}

function formatTime(iso: string) {
  return new Date(iso).toLocaleTimeString('ru', { hour: '2-digit', minute: '2-digit' })
}

// Fixed-slot aggregator — hooks rules require fixed number of hook calls
function NearestTasksSection({ plans }: { plans: PlanDto[] }) {
  const { data: d0 } = usePlan(plans[0]?.id ?? '')
  const { data: d1 } = usePlan(plans[1]?.id ?? '')
  const { data: d2 } = usePlan(plans[2]?.id ?? '')

  const allTasks = [d0, d1, d2]
    .flatMap((d) => d?.tasks ?? [])
    .filter((t) => t.status !== 'Completed' && t.status !== 'Skipped')
    .sort((a, b) => new Date(a.scheduledAt).getTime() - new Date(b.scheduledAt).getTime())
    .slice(0, 5)

  if (allTasks.length === 0) {
    return <p className="text-gray-400 text-sm text-center py-4">Вазифаҳои наздик нест</p>
  }

  return (
    <div className="space-y-1">
      {allTasks.map((task, i) => (
        <div key={task.id} className="flex items-center gap-3 px-1 py-2.5 border-b border-gray-50 last:border-0">
          <div className={`w-2 h-2 rounded-full flex-shrink-0 ${dotColors[i % 5]}`} />
          <span className="text-gray-400 text-xs w-10 flex-shrink-0">{formatTime(task.scheduledAt)}</span>
          <span className="text-gray-800 text-sm flex-1 truncate">{task.title}</span>
          <span className="text-gray-400 text-xs flex-shrink-0">{formatTaskDate(task.scheduledAt)}</span>
        </div>
      ))}
    </div>
  )
}

export default function HomePage() {
  const user = useAuthStore((s) => s.user)
  const { data: plans = [], isLoading } = usePlans()
  const { data: pass } = useMyPass()

  if (isLoading) return <FullPageSpinner />

  const todayStr = new Date().toDateString()
  const todayPlans = plans.filter((p) => new Date(p.startDate).toDateString() === todayStr)
  const totalTasks = todayPlans.reduce((s, p) => s + p.totalTasks, 0)
  const completedTasks = todayPlans.reduce((s, p) => s + p.completedTasks, 0)
  const initials = user?.firstName ? user.firstName[0].toUpperCase() : 'У'

  const currentXp = pass?.totalXp ?? 0
  const level = pass?.currentLevel ?? 1
  const nextXp = LevelXpThresholds[level] ?? LevelXpThresholds[20]
  const prevXp = LevelXpThresholds[level - 1] ?? 0
  const xpProgress = nextXp > prevXp ? Math.round(((currentXp - prevXp) / (nextXp - prevXp)) * 100) : 100

  const balance = user?.balance ?? 0

  return (
    <div className="min-h-screen bg-[#F4F6FA]">

      {/* ── DARK HEADER (мисли Tcell) ── */}
      <div className="bg-gradient-to-b from-[#2D1060] to-[#1A0845] px-4 pt-5 pb-28">
        {/* Top row: avatar + greeting + XP + bell */}
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-full bg-white/20 flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
              {initials}
            </div>
            <div>
              <p className="text-white/60 text-xs">Рӯз хайр,</p>
              <p className="text-white font-bold text-base leading-tight">{user?.firstName ?? 'Корбар'}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Link href="/tcell-pass" className="flex items-center gap-1.5 bg-white/15 rounded-full px-3 py-1.5">
              <div className="w-5 h-5 bg-[#7B2FBE] rounded-full flex items-center justify-center">
                <span className="text-white text-[9px] font-bold">XP</span>
              </div>
              <span className="text-white font-bold text-sm">{currentXp}</span>
            </Link>
            <Link href="/notifications" className="w-9 h-9 bg-white/15 rounded-full flex items-center justify-center relative">
              <Bell size={18} className="text-white" />
            </Link>
          </div>
        </div>

        {/* Balance card (dark, swipeable style) */}
        <div className="bg-[#1A0845]/60 backdrop-blur rounded-3xl p-5 border border-white/10">
          <p className="text-white/50 text-xs mb-1">Баланс</p>
          <div className="flex items-center gap-2 mb-1">
            <p className="text-white font-bold text-3xl">{balance.toFixed(2)} смн</p>
            <button className="w-7 h-7 bg-white/20 rounded-full flex items-center justify-center ml-1">
              <Plus size={14} className="text-white" />
            </button>
          </div>
          {user?.phoneNumber && (
            <p className="text-white/40 text-sm mt-2">{user.phoneNumber}</p>
          )}
          {/* Slide dots */}
          <div className="flex gap-1.5 mt-3">
            <div className="w-5 h-1 bg-white/60 rounded-full" />
            <div className="w-2 h-1 bg-white/20 rounded-full" />
          </div>
        </div>
      </div>

      {/* ── WHITE CONTENT (overlaps dark header) ── */}
      <div className="px-4 -mt-20 space-y-3 pb-8">

        {/* Тарифи ман (demo) */}
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <div className="flex items-center justify-between mb-0.5">
            <p className="text-gray-900 font-bold text-base">Салом+ 130</p>
            <button className="flex items-center gap-0.5 text-gray-400 text-xs">
              Ҳама тарифҳо <ChevronRight size={14} />
            </button>
          </div>
          <p className="text-[#7B2FBE] text-xs mb-4">Пардохти моҳона: 01.04.2026</p>

          {/* MB / Minutes / SMS */}
          <div className="grid grid-cols-3 gap-2 mb-4">
            {[
              { label: 'МБ', value: '53 650', pct: 72 },
              { label: 'Дақиқа', value: '22', pct: 18 },
              { label: 'СМС', value: '79', pct: 85 },
            ].map(({ label, value, pct }) => (
              <div key={label} className="bg-gray-50 rounded-xl p-3">
                <p className="text-gray-400 text-[10px] mb-1">{label}</p>
                <p className="text-gray-900 font-bold text-base leading-none mb-3">{value}</p>
                <div className="h-1 bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-full bg-[#7B2FBE] rounded-full" style={{ width: `${pct}%` }} />
                </div>
              </div>
            ))}
          </div>

          {/* Хизматҳо / Харочот */}
          <div className="grid grid-cols-2 gap-2">
            <button className="flex items-center justify-center gap-2 bg-gray-50 rounded-xl py-2.5 text-gray-700 text-sm font-medium">
              <Grid2x2 size={15} className="text-gray-500" />
              Хизматҳо
            </button>
            <button className="flex items-center justify-center gap-2 bg-gray-50 rounded-xl py-2.5 text-gray-700 text-sm font-medium">
              <PieChart size={15} className="text-gray-500" />
              Харочот
            </button>
          </div>
        </div>

        {/* Тафсилот (demo) */}
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <p className="text-gray-900 font-semibold text-sm mb-0.5">Тафсилот</p>
          <p className="text-gray-400 text-xs mb-3">Рӯйхати тамоми зангҳои воридӣ ва содирӣ</p>
          <button className="w-10 h-10 bg-purple-50 rounded-xl flex items-center justify-center">
            <Phone size={18} className="text-[#7B2FBE]" />
          </button>
        </div>

        {/* TcellPass card (бунафш) */}
        <Link href="/tcell-pass" className="block bg-gradient-to-r from-[#7B2FBE] to-[#5B1FA0] rounded-2xl p-4 shadow-lg active:scale-[0.98] transition-transform">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                <Flame size={20} className="text-orange-300" />
              </div>
              <div>
                <p className="text-white font-bold text-sm">Tcell Pass</p>
                <p className="text-white/70 text-xs">
                  {pass?.tier === 'Premium' ? '⭐ Premium' : 'Free'} · Дараҷа {level}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {(pass?.currentStreakDays ?? 0) > 0 && (
                <div className="flex items-center gap-1 bg-orange-400/30 rounded-lg px-2 py-1">
                  <Flame size={11} className="text-orange-200" />
                  <span className="text-orange-200 text-xs font-bold">{pass!.currentStreakDays} рӯз</span>
                </div>
              )}
              <ChevronRight size={16} className="text-white/50" />
            </div>
          </div>
          <div>
            <div className="flex justify-between text-xs text-white/60 mb-1.5">
              <span>{currentXp} XP</span>
              <span>{nextXp} XP</span>
            </div>
            <div className="h-2 bg-white/20 rounded-full overflow-hidden">
              <div className="h-full bg-white rounded-full transition-all" style={{ width: `${Math.min(xpProgress, 100)}%` }} />
            </div>
          </div>
        </Link>

        {/* AI Planner card (сафед) */}
        <Link href="/ai-plan" className="block bg-white rounded-2xl p-4 shadow-sm active:scale-[0.98] transition-transform">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <Sparkles size={24} className="text-orange-500" />
              </div>
              <div>
                <p className="text-gray-900 font-bold text-sm">ИИ-Нақшасоз</p>
                <p className="text-gray-500 text-xs mt-0.5">Мақсадатро бигӯ — AI нақша месозад</p>
              </div>
            </div>
            <div className="bg-[#7B2FBE] rounded-xl px-3 py-2 flex-shrink-0">
              <span className="text-white text-xs font-bold">Созед →</span>
            </div>
          </div>
        </Link>

        {/* Нақшаи имрӯз + Омор  (мисли "Мои услуги" + "Расходы") */}
        <div className="grid grid-cols-2 gap-3">
          <Link href="/schedule" className="bg-white rounded-2xl p-4 shadow-sm flex items-center gap-3 active:scale-95 transition-transform">
            <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
              <Calendar size={20} className="text-blue-600" />
            </div>
            <div>
              <p className="text-gray-800 font-semibold text-sm">Рӯзнома</p>
              <p className="text-gray-400 text-xs">{totalTasks > 0 ? `${completedTasks}/${totalTasks}` : 'Холӣ'}</p>
            </div>
          </Link>
          <Link href="/statistics" className="bg-white rounded-2xl p-4 shadow-sm flex items-center gap-3 active:scale-95 transition-transform">
            <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center flex-shrink-0">
              <BarChart2 size={20} className="text-emerald-600" />
            </div>
            <div>
              <p className="text-gray-800 font-semibold text-sm">Омор</p>
              <p className="text-gray-400 text-xs">{plans.length} нақша</p>
            </div>
          </Link>
        </div>

        {/* Вазифаҳои наздик (мисли "Детализация") */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3 border-b border-gray-50">
            <div>
              <p className="text-gray-900 font-semibold text-sm">Вазифаҳои наздик</p>
              <p className="text-gray-400 text-xs">Рӯйхати вазифаҳои имрӯз</p>
            </div>
            <Link href="/schedule">
              <ChevronRight size={18} className="text-gray-400" />
            </Link>
          </div>
          <div className="px-4 py-2">
            <NearestTasksSection plans={plans} />
          </div>
        </div>

      </div>
    </div>
  )
}
