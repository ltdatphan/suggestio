import { useInfiniteQuery } from '@tanstack/react-query'
import { searchLists } from '../../api/lists'
import { searchUsers } from '../../api/users'

const useSearch = (query: string, targetType: 'users' | 'lists') => {
  // const { isLoading, isFetching, data, error } = useQuery({
  //   queryKey: ['searchResults', query],
  //   queryFn: () => searchUser(query),
  //   enabled: query !== '',
  // })

  const {
    data: usersData,
    status: usersStatus,
    error: usersError,
    fetchNextPage: fetchNextUsers,
    isFetchingNextPage: isFetchingNextUsers,
  } = useInfiniteQuery({
    queryKey: ['UserSearchResults', query],
    queryFn: (queryParam) => searchUsers(queryParam, query),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage.nextPage,
    enabled: query !== '' && targetType === 'users',
  })

  const {
    data: listsData,
    status: listsStatus,
    error: listsError,
    fetchNextPage: fetchNextLists,
    isFetchingNextPage: isFetchingNextLists,
  } = useInfiniteQuery({
    queryKey: ['ListSearchResults', query],
    queryFn: (queryParam) => searchLists(queryParam, query),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage.nextPage,
    enabled: query !== '' && targetType === 'lists',
  })

  return {
    data:
      targetType === 'users'
        ? { targetType: 'users', usersData }
        : { targetType: 'lists', listsData },
    status: targetType === 'users' ? usersStatus : listsStatus,
    error: targetType === 'users' ? usersError : listsError,
    fetchNextPage: targetType === 'users' ? fetchNextUsers : fetchNextLists,
    isFetchingNextPage:
      targetType === 'users' ? isFetchingNextUsers : isFetchingNextLists,
  }
}

export default useSearch
