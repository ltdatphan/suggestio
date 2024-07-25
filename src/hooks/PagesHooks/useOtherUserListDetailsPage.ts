import useGetListDetailsById from '../ApiHooks/useGetListDetailsById'
import useGetListItemsById from '../ApiHooks/useGetListItemsById'

const useOtherUserListDetailsPage = (listId: number) => {
  const {
    isLoading: isLoadingListDetails,
    isFetching: isFetchingListDetails,
    data: listDetails,
    error: listDetailsQueryError,
  } = useGetListDetailsById(listId)

  const retrievedListId = listDetails?.id

  const {
    data: paginatedItems,
    status,
    error,
    fetchNextPage,
    isFetchingNextPage,
  } = useGetListItemsById(retrievedListId!, !!retrievedListId)

  return {
    isLoadingListDetails,
    isFetchingListDetails,
    listDetails,
    listDetailsQueryError,
    paginatedItems,
    status,
    error,
    fetchNextPage,
    isFetchingNextPage,
  }
}

export default useOtherUserListDetailsPage
