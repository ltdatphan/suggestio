import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react'
import { FaUserCircle } from 'react-icons/fa'
import { IoLogOut } from 'react-icons/io5'
import { Link } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'

const ProfileMenu = () => {
  const { logout, user } = useAuth()

  return (
    <Popover className="relative">
      <PopoverButton className="active:brightness-75">
        {user?.profileImgUrl ? (
          <img
            src={user.profileImgUrl}
            alt="Profile image"
            className="size-12 rounded-full"
          />
        ) : (
          <FaUserCircle className="size-12 rounded-full" />
        )}
      </PopoverButton>
      {/* <Transition
        enter="transition ease-out duration-100"
        enterFrom="opacity-0 translate-y-1"
        enterTo="opacity-100 translate-y-0"
        leave="transition ease-in duration-100"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 translate-y-1"
      > */}
      <PopoverPanel
        anchor="bottom"
        className="z-50 ml-6 mt-1 flex w-32 flex-col rounded-lg border border-light-gray bg-primary-white"
      >
        <Link
          to={'/myProfile'}
          className="flex items-center px-5 py-2 text-sm/6 hover:bg-gray-100"
        >
          <FaUserCircle className="mr-2 inline size-6" /> Profile
        </Link>
        <button
          onClick={() => logout()}
          className="flex items-center px-5 py-2 text-sm/6 hover:bg-gray-100"
        >
          <IoLogOut className="mr-2 inline size-6" /> Logout
        </button>
      </PopoverPanel>
      {/* </Transition> */}
    </Popover>
  )
}

export default ProfileMenu
