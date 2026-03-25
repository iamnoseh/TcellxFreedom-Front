export function ProgressBar({ value, max, className }: { value: number; max: number; className?: string }) {
  const pct = max > 0 ? (value / max) * 100 : 0
  return (
    <div className={`h-2 bg-gray-200 rounded-full overflow-hidden ${className ?? ''}`}>
      <div
        className="h-full bg-[#7B2FBE] rounded-full transition-all"
        style={{ width: `${pct}%` }}
      />
    </div>
  )
}
