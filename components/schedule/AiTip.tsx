interface AiTipProps {
  tip: string
}

export function AiTip({ tip }: AiTipProps) {
  return (
    <div className="flex gap-3 p-4 rounded-2xl bg-orange-50 border border-orange-200">
      <span className="text-xl flex-shrink-0">💡</span>
      <p className="text-sm text-orange-700 leading-relaxed">{tip}</p>
    </div>
  )
}
