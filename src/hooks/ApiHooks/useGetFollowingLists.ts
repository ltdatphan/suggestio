import { useInfiniteQuery } from '@tanstack/react-query'
import { getFollowingLists } from '../../api/lists'

const useGetFollowingLists = (enabled: boolean = true) => {
  const { data, status, error, fetchNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ['FollowingLists'],
      queryFn: getFollowingLists,
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

export default useGetFollowingLists
