import { useQuery } from '@tanstack/react-query'
import { getMeApi } from '@/lib/api/user.api'
import { useAuthStore } from '@/lib/store/auth.store'

export function useMe() {
  const token = useAuthStore((s) => s.token)
  return useQuery({
    queryKey: ['me'],
    queryFn: getMeApi,
    enabled: !!token,
    select: (data) => data.data,
  })
}
