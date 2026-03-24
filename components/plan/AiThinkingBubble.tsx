'use client'

const MESSAGES = [
  'Нақшаро тартиб медиҳам...',
  'Мавзӯҳоро интихоб мекунам...',
  'Вақтҳоро ҷобаҷо мекунам...',
  'Тайёр мешавам...',
]

export function AiThinkingBubble() {
  return (
    <div className="flex flex-col gap-3 animate-fade-in">
      {/* User message skeleton */}
      <div className="flex justify-end">
        <div className="bg-violet-600/30 rounded-2xl rounded-br-sm px-4 py-3 max-w-[80%]">
          <div className="h-3 w-40 bg-violet-400/30 rounded-full animate-pulse" />
          <div className="h-3 w-24 bg-violet-400/20 rounded-full animate-pulse mt-2" />
        </div>
      </div>

      {/* AI thinking bubble */}
      <div className="flex items-end gap-2 max-w-[85%]">
        <div className="w-8 h-8 rounded-full bg-violet-700 flex items-center justify-center flex-shrink-0 mb-1">
          <span className="text-xs">AI</span>
        </div>
        <div className="bg-[#231448] rounded-2xl rounded-tl-sm p-4 flex-1">
          {/* Animated dots */}
          <div className="flex items-center gap-1.5 mb-2">
            <span
              className="w-2 h-2 rounded-full bg-violet-400 animate-bounce"
              style={{ animationDelay: '0ms' }}
            />
            <span
              className="w-2 h-2 rounded-full bg-violet-400 animate-bounce"
              style={{ animationDelay: '150ms' }}
            />
            <span
              className="w-2 h-2 rounded-full bg-violet-400 animate-bounce"
              style={{ animationDelay: '300ms' }}
            />
          </div>

          {/* Cycling status text */}
          <RotatingText messages={MESSAGES} />
          <span className="text-xs text-violet-500 mt-2 block">Toell AI</span>
        </div>
      </div>

      {/* Skeleton lines suggesting tasks being built */}
      <div className="space-y-2 px-1">
        {[80, 60, 72, 55].map((w, i) => (
          <div
            key={i}
            className="h-3 bg-white/5 rounded-full animate-pulse"
            style={{ width: `${w}%`, animationDelay: `${i * 120}ms` }}
          />
        ))}
      </div>
    </div>
  )
}

function RotatingText({ messages }: { messages: string[] }) {
  // CSS animation cycles through messages using keyframe opacity trick
  return (
    <div className="relative h-4 overflow-hidden">
      {messages.map((msg, i) => (
        <span
          key={msg}
          className="absolute inset-0 text-xs text-gray-400 flex items-center"
          style={{
            animation: `rotateMsg ${messages.length * 1.8}s ease-in-out ${i * 1.8}s infinite`,
            opacity: i === 0 ? 1 : 0,
          }}
        >
          {msg}
        </span>
      ))}
      <style>{`
        @keyframes rotateMsg {
          0%   { opacity: 0; transform: translateY(4px); }
          8%   { opacity: 1; transform: translateY(0); }
          85%  { opacity: 1; transform: translateY(0); }
          100% { opacity: 0; transform: translateY(-4px); }
        }
      `}</style>
    </div>
  )
}
