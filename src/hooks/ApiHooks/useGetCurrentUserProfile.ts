import { useQuery } from '@tanstack/react-query'
import { getCurrentUserProfile } from '../../api/users'
import { useAuth } from '../useAuth'

const useGetCurrentUserProfile = () => {
  const { user } = useAuth()
  const { isLoading, isFetching, data, error } = useQuery({
    queryKey: ['MyProfile', user?.username],
    queryFn: getCurrentUserProfile,
  })
  return {
    isLoading,
    isFetching,
    data,
    error,
  }
}

export default useGetCurrentUserProfile
