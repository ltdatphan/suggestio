import { useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { loginUser, logoutUser } from '../api/auth'
import { useAuthStore } from '../stores/authStore'

export const useAuth = () => {
  const queryClient = useQueryClient()
  const { setUser, clearUser, user, isLoggedIn } = useAuthStore()

  const loginMutation = useMutation({
    mutationFn: loginUser,
    mutationKey: ['Login'],
    onSuccess: (data) => {
      setUser(data)
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const logoutMutation = useMutation({
    mutationFn: logoutUser,
    mutationKey: ['Logout'],
    onSuccess: () => {
      clearUser()
      queryClient.clear() //Clear cache
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  return {
    user: user,
    loginMutation: loginMutation,
    isLoggedIn: isLoggedIn,
    login: loginMutation.mutate,
    loginIsPending: loginMutation.isPending,
    loginError: loginMutation.error,
    logout: logoutMutation.mutate,
    logoutIsPending: logoutMutation.isPending,
    logoutError: logoutMutation.error,
  }
}
