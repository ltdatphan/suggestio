import { useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { followUserById } from '../../api/users'

const useFollowAction = (username: string) => {
  const queryClient = useQueryClient()
  const { isPending, data, error, mutate } = useMutation({
    mutationKey: ['Follow', username],
    mutationFn: (userId: string) => followUserById(userId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['OtherUserProfile', username],
      })
      queryClient.removeQueries({
        queryKey: ['FollowingLists'],
      })
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  return { isPending, data, error, mutate }
}

export default useFollowAction
