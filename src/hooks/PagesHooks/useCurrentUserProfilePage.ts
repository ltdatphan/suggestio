import { useState } from 'react'
import { FaPenToSquare, FaTrash } from 'react-icons/fa6'
import { useNavigate } from 'react-router-dom'
import { MenuItemType, TargetInfoType } from '../../components/Menu/GenericMenu'
import useDeleteListAction from '../ApiHooks/useDeleteListAction'
import useGetCurrentUserLists from '../ApiHooks/useGetCurrentUserLists'
import useGetCurrentUserProfile from '../ApiHooks/useGetCurrentUserProfile'

const useCurrentUserProfilePage = () => {
  const navigate = useNavigate()

  const [targetInfo, setTargetInfo] = useState<TargetInfoType | null>(null)
  const [showModal, setShowModal] = useState(false)
  const toggleShowModal = () => {
    setShowModal((prev) => !prev)
  }

  const {
    isLoading: isLoadingProfile,
    isFetching: isFetchingProfile,
    data: profile,
    error: profileQueryError,
  } = useGetCurrentUserProfile()

  const fetchedUserId = profile?.id
  // const {
  //   isLoading: isFetchingLists,
  //   isFetching: isLoadingLists,
  //   data: lists,
  //   error: listsQueryError,
  // } = useGetCurrentUserLists(!!fetchedUserId)

  const { status, data, error, fetchNextPage, isFetchingNextPage } =
    useGetCurrentUserLists(!!fetchedUserId)

  const successFn = () => {
    setTargetInfo(null)
    setShowModal(false)
  }

  const { mutate: deleteAction, isPending } = useDeleteListAction(successFn)

  //Menu items
  const menuItems: MenuItemType[] = [
    {
      label: 'Edit list',
      Icon: FaPenToSquare,
      func: () => targetInfo && navigate(`/lists/${targetInfo.id}/edit`),
    },
    {
      label: 'Delete list',
      Icon: FaTrash,
      func: () => setShowModal(true),
      labelStyling: 'text-red-500',
      iconStyling: 'fill-red-500',
    },
  ]

  return {
    isLoadingProfile,
    isFetchingProfile,
    profile,
    profileQueryError,
    status,
    data,
    error,
    fetchNextPage,
    isFetchingNextPage,

    //Delete list
    deleteAction,
    deleteIsPending: isPending,
    //Menu
    targetInfo,
    setTargetInfo,
    showModal,
    setShowModal,
    toggleShowModal,
    menuItems,
  }
}

export default useCurrentUserProfilePage
