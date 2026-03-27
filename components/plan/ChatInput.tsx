'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import { Mic, Send, Square, Play, Pause, Trash2, CheckCheck } from 'lucide-react'
import { cn } from '@/lib/utils/cn'

interface ChatInputProps {
  value: string
  onChange: (value: string) => void
  onSend: () => void
  disabled?: boolean
  placeholder?: string
}

type VoiceState = 'idle' | 'recording' | 'preview'

function useTimer(active: boolean) {
  const [seconds, setSeconds] = useState(0)
  useEffect(() => {
    if (!active) { setSeconds(0); return }
    const id = setInterval(() => setSeconds(s => s + 1), 1000)
    return () => clearInterval(id)
  }, [active])
  const mm = String(Math.floor(seconds / 60)).padStart(2, '0')
  const ss = String(seconds % 60).padStart(2, '0')
  return `${mm}:${ss}`
}

export function ChatInput({ value, onChange, onSend, disabled, placeholder }: ChatInputProps) {
  const [voiceState, setVoiceState] = useState<VoiceState>('idle')
  const [audioURL, setAudioURL] = useState<string | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [playProgress, setPlayProgress] = useState(0)

  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const chunksRef = useRef<Blob[]>([])
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const streamRef = useRef<MediaStream | null>(null)
  const animFrameRef = useRef<number>(0)

  const timer = useTimer(voiceState === 'recording')

  useEffect(() => {
    return () => {
      stopRecording()
      audioRef.current?.pause()
      if (audioURL) URL.revokeObjectURL(audioURL)
      cancelAnimationFrame(animFrameRef.current)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const stopRecording = useCallback(() => {
    mediaRecorderRef.current?.stop()
    streamRef.current?.getTracks().forEach(t => t.stop())
  }, [])

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      streamRef.current = stream
      chunksRef.current = []

      const mr = new MediaRecorder(stream)
      mr.ondataavailable = e => { if (e.data.size > 0) chunksRef.current.push(e.data) }
      mr.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: 'audio/webm' })
        const url = URL.createObjectURL(blob)
        setAudioURL(url)
        audioRef.current = new Audio(url)
        audioRef.current.onended = () => {
          setIsPlaying(false)
          setPlayProgress(0)
          cancelAnimationFrame(animFrameRef.current)
        }
        setVoiceState('preview')
      }

      mediaRecorderRef.current = mr
      mr.start()
      setVoiceState('recording')
    } catch {
      alert('Доступ к микрофону запрещён')
    }
  }

  const handleStopRecording = () => {
    stopRecording()
  }

  const handleCancelVoice = () => {
    stopRecording()
    audioRef.current?.pause()
    if (audioURL) URL.revokeObjectURL(audioURL)
    setAudioURL(null)
    setIsPlaying(false)
    setPlayProgress(0)
    setVoiceState('idle')
  }

  const handlePlayPause = () => {
    if (!audioRef.current) return
    if (isPlaying) {
      audioRef.current.pause()
      setIsPlaying(false)
      cancelAnimationFrame(animFrameRef.current)
    } else {
      audioRef.current.play()
      setIsPlaying(true)
      const tick = () => {
        const a = audioRef.current
        if (!a) return
        const prog = a.duration ? a.currentTime / a.duration : 0
        setPlayProgress(prog)
        if (!a.paused) animFrameRef.current = requestAnimationFrame(tick)
      }
      animFrameRef.current = requestAnimationFrame(tick)
    }
  }

  const handleUseVoice = () => {
    // voice sent — clear and go back to idle (could call onSend if needed)
    audioRef.current?.pause()
    if (audioURL) URL.revokeObjectURL(audioURL)
    setAudioURL(null)
    setIsPlaying(false)
    setPlayProgress(0)
    setVoiceState('idle')
    onSend()
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      if (value.trim()) onSend()
    }
  }

  const showSend = value.trim().length > 0

  // ── RECORDING STATE ──────────────────────────────────────────────
  if (voiceState === 'recording') {
    return (
      <div className="bg-white rounded-2xl border border-red-300 shadow-sm overflow-hidden">
        <div className="flex items-center gap-3 px-4 py-3">
          {/* animated dots */}
          <div className="flex gap-1 items-end h-6">
            {[0, 1, 2, 3, 4].map(i => (
              <span
                key={i}
                className="w-1 bg-red-400 rounded-full animate-bounce"
                style={{
                  height: `${10 + Math.random() * 14}px`,
                  animationDelay: `${i * 0.1}s`,
                  animationDuration: '0.6s',
                }}
              />
            ))}
          </div>
          <span className="text-sm text-red-500 font-mono font-medium flex-1">{timer}</span>
          <span className="text-xs text-gray-400">Идёт запись...</span>
        </div>
        <div className="flex border-t border-gray-100">
          <button
            onClick={handleCancelVoice}
            className="flex-1 py-3 text-sm text-gray-500 flex items-center justify-center gap-2 hover:bg-gray-50 active:bg-gray-100 transition-colors"
          >
            <Trash2 size={16} />
            Отмена
          </button>
          <div className="w-px bg-gray-100" />
          <button
            onClick={handleStopRecording}
            className="flex-1 py-3 text-sm text-red-500 font-medium flex items-center justify-center gap-2 hover:bg-red-50 active:bg-red-100 transition-colors"
          >
            <Square size={16} fill="currentColor" />
            Остановить
          </button>
        </div>
      </div>
    )
  }

  // ── PREVIEW STATE ────────────────────────────────────────────────
  if (voiceState === 'preview') {
    return (
      <div className="bg-white rounded-2xl border border-[#7B2FBE]/30 shadow-sm overflow-hidden">
        <div className="flex items-center gap-3 px-4 py-3">
          <button
            onClick={handlePlayPause}
            className="w-9 h-9 rounded-full bg-[#7B2FBE] text-white flex items-center justify-center flex-shrink-0 active:scale-95 transition-all"
          >
            {isPlaying ? <Pause size={16} fill="white" /> : <Play size={16} fill="white" />}
          </button>
          {/* progress bar */}
          <div className="flex-1 h-1.5 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-[#7B2FBE] rounded-full transition-none"
              style={{ width: `${playProgress * 100}%` }}
            />
          </div>
          <span className="text-xs text-gray-400 font-mono w-10 text-right">{timer}</span>
        </div>
        <div className="flex border-t border-gray-100">
          <button
            onClick={handleCancelVoice}
            className="flex-1 py-3 text-sm text-gray-500 flex items-center justify-center gap-2 hover:bg-gray-50 active:bg-gray-100 transition-colors"
          >
            <Trash2 size={16} />
            Удалить
          </button>
          <div className="w-px bg-gray-100" />
          <button
            onClick={handleUseVoice}
            className="flex-1 py-3 text-sm text-[#7B2FBE] font-medium flex items-center justify-center gap-2 hover:bg-purple-50 active:bg-purple-100 transition-colors"
          >
            <CheckCheck size={16} />
            Отправить
          </button>
        </div>
      </div>
    )
  }

  // ── IDLE STATE ───────────────────────────────────────────────────
  return (
    <div className={cn(
      'flex items-end gap-2 bg-white rounded-2xl p-3 border border-gray-200 shadow-sm'
    )}>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder ?? 'Напишите вашу цель...'}
        disabled={disabled}
        rows={3}
        className="flex-1 bg-transparent text-gray-900 placeholder-gray-400 resize-none outline-none text-sm leading-relaxed"
      />
      {showSend ? (
        <button
          onClick={onSend}
          disabled={disabled}
          className="p-2.5 rounded-xl bg-[#7B2FBE] text-white hover:bg-[#6A27A8] transition-all active:scale-95"
        >
          <Send size={18} />
        </button>
      ) : (
        <button
          onClick={startRecording}
          disabled={disabled}
          type="button"
          className={cn(
            'p-2.5 rounded-xl transition-all active:scale-95',
            disabled ? 'bg-gray-100 text-gray-300' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
          )}
        >
          <Mic size={18} />
        </button>
      )}
    </div>
  )
}
