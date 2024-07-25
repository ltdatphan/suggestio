import { useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { deleteList } from '../../api/lists'

const useDeleteListAction = (successFn: () => void) => {
  const queryClient = useQueryClient()
  const { mutate, isPending } = useMutation({
    mutationFn: (currentListId: number) => deleteList(currentListId),
    mutationKey: ['DeleteList'],
    onSuccess: () => {
      successFn()
      queryClient.invalidateQueries({ queryKey: ['MyLists'] })
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

export default useDeleteListAction
