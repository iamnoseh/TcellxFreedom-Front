import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { UserDto } from '@/lib/types'

interface AuthState {
  token: string | null
  user: UserDto | null
  _hasHydrated: boolean
  setAuth: (token: string, user: UserDto) => void
  logout: () => void
  setHasHydrated: (v: boolean) => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      user: null,
      _hasHydrated: false,
      setAuth: (token, user) => set({ token, user }),
      logout: () => set({ token: null, user: null }),
      setHasHydrated: (v) => set({ _hasHydrated: v }),
    }),
    {
      name: 'auth-storage',
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true)
      },
    }
  )
)
