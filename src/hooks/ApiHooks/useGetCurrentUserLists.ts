import { useInfiniteQuery } from '@tanstack/react-query'
import { getCurrentUserLists } from '../../api/lists'

const useGetCurrentUserLists = (enabled: boolean = true) => {
  const { data, status, error, fetchNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ['MyLists'],
      queryFn: getCurrentUserLists,
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

export default useGetCurrentUserLists
