import { useState } from 'react'
import { FaPenToSquare, FaTrash } from 'react-icons/fa6'
import { useNavigate } from 'react-router-dom'
import { MenuItemType, TargetInfoType } from '../../components/Menu/GenericMenu'
import useDeleteItemAction from '../ApiHooks/useDeleteItemAction'
import useDeleteListAction from '../ApiHooks/useDeleteListAction'
import useGetListDetailsById from '../ApiHooks/useGetListDetailsById'
import useGetListItemsById from '../ApiHooks/useGetListItemsById'

const useCurrentUserListDetailsPage = (listId: number) => {
  const navigate = useNavigate()

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

  // States and functions for menu + modal
  const [targetListInfo, setTargetListInfo] = useState<TargetInfoType | null>(
    null
  )
  const [targetItemInfo, setTargetItemInfo] = useState<TargetInfoType | null>(
    null
  )
  const [showListModal, setShowListModal] = useState(false)
  const [showItemModal, setShowItemModal] = useState(false)
  const toggleShowListModal = () => {
    setShowListModal((prev) => !prev)
  }
  const toggleShowItemModal = () => {
    setShowItemModal((prev) => !prev)
  }
  const toggleListMenu = () => {
    if (targetListInfo) setTargetListInfo(null)
    else if (listDetails) {
      setTargetListInfo({
        id: String(listDetails.id),
        title: listDetails.title,
        img: listDetails.coverImgUrl,
      })
    }
  }

  //States for create and update forms
  const [isOpenCreateForm, setIsOpenCreateForm] = useState(false)
  const toggleOpenCreateForm = () => setIsOpenCreateForm((prev) => !prev)
  const [isOpenUpdateForm, setIsOpenUpdateForm] = useState(false)
  const toggleOpenUpdateForm = () => {
    if (isOpenUpdateForm)
      // Form currently open and we're going to close it
      setTargetItemId(null)
    setIsOpenUpdateForm((prev) => !prev)
  }
  const [targetItemId, setTargetItemId] = useState<number | null>(null)

  //Menu items
  const listMenuItems: MenuItemType[] = [
    {
      label: 'Edit list',
      Icon: FaPenToSquare,
      func: () =>
        targetListInfo && navigate(`/lists/${targetListInfo.id}/edit`),
    },
    {
      label: 'Delete list',
      Icon: FaTrash,
      func: () => setShowListModal(true),
      labelStyling: 'text-red-500',
      iconStyling: 'fill-red-500',
    },
  ]

  const itemMenuItems: MenuItemType[] = [
    {
      label: 'Edit item',
      Icon: FaPenToSquare,
      func: () => {
        targetItemInfo &&
          targetItemInfo?.id &&
          setTargetItemId(parseInt(targetItemInfo.id))
        setTargetItemInfo(null)
        setShowItemModal(false)
        toggleOpenUpdateForm()
      },
    },
    {
      label: 'Delete item',
      Icon: FaTrash,
      func: () => setShowItemModal(true),
      labelStyling: 'text-red-500',
      iconStyling: 'fill-red-500',
    },
  ]

  // Delete actions
  const { mutate: deleteListAction, isPending: deleteListIsPending } =
    useDeleteListAction(() => {
      setTargetListInfo(null)
      setShowListModal(false)
      navigate('/home')
    })

  const { mutate: deleteItemAction, isPending: deleteItemIsPending } =
    useDeleteItemAction(listId, () => {
      setTargetItemInfo(null)
      setShowItemModal(false)
    })

  return {
    //Data from list details
    isLoadingListDetails,
    isFetchingListDetails,
    listDetails,
    listDetailsQueryError,

    //Data from list items

    paginatedItems,
    status,
    error,
    fetchNextPage,
    isFetchingNextPage,

    // Item Menu
    toggleListMenu,

    //Create and update form states
    isOpenCreateForm,
    toggleOpenCreateForm,
    isOpenUpdateForm,
    toggleOpenUpdateForm,
    targetItemId,

    //Delete list
    deleteListAction,
    deleteListIsPending,
    deleteItemAction,
    deleteItemIsPending,
    //Selected list
    targetListInfo,
    setTargetListInfo,
    showListModal,
    setShowListModal,
    toggleShowListModal,
    //Selected item
    targetItemInfo,
    setTargetItemInfo,
    showItemModal,
    setShowItemModal,
    toggleShowItemModal,
    //Menu items
    listMenuItems,
    itemMenuItems,
  }
}

export default useCurrentUserListDetailsPage
