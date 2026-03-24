export function ProgressBar({ value, max, className }: { value: number; max: number; className?: string }) {
  const pct = max > 0 ? (value / max) * 100 : 0
  return (
    <div className={`h-2 bg-[#231448] rounded-full overflow-hidden ${className ?? ''}`}>
      <div
        className="h-full bg-violet-500 rounded-full transition-all"
        style={{ width: `${pct}%` }}
      />
    </div>
  )
}
