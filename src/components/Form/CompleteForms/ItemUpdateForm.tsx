import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { updateItem } from '../../../api/items'
import useGetItemDetailsById from '../../../hooks/ApiHooks/useGetItemDetailsById'
import ErrorBanner from '../../Error/ErrorBanner'
import Fetching from '../../Loader/Fetching'
import Loading from '../../Loader/Loading'
import TopNavigation from '../../Navigation/TopNavigation'
import ItemDetailsGroup from '../FormGroups/ItemDetailsGroup'
import ItemFormButtons from '../FormGroups/ItemFormButtons'

type Props = {
  itemId: number
  listId: number
  isOpen: boolean
  toggleOpen: () => void
}

type VisibleInput = {
  rating: boolean
  notes: boolean
  link: boolean
}

const ItemUpdateForm = (props: Props) => {
  const { isOpen, toggleOpen, itemId } = props
  const queryClient = useQueryClient()
  const [visibleInputs, setVisibleInputs] = useState<VisibleInput>({
    rating: false,
    notes: false,
    link: false,
  })
  const resetVisibleInputs = () =>
    setVisibleInputs({
      rating: false,
      notes: false,
      link: false,
    })

  const {
    control,
    handleSubmit,
    resetField,
    reset: resetForm,
  } = useForm<models.form.IItemEditFormProps>({
    defaultValues: {
      itemName: '',
      subtitle: '',
      category: '',
      itemImgUrl: '',
      itemUrl: '',
      rating: 0,
      notes: '',
    },
  })

  const handleButtonClick = (
    inputType: keyof VisibleInput,
    formKey?: keyof models.form.IItemEditFormProps
  ) => {
    setVisibleInputs((prevState) => ({
      ...prevState,
      [inputType]: !prevState[inputType],
    }))
    if (formKey) resetField(formKey)
  }

  //Query for getting item details
  const {
    isLoading: isLoadingItemDetails,
    isFetching: isFetchingItemDetails,
    data: itemDetails,
    error: itemDetailsQueryError,
  } = useGetItemDetailsById(itemId)

  const {
    mutate: editItemAction,
    isPending: editIsPending,
    error: editError,
  } = useMutation({
    mutationFn: (newItemRequest: models.item.IItemUpdateRequest) =>
      updateItem(itemId, newItemRequest),
    mutationKey: ['EditItem'],
    onSuccess: () => {
      //Fetch updated items
      queryClient.invalidateQueries({
        queryKey: ['ListItems', props.listId],
      })

      //Remove old item data
      queryClient.removeQueries({
        queryKey: ['ItemDetails', props.itemId],
      })

      resetForm()
      toggleOpen()
    },
  })

  const onSubmit = (data: models.form.IItemEditFormProps) => {
    const requestBody: models.item.IItemCreateRequest = {
      itemName: data.itemName,
      subtitle: data.subtitle,
      category: data.category,
      itemImgUrl: data.itemImgUrl !== '' ? data.itemImgUrl : null,
      itemUrl: data.itemUrl !== '' ? data.itemUrl : null,
      rating: data.rating > 0 ? data.rating : null,
      notes: data.notes,
    }
    editItemAction(requestBody)
  }

  //Reset form when the form is closed
  // useEffect(() => {
  //   if (isOpen)
  //     queryClient.invalidateQueries({ queryKey: ['ItemDetails', itemId] })
  // }, [isOpen, itemId])

  useEffect(() => {
    if (itemDetails) {
      const fetchedItemData: models.form.IItemEditFormProps = {
        itemName: itemDetails.itemName,
        subtitle: itemDetails?.subtitle ? itemDetails.subtitle : '',
        category: itemDetails.category,
        itemImgUrl: itemDetails?.itemImgUrl ? itemDetails.itemImgUrl : '',
        itemUrl: itemDetails?.itemUrl ? itemDetails.itemUrl : '',
        rating: itemDetails?.rating ? itemDetails.rating : 0,
        notes: itemDetails?.notes ? itemDetails.notes : '',
      }
      resetForm(fetchedItemData)
      resetVisibleInputs()
      if (fetchedItemData.rating > 0)
        setVisibleInputs((prev) => ({ ...prev, rating: true }))
      if (fetchedItemData.notes !== '')
        setVisibleInputs((prev) => ({ ...prev, notes: true }))
      if (fetchedItemData.itemUrl !== '')
        setVisibleInputs((prev) => ({ ...prev, link: true }))

      // if (fetchedItemData.rating > 0) setVisibleInputs(prev => {...prev, rating: true })
    }
  }, [itemDetails, resetForm])

  if (isLoadingItemDetails) return <Loading />
  else if (itemDetailsQueryError)
    return <ErrorBanner error={itemDetailsQueryError} />
  else
    return (
      <div className="fixed inset-x-0 z-50">
        {/* Background overlay */}
        <div
          className={`fixed inset-0 bg-black ${isOpen ? 'h-full opacity-50' : 'h-0 opacity-0'} transition-opacity duration-300 ease-in-out`}
          onClick={toggleOpen}
        ></div>

        {/* Menu */}
        <div
          className={`transform rounded bg-primary-white ${
            isOpen ? 'translate-y-0' : 'translate-y-full'
          } fixed inset-x-0 bottom-0 max-h-[70%] overflow-y-scroll rounded-t-lg transition-transform duration-300 ease-in-out`}
        >
          <TopNavigation title={'Edit item'} customFn={() => toggleOpen()} />
          {isFetchingItemDetails && <Fetching />}
          {/* Content */}
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="px-2 py-3">
              <ItemDetailsGroup
                control={control}
                visibleInputs={visibleInputs}
              />
            </div>
            {editError?.message && (
              <div className="mb-10 mt-2 px-7 text-sm text-red-500">
                {editError?.message}
              </div>
            )}
            <ItemFormButtons
              visibleInputs={visibleInputs}
              setVisibleInputs={handleButtonClick}
              isPending={editIsPending}
              buttonAction={'edit'}
            />
          </form>
        </div>
      </div>
    )
}

export default ItemUpdateForm
