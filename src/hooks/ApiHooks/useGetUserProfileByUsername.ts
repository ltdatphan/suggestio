import { useQuery } from '@tanstack/react-query'
import { getUserProfileByUsername } from '../../api/users'

const useGetUserProfileByUsername = (username: string) => {
  const { isLoading, isFetching, data, error } = useQuery({
    queryKey: ['OtherUserProfile', username],
    queryFn: () => getUserProfileByUsername(username),
  })

  return {
    isLoading,
    isFetching,
    data,
    error,
  }
}

export default useGetUserProfileByUsername
