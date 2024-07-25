import React from 'react'
import ConfirmationModal from '../Modal/ConfirmationModal'
import GenericMenu, { MenuItemType, TargetInfoType } from './GenericMenu'

type Props = {
  //Modal props
  targetName: string
  showModal: boolean
  toggleShowModal: () => void
  modalActionAfterConfirm: () => void
  modalActionIsLoading: boolean

  //Menu props
  menuTitle: string
  targetInfo?: TargetInfoType | null
  toggleMenu: () => void
  menuItems: MenuItemType[]
}

const MenuWithModal = (props: Props) => {
  const {
    targetName,
    showModal,
    toggleShowModal,
    modalActionAfterConfirm,
    modalActionIsLoading,
    targetInfo,
    toggleMenu,
    menuItems,
    menuTitle,
  } = props

  return (
    <>
      <ConfirmationModal
        targetName={targetName}
        showModal={showModal}
        toggleShowModal={toggleShowModal}
        actionAfterConfirm={modalActionAfterConfirm}
        actionIsLoading={modalActionIsLoading}
      />
      <GenericMenu
        targetInfo={targetInfo}
        toggleMenu={toggleMenu}
        menuTitle={menuTitle}
        menuItems={menuItems}
      />
    </>
  )
}

export default MenuWithModal
