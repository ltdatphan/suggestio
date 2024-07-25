import { useQuery } from '@tanstack/react-query'
import { getListDetails } from '../../api/lists'

const useGetListDetailsById = (listId: number, enabled: boolean = true) => {
  const { isLoading, isFetching, data, error } = useQuery({
    queryKey: ['ListDetails', listId],
    queryFn: () => getListDetails(listId),
    enabled: enabled,
  })
  return {
    isLoading,
    isFetching,
    data,
    error,
  }
}

export default useGetListDetailsById
