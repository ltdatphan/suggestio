import { useQuery } from '@tanstack/react-query'
import { getItem } from '../../api/items'

const useGetItemDetailsById = (itemId: number) => {
  const { isLoading, isFetching, data, error } = useQuery({
    queryKey: ['ItemDetails', itemId],
    queryFn: () => getItem(itemId),
    enabled: Boolean(itemId),
  })

  return {
    isLoading,
    isFetching,
    data,
    error,
  }
}

export default useGetItemDetailsById
