import { useState } from 'react'
import { FaPenToSquare, FaTrash } from 'react-icons/fa6'
import { useNavigate } from 'react-router-dom'
import { MenuItemType, TargetInfoType } from '../../components/Menu/GenericMenu'
import useDeleteListAction from '../ApiHooks/useDeleteListAction'
import useGetCurrentUserLists from '../ApiHooks/useGetCurrentUserLists'

const useHomePage = () => {
  const navigate = useNavigate()

  //States
  const [targetInfo, setTargetInfo] = useState<TargetInfoType | null>(null)
  const [showModal, setShowModal] = useState(false)
  const toggleShowModal = () => {
    setShowModal((prev) => !prev)
  }

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

  const { status, data, error, fetchNextPage, isFetchingNextPage } =
    useGetCurrentUserLists()

  const successFn = () => {
    setTargetInfo(null)
    setShowModal(false)
  }

  const { mutate: deleteFn, isPending } = useDeleteListAction(successFn)

  return {
    status,
    data,
    error,
    fetchNextPage,
    isFetchingNextPage,
    //Delete list
    deleteFn,
    deleteIsPending: isPending,
    //Selected list
    targetInfo,
    setTargetInfo,
    showModal,
    setShowModal,
    toggleShowModal,
    //Menu items
    menuItems,
  }
}

export default useHomePage
