import React from 'react'
import { IconType } from 'react-icons'
import { FaRegUserCircle, FaUserCircle } from 'react-icons/fa'
import {
  IoAddCircle,
  IoAddCircleOutline,
  IoAddCircleSharp,
  IoHome,
  IoHomeOutline,
  IoLogOut,
  IoNotificationsOutline,
  IoSearch,
  IoSearchOutline,
} from 'react-icons/io5'
import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import Logo from '/suggestio.svg'

type MenuItems = {
  name: string
  path: string
  Icon: IconType
  OutlineIcon: IconType
}

export const menuItems: MenuItems[] = [
  { name: 'Home', path: '/home', Icon: IoHome, OutlineIcon: IoHomeOutline },
  {
    name: 'Add',
    path: '/add',
    Icon: IoAddCircle,
    OutlineIcon: IoAddCircleOutline,
  },
  {
    name: 'Explore',
    path: '/explore',
    Icon: IoSearch,
    OutlineIcon: IoSearchOutline,
  },
  //   { name: 'Notifications', path: '/', Icon: IoNotificationsOutline },
  {
    name: 'Account',
    path: '/myProfile',
    Icon: FaUserCircle,
    OutlineIcon: FaRegUserCircle,
  },
]

export const mobileOnlyItems: string[] = ['Home', 'Add', 'Explore']

const Navigation = () => {
  const { logout, user } = useAuth()
  const location = useLocation()
  return (
    <>
      <nav className="sticky bottom-0 z-30 h-20 w-full border-t-[1px] border-light-gray bg-primary-white px-5 md:fixed md:left-0 md:h-full md:w-60 md:border-r-[1px] md:border-t-0">
        <ul className="relative mb-2 flex w-full justify-around pt-2 md:flex-col">
          <li className="my-2.5 hidden justify-center md:flex">
            <Link to="/home">
              <img
                src={Logo}
                alt="Suggestio Logo"
                className="h-16 w-auto md:mb-2.5"
              />
            </Link>
          </li>

          {menuItems.map((item, index) => {
            return (
              <li
                key={index}
                className={`group ${mobileOnlyItems.includes(item.name) ? '' : 'hidden md:block'}`}
                data-user-selected={
                  location.pathname === item.path ||
                  (location.pathname === '/following' && item.path === '/home')
                    ? 'true'
                    : 'false'
                }
              >
                <Link
                  to={item.path}
                  className="flex w-14 flex-col items-center justify-center md:w-full md:flex-row md:justify-start md:space-x-5 md:rounded-md md:px-4 md:py-2.5 md:hover:bg-custom-orange-200 md:group-data-[user-selected=true]:bg-custom-orange-100 md:group-data-[user-selected=true]:hover:bg-custom-orange-200"
                >
                  {item.name === 'Account' && user?.profileImgUrl && (
                    <img
                      src={user.profileImgUrl}
                      className="size-8 rounded-full md:size-7"
                    />
                  )}
                  {(item.name !== 'Account' ||
                    (item.name === 'Account' && !user?.profileImgUrl)) && (
                    <div>
                      <item.Icon
                        className={`hidden group-data-[user-selected=true]:block ${
                          item.name == 'Add'
                            ? 'size-14 text-custom-orange-400 md:size-7 md:text-primary-black'
                            : 'size-8 md:size-7'
                        }`}
                      />
                      <item.OutlineIcon
                        className={`group-data-[user-selected=true]:hidden ${
                          item.name == 'Add'
                            ? 'size-14 text-custom-orange-400 md:size-7 md:text-primary-black'
                            : 'size-8 md:size-7'
                        }`}
                      />
                    </div>
                  )}

                  <span
                    className={`${item.name == 'Add' ? 'hidden md:inline' : ''} text-xs group-data-[user-selected=true]:font-semibold md:text-base`}
                  >
                    {item.name}
                  </span>
                </Link>
              </li>
            )
          })}
          <li className="hidden md:block">
            <button
              onClick={() => logout()}
              className="flex flex-col items-center justify-center md:w-full md:flex-row md:justify-start md:space-x-5 md:rounded-md md:px-4 md:py-2.5 md:hover:bg-custom-orange-200"
            >
              <IoLogOut className="size-8 md:size-7" />
              <span className="text-xs md:text-base">Log out</span>
            </button>
          </li>
        </ul>
      </nav>
    </>
  )
}

export default Navigation
