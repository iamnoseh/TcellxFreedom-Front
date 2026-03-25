import { Flame } from 'lucide-react'
import type { UserTcellPassDto } from '@/lib/types'

interface PassHeaderProps {
  pass: UserTcellPassDto
}

const LEVEL_XP = [0, 100, 200, 350, 500, 700, 950, 1250, 1600, 2000, 2500, 3100, 3800, 4600, 5500, 6500, 7600, 8800, 10100, 11500, 13000]

export function PassHeader({ pass }: PassHeaderProps) {
  const levelStartXp = LEVEL_XP[pass.currentLevel - 1] ?? 0
  const levelEndXp = LEVEL_XP[pass.currentLevel] ?? LEVEL_XP[20]
  const levelRange = levelEndXp - levelStartXp
  const progressXp = pass.totalXp - levelStartXp
  const pct = Math.min(100, levelRange > 0 ? (progressXp / levelRange) * 100 : 100)

  return (
    <div className="px-4 pt-5 pb-4 bg-gradient-to-br from-[#7B2FBE] to-[#4A1A8C]">
      {/* Row: title + XP + tier */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Flame size={20} className="text-orange-300" />
          <span className="text-white font-bold text-lg">Tcell Pass</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 bg-white/20 rounded-full px-2.5 py-1">
            <span className="text-white text-xs font-bold">⚡ {pass.totalXp} XP</span>
          </div>
          <div className={`rounded-full px-3 py-1 border text-xs font-bold ${
            pass.tier === 'Premium'
              ? 'border-orange-300 text-orange-300 bg-orange-400/20'
              : 'border-white/40 text-white/80 bg-white/10'
          }`}>
            {pass.tier === 'Premium' ? '⭐ PREMIUM' : 'FREE'}
          </div>
        </div>
      </div>

      {/* Level + progress */}
      <div className="flex items-center justify-between mb-1.5">
        <span className="text-white/80 text-sm">Дараҷа {pass.currentLevel}</span>
        <span className="text-white/70 text-sm">
          {pass.totalXp} / {levelEndXp} XP
        </span>
      </div>
      <div className="h-2.5 bg-white/20 rounded-full overflow-hidden">
        <div
          className="h-full bg-white rounded-full transition-all duration-500"
          style={{ width: `${pct}%` }}
        />
      </div>

      {/* Streak */}
      {pass.currentStreakDays > 0 && (
        <div className="flex items-center gap-1.5 mt-3">
          <Flame size={15} className="text-orange-300" />
          <span className="text-orange-200 text-sm font-semibold">
            Streak {pass.currentStreakDays} рӯз
          </span>
        </div>
      )}
    </div>
  )
}
