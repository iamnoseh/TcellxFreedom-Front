'use client'

import { useState } from 'react'
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
    <div className="flex items-end gap-2 bg-[#1A1035] rounded-2xl p-3 border border-white/10">
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder ?? 'Мақсадатро нависед...'}
        disabled={disabled}
        rows={3}
        className="flex-1 bg-transparent text-white placeholder-gray-500 resize-none outline-none text-sm leading-relaxed"
      />
      <button
        onClick={onSend}
        disabled={disabled || !value.trim()}
        className={cn(
          'p-2.5 rounded-xl transition-all active:scale-95',
          value.trim() && !disabled
            ? 'bg-violet-600 text-white hover:bg-violet-500'
            : 'bg-[#231448] text-gray-500'
        )}
      >
        <Send size={18} />
      </button>
    </div>
  )
}
