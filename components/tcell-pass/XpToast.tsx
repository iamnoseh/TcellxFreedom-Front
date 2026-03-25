'use client'

import { useEffect, useState } from 'react'

interface XpToastProps {
  xp: number
  bonusXp?: number
  leveledUp?: boolean
  newLevel?: number
  onClose: () => void
}

export function XpToast({ xp, bonusXp = 0, leveledUp = false, newLevel, onClose }: XpToastProps) {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const t = setTimeout(() => {
      setVisible(false)
      setTimeout(onClose, 300)
    }, 3000)
    return () => clearTimeout(t)
  }, [onClose])

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center bg-black/60 transition-opacity duration-300 ${visible ? 'opacity-100' : 'opacity-0'}`}>
      <div className="bg-white rounded-3xl p-8 mx-6 text-center shadow-2xl border border-gray-100 animate-scale-in">
        <div className="text-5xl mb-4">🎉</div>

        <p className="text-gray-900 font-bold text-3xl mb-1">
          +{xp + bonusXp} XP гирифтед!
        </p>

        {bonusXp > 0 && (
          <p className="text-[#7B2FBE] text-sm mb-1">
            Вазифа: +{xp} XP &nbsp;|&nbsp; Стрик бонус: +{bonusXp} XP
          </p>
        )}

        {leveledUp && newLevel && (
          <div className="mt-3 bg-purple-50 rounded-xl px-4 py-2 border border-purple-200">
            <p className="text-[#7B2FBE] font-bold text-lg">🏆 Дараҷаи {newLevel}!</p>
          </div>
        )}

        <p className="text-gray-400 text-xs mt-4">Тавсифро худкор мебандад…</p>

        <button
          onClick={() => { setVisible(false); onClose() }}
          className="mt-5 w-full bg-[#7B2FBE] hover:bg-[#6A27A8] text-white font-semibold py-3 rounded-2xl transition-colors active:scale-95"
        >
          Чоизаҳоро бубин →
        </button>
      </div>
    </div>
  )
}
