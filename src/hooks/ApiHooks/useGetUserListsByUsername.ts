import { useInfiniteQuery } from '@tanstack/react-query'
import { getUserListsByUsername } from '../../api/users'

const useGetUserListsByUsername = (
  username: string,
  enabled: boolean = true
) => {
  const { data, status, error, fetchNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ['OtherUserLists', username],
      queryFn: (pageParam) => getUserListsByUsername(pageParam, username),
      initialPageParam: 1,
      getNextPageParam: (lastPage) => lastPage.nextPage,
      enabled: enabled,
    })
  return {
    data,
    status,
    error,
    fetchNextPage,
    isFetchingNextPage,
  }
}

export default useGetUserListsByUsername
