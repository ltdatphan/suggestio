import { useInfiniteQuery } from '@tanstack/react-query'
import { getListItems } from '../../api/lists'

const useGetListItemsById = (listId: number, enabled: boolean = true) => {
  const { data, status, error, fetchNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ['ListItems', listId],
      queryFn: (queryParam) => getListItems(queryParam, listId),
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

export default useGetListItemsById
