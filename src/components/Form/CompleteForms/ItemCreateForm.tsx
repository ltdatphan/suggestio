import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { createItem } from '../../../api/items'
import TopNavigation from '../../Navigation/TopNavigation'
import ItemDetailsGroup from '../FormGroups/ItemDetailsGroup'
import ItemFormButtons from '../FormGroups/ItemFormButtons'

type Props = {
  listId: number
  isOpen: boolean
  toggleOpen: () => void
}

export type VisibleInput = {
  rating: boolean
  notes: boolean
  link: boolean
}

const ItemCreateForm = (props: Props) => {
  const { isOpen, toggleOpen } = props
  const queryClient = useQueryClient()
  const [visibleInputs, setVisibleInputs] = useState<VisibleInput>({
    rating: false,
    notes: false,
    link: false,
  })

  const {
    control,
    handleSubmit,
    resetField,
    reset: resetForm,
  } = useForm<models.form.IItemCreateFormProps>({
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
    formKey?: keyof models.form.IItemCreateFormProps
  ) => {
    setVisibleInputs((prevState) => ({
      ...prevState,
      [inputType]: !prevState[inputType],
    }))
    if (formKey) resetField(formKey)
  }

  // Query for creating items
  const {
    mutate: createItemAction,
    isPending: createIsPending,
    error: createError,
  } = useMutation({
    mutationFn: (newItemRequest: models.item.IItemCreateRequest) =>
      createItem(props.listId, newItemRequest),
    mutationKey: ['CreateItem', props.listId],
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['ListDetails', props.listId],
      })
      queryClient.invalidateQueries({
        queryKey: ['ListItems', props.listId],
      })
      resetForm()
      toggleOpen()
    },
  })

  const onSubmit = (data: models.form.IItemCreateFormProps) => {
    const requestBody: models.item.IItemCreateRequest = {
      itemName: data.itemName,
      subtitle: data.subtitle,
      category: data.category,
      itemImgUrl: data.itemImgUrl !== '' ? data.itemImgUrl : null,
      itemUrl: data.itemUrl !== '' ? data.itemUrl : null,
      rating: data.rating > 0 ? data.rating : null,
      notes: data.notes,
    }
    createItemAction(requestBody)
  }

  //Reset form when the form is closed
  useEffect(() => {
    if (!isOpen) resetForm()
  }, [isOpen])

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
        <TopNavigation title={'Add new item'} customFn={() => toggleOpen()} />

        {/* Content */}

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="px-2 py-3">
            <ItemDetailsGroup control={control} visibleInputs={visibleInputs} />
          </div>
          {createError?.message && (
            <div className="mb-10 mt-2 px-7 text-sm text-red-500">
              {createError?.message}
            </div>
          )}
          <ItemFormButtons
            visibleInputs={visibleInputs}
            setVisibleInputs={handleButtonClick}
            isPending={createIsPending}
            buttonAction={'create'}
          />
        </form>
      </div>
    </div>
  )
}

export default ItemCreateForm
