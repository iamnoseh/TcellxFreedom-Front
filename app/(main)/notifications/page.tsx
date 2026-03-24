'use client'

import { PageHeader } from '@/components/layout/PageHeader'
import { FullPageSpinner } from '@/components/ui/Spinner'
import { Card } from '@/components/ui/Card'
import { Bell } from 'lucide-react'
import { useNotifications } from '@/lib/hooks/useNotifications'
import { formatTime, formatDate } from '@/lib/utils/date'

const statusColors: Record<string, string> = {
  Pending: 'text-yellow-400',
  Sent: 'text-emerald-400',
  Failed: 'text-red-400',
}

const statusLabels: Record<string, string> = {
  Pending: 'Интизор',
  Sent: 'Фиристода шуд',
  Failed: 'Хатогӣ',
}

export default function NotificationsPage() {
  const { data: notifications = [], isLoading, error } = useNotifications()

  return (
    <div className="flex flex-col min-h-[calc(100vh-80px)]">
      <PageHeader title="Хабарҳо" />

      <div className="px-4 space-y-3">
        {isLoading ? (
          <FullPageSpinner />
        ) : error ? (
          <div className="text-red-400 text-center py-8">Хабарҳо бор нашуданд</div>
        ) : notifications.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 gap-3">
            <div className="w-16 h-16 rounded-2xl bg-[#1A1035] flex items-center justify-center">
              <Bell size={28} className="text-gray-500" />
            </div>
            <p className="text-gray-400 text-center">Хабар нест</p>
          </div>
        ) : (
          notifications.map((notif) => (
            <Card key={notif.id} variant="default" className="flex gap-3">
              <div className="w-10 h-10 rounded-xl bg-violet-500/10 flex items-center justify-center flex-shrink-0">
                <Bell size={18} className="text-violet-400" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="text-white text-sm font-medium leading-tight">
                    {notif.notificationTitle}
                  </h3>
                  <span className={`text-xs flex-shrink-0 ${statusColors[notif.status] ?? 'text-gray-400'}`}>
                    {statusLabels[notif.status] ?? notif.status}
                  </span>
                </div>
                <p className="text-gray-400 text-xs mt-1 leading-relaxed line-clamp-2">
                  {notif.notificationBody}
                </p>
                <div className="flex items-center gap-3 mt-2">
                  <span className="text-gray-500 text-xs">{notif.taskTitle}</span>
                  <span className="text-gray-600 text-xs">•</span>
                  <span className="text-gray-500 text-xs">{formatTime(notif.scheduledAt)}</span>
                </div>
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}
