import { useQuery } from '@tanstack/react-query'
import { getUpcomingNotificationsApi } from '@/lib/api/notifications.api'

export function useNotifications() {
  return useQuery({
    queryKey: ['notifications'],
    queryFn: getUpcomingNotificationsApi,
    select: (data) => data.data,
  })
}
