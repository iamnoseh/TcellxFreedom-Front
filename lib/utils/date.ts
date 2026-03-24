export function formatTime(dateStr: string): string {
  return new Date(dateStr).toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })
}

export function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('tg-TJ', { weekday: 'long', day: 'numeric', month: 'long' })
}

export function isToday(dateStr: string): boolean {
  const d = new Date(dateStr)
  const t = new Date()
  return d.toDateString() === t.toDateString()
}

export function getNext7Days(): Date[] {
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date()
    d.setDate(d.getDate() + i)
    return d
  })
}

export function formatShortDate(date: Date): string {
  return date.toLocaleDateString('ru-RU', { day: 'numeric', month: 'short' })
}

export function isSameDay(date1: Date, date2: Date): boolean {
  return date1.toDateString() === date2.toDateString()
}
