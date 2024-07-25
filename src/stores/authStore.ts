import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type UserType = {
  id: string
  username: string
  firstName: string
  email: string
  profileImgUrl: string | null
}

type AuthStoreType = {
  user?: UserType | null //Allow undefined
  isLoggedIn: boolean
  setUser: (newUser: UserType) => void
  clearUser: () => void
}

export const useAuthStore = create<AuthStoreType>()(
  persist(
    (set) => ({
      user: null,
      isLoggedIn: false,
      setUser: (newUser) => set(() => ({ user: newUser, isLoggedIn: true })),
      clearUser: () => set(() => ({ user: null, isLoggedIn: false })),
    }),
    {
      name: 'auth-storage',
    }
  )
)
