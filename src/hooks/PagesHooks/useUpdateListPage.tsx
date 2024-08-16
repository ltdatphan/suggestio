import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useNavigate, useParams } from 'react-router-dom'
import { editList } from '../../api/lists'
import { deepEqual } from '../../helper/helper'
import { isValidListType } from '../../helper/listHelper'
import useGetListDetailsById from '../ApiHooks/useGetListDetailsById'

const useUpdateListPage = (listId: number) => {
  const queryClient = useQueryClient()
  const params = useParams()
  const navigate = useNavigate()
  const [currStep, setCurrStep] = useState(1)
  const nextStep = () => setCurrStep((curr) => curr + 1)
  const previousStep = () => setCurrStep((curr) => curr - 1)

  const {
    isFetching: isFetchingListDetails,
    isLoading: isLoadingListDetails,
    data: listDetails,
    error: listDetailsQueryError,
  } = useGetListDetailsById(listId)

  // = useQuery({
  //   queryKey: ['ListDetails', listId],
  //   queryFn: () => getListDetails(listId, false),
  // })

  const { control, handleSubmit, reset } =
    useForm<models.form.IListEditFormProps>({
      defaultValues: {
        listType: '',
        title: '',
        visibility: '',
        subtitle: '',
      },
    })

  const {
    mutate,
    isPending: updateIsPending,
    error: updateError,
  } = useMutation({
    mutationFn: (editListRequest: models.list.IListUpdateRequest) =>
      editList(Number(params.listId), editListRequest),
    mutationKey: ['AddList'],
    onSuccess: (data: models.list.IListResponseProps) => {
      if (data.id !== undefined) {
        queryClient.invalidateQueries({ queryKey: ['MyLists'] })
        queryClient.invalidateQueries({ queryKey: ['ListDetails', data.id] })
        navigate(`/lists/${data.id}/details`, { replace: true })
      }
    },
  })

  useEffect(() => {
    if (listDetails) {
      const visibility = listDetails.isPublic ? 'public' : 'private'
      const listType = isValidListType(listDetails.listType)
        ? listDetails.listType
        : 'other'

      const newFormData: models.form.IListEditFormProps = {
        title: listDetails.title,
        subtitle: listDetails.subtitle ? listDetails.subtitle : '',
        listType: listType,
        visibility: visibility,
      }

      reset(newFormData)
    }
  }, [listDetails, reset])

  const onSubmit = (data: models.form.IListEditFormProps) => {
    if (listDetails) {
      const requestBody: models.list.IListUpdateRequest = {
        title: data.title,
        subtitle: data.subtitle,
        isPublic: data.visibility === 'public' ? true : false,
        listType: isValidListType(data.listType) ? data.listType : 'other',
        coverImgUrl: null,
      }
      const extractedListDetails = {
        title: listDetails.title,
        subtitle: listDetails.subtitle,
        isPublic: listDetails.isPublic,
        listType: listDetails.listType,
      }
      if (deepEqual(requestBody, extractedListDetails)) {
        toast.error('Please make changes before submitting')
      } else {
        mutate(requestBody)
      }
    }
  }

  return {
    listTitle: listDetails?.title,
    currStep,
    nextStep,
    previousStep,
    control,
    isLoadingListDetails,
    isFetchingListDetails,
    listDetailsQueryError,
    updateIsPending,
    updateError,
    handleSubmit: handleSubmit(onSubmit),
  }
}

export default useUpdateListPage
