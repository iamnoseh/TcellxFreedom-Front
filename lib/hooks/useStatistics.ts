import { useQuery } from '@tanstack/react-query'
import { getStatisticsApi } from '@/lib/api/statistics.api'

export function useStatistics(weekCount = 4) {
  return useQuery({
    queryKey: ['statistics', weekCount],
    queryFn: () => getStatisticsApi(weekCount),
    select: (data) => data.data,
  })
}
