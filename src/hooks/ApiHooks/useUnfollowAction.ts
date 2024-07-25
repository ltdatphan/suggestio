import { useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { unfollowUserById } from '../../api/users'

const useUnfollowAction = (username: string) => {
  const queryClient = useQueryClient()
  const { isPending, data, error, mutate } = useMutation({
    mutationKey: ['Unfollow', username],
    mutationFn: (userId: string) => unfollowUserById(userId),
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

export default useUnfollowAction
