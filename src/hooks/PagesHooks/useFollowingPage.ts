import useGetFollowingLists from '../ApiHooks/useGetFollowingLists'

const useFollowingPage = () => {
  const { data, status, error, fetchNextPage, isFetchingNextPage } =
    useGetFollowingLists()

  return {
    data,
    status,
    error,
    fetchNextPage,
    isFetchingNextPage,
  }
}

export default useFollowingPage
