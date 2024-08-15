import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { createList } from '../../api/lists'
import { isValidListType } from '../../helper/listHelper'

const useCreateListPage = () => {
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const [currStep, setCurrStep] = useState(1)

  const nextStep = () => setCurrStep((curr) => curr + 1)
  const previousStep = () => setCurrStep((curr) => curr - 1)

  const { control, handleSubmit } = useForm<models.form.IListCreateFormProps>({
    defaultValues: {
      listType: '',
      title: '',
      visibility: 'private',
      subtitle: '',
    },
  })

  const { mutate, isPending, error } = useMutation({
    mutationFn: (newListRequest: models.list.IListCreateRequest) =>
      createList(newListRequest),
    mutationKey: ['CreateList'],
    onSuccess: (data: models.list.IListResponseProps) => {
      if (data.id !== undefined) {
        queryClient.invalidateQueries({ queryKey: ['MyList'] })
        navigate(`/lists/${data.id}/details`, { replace: true })
      }
    },
  })

  const onSubmit = (data: models.form.IListCreateFormProps) => {
    const requestBody: models.list.IListCreateRequest = {
      title: data.title,
      subtitle: data.subtitle,
      isPublic: data.visibility === 'public' ? true : false,
      listType: isValidListType(data.listType) ? data.listType : 'other',
    }

    mutate(requestBody)
  }
  return {
    control,
    handleSubmit: handleSubmit(onSubmit),
    currStep,
    nextStep,
    previousStep,
    isPending,
    error,
  }
}

export default useCreateListPage
