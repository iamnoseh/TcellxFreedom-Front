'use client'

import { X, Check, Zap } from 'lucide-react'
import { useActivatePremium } from '@/lib/hooks/useTcellPass'

interface PremiumSheetProps {
  onClose: () => void
  onSuccess: () => void
}

const FREE_FEATURES = ['XP стандарт', '3 вазифа / рӯз', 'Free track', 'Чоизаҳои асосӣ']
const PREM_FEATURES = ['XP ×2 ҳамеша', '+2 вазифа / рӯз', 'XP 2 трек кушода', 'Чоизаҳои тиллоӣ']

export function PremiumSheet({ onClose, onSuccess }: PremiumSheetProps) {
  const { mutate: activate, isPending, error } = useActivatePremium()

  function handleActivate() {
    activate(undefined, {
      onSuccess: () => { onSuccess(); onClose() },
    })
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/70">
      <div className="bg-white rounded-t-3xl w-full max-w-[430px] p-6 pb-10 shadow-2xl">
        {/* Close */}
        <div className="flex justify-end mb-1">
          <button onClick={onClose} className="text-gray-400 hover:text-gray-700 p-1">
            <X size={20} />
          </button>
        </div>

        {/* Title */}
        <div className="text-center mb-5">
          <div className="text-3xl mb-1">⚡</div>
          <h2 className="text-gray-900 font-bold text-xl">Tcell Premium Pass</h2>
          <p className="text-gray-500 text-sm mt-1">XP мох → XP ×2 + чоизаҳои кодир</p>
        </div>

        {/* Comparison */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          {/* Free column */}
          <div className="bg-gray-50 rounded-2xl p-4 border border-gray-200">
            <p className="text-gray-500 text-xs font-semibold mb-3 uppercase tracking-wide">FREE</p>
            <div className="space-y-2.5">
              {FREE_FEATURES.map((f) => (
                <div key={f} className="flex items-center gap-2">
                  <Check size={12} className="text-gray-400 flex-shrink-0" />
                  <span className="text-gray-500 text-xs">{f}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Premium column */}
          <div className="bg-gradient-to-br from-orange-500/20 to-violet-500/20 rounded-2xl p-4 border border-orange-500/30">
            <p className="text-orange-400 text-xs font-semibold mb-3 uppercase tracking-wide flex items-center gap-1">
              <Zap size={11} /> PREMIUM
            </p>
            <div className="space-y-2.5">
              {PREM_FEATURES.map((f) => (
                <div key={f} className="flex items-center gap-2">
                  <Check size={12} className="text-orange-400 flex-shrink-0" />
                  <span className="text-white text-xs font-medium">{f}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Price */}
        <div className="text-center mb-4">
          <span className="text-gray-900 font-bold text-4xl">19</span>
          <span className="text-gray-500 text-lg"> с.</span>
          <span className="text-gray-400 text-sm"> / мох</span>
          <p className="text-gray-400 text-xs mt-1">ҳар вақт бекор кардан мумкин</p>
        </div>

        {error && (
          <p className="text-red-400 text-xs text-center mb-3">
            Балансатон кофӣ нест ё хатогӣ рӯй дод
          </p>
        )}

        {/* CTA */}
        <button
          onClick={handleActivate}
          disabled={isPending}
          className="w-full bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-400 hover:to-amber-400 text-white font-bold py-4 rounded-2xl transition-all active:scale-95 disabled:opacity-60 flex items-center justify-center gap-2"
        >
          {isPending ? (
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : (
            <>⚡ Premium фаъол кун</>
          )}
        </button>

        <button onClick={onClose} className="w-full text-gray-400 text-sm mt-3 py-2 hover:text-gray-600">
          Бадтар
        </button>
      </div>
    </div>
  )
}
