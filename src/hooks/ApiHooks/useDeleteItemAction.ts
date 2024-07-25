import { useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { deleteItem } from '../../api/items'

const useDeleteItemAction = (listId: number, successFn: () => void) => {
  const queryClient = useQueryClient()
  const { mutate, isPending } = useMutation({
    mutationFn: (currentItemId: number) => deleteItem(currentItemId),
    mutationKey: ['DeleteItem'],
    onSuccess: () => {
      successFn()
      queryClient.invalidateQueries({ queryKey: ['ListDetails', listId] })
      queryClient.invalidateQueries({ queryKey: ['ListItems', listId] })
    },
    onError(error) {
      toast.error(error.message)
    },
  })

  return {
    mutate,
    isPending,
  }
}

export default useDeleteItemAction
