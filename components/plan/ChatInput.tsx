'use client'

import { Send } from 'lucide-react'
import { cn } from '@/lib/utils/cn'

interface ChatInputProps {
  value: string
  onChange: (value: string) => void
  onSend: () => void
  disabled?: boolean
  placeholder?: string
}

export function ChatInput({ value, onChange, onSend, disabled, placeholder }: ChatInputProps) {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      if (value.trim()) onSend()
    }
  }

  return (
    <div className="flex items-end gap-2 bg-white rounded-2xl p-3 border border-gray-200 shadow-sm">
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder ?? 'Мақсадатро нависед...'}
        disabled={disabled}
        rows={3}
        className="flex-1 bg-transparent text-gray-900 placeholder-gray-400 resize-none outline-none text-sm leading-relaxed"
      />
      <button
        onClick={onSend}
        disabled={disabled || !value.trim()}
        className={cn(
          'p-2.5 rounded-xl transition-all active:scale-95',
          value.trim() && !disabled
            ? 'bg-[#7B2FBE] text-white hover:bg-[#6A27A8]'
            : 'bg-gray-100 text-gray-400'
        )}
      >
        <Send size={18} />
      </button>
    </div>
  )
}
