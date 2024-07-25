import React from 'react'
import { IoClose, IoWarning } from 'react-icons/io5'

type Props = {
  targetName: string
  showModal: boolean
  toggleShowModal: () => void
  actionAfterConfirm: () => void
  actionIsLoading: boolean
}

const ConfirmationModal = (props: Props) => {
  const {
    targetName,
    showModal,
    toggleShowModal,
    actionAfterConfirm,
    actionIsLoading,
  } = props
  return (
    <div
      className={`${showModal ? 'h-full' : 'h-0'} fixed inset-x-0 bottom-0 left-0 right-0 top-0 z-[51] flex w-full flex-grow items-center justify-center overflow-hidden`}
    >
      {/* Background overlay */}
      <div
        className={`fixed inset-0 bg-black ${showModal ? 'h-full opacity-25' : 'h-0 opacity-0'} transition-opacity duration-300 ease-in-out`}
        onClick={() => toggleShowModal()}
      ></div>

      {/* Confirmation modal */}
      <div
        tabIndex={-1}
        data-show-modal={showModal ? 'true' : 'false'}
        className={`${showModal ? 'scale-100 opacity-100' : 'scale-90 opacity-0'} z-[60] transform items-center justify-center rounded-lg bg-primary-white px-5 py-2 shadow transition-all duration-300 ease-in-out`}
      >
        <button
          type="button"
          className="absolute end-2.5 top-3 ms-auto inline-flex size-8 items-center justify-center rounded-lg bg-transparent text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900"
          onClick={() => toggleShowModal()}
        >
          <IoClose className="size-6" />
          <span className="sr-only">Close modal</span>
        </button>
        <div className="p-4 text-center md:p-5">
          <IoWarning className="mx-auto mb-4 h-16 w-16 rounded-full bg-red-100 p-2 text-red-500" />
          <h1 className="mb-2 text-xl font-bold">Are you sure?</h1>
          <span className="mb-5 block text-lg">
            This action cannot be undone. All items associated will also be
            deleted.
          </span>
          <button
            type="button"
            className="text-md inline-flex items-center rounded-lg bg-red-600 px-5 py-2.5 text-center font-medium text-white hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300"
            onClick={() => actionAfterConfirm()}
            disabled={actionIsLoading}
          >
            Yes, Delete {targetName}
          </button>
          <button
            type="button"
            className="text-md ms-3 rounded-lg border border-gray-200 bg-gray-100 px-5 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-200 hover:text-gray-600 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100"
            onClick={() => toggleShowModal()}
          >
            No, cancel
          </button>
        </div>
      </div>
    </div>
  )
}

export default ConfirmationModal
