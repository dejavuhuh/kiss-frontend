import type { ResponseOf } from '@/api'
import type api from '@/api'
import { create } from 'zustand/index'

type User = ResponseOf<typeof api.authenticationService.getCurrentUser>

export interface AuthenticationState {
  authenticated?: boolean
  user: User
  setUser: (user: User) => void
  reset: () => void
  unAuthenticate: () => void
}

const useAuthentication = create<AuthenticationState>()(
  set => ({
    user: undefined!,
    authenticated: undefined,
    setUser: user => set({ user, authenticated: true }),
    reset: () => set({ user: undefined, authenticated: undefined }),
    unAuthenticate: () => set({ authenticated: false }),
  }),
)

export default useAuthentication
