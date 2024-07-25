import { Link } from 'react-router-dom'
import ProfileMenu from './ProfileMenu'
import Logo from '/suggestio.svg'

const TopMainNavigation = () => {
  return (
    <>
      <div className="fixed top-0 z-30 flex h-16 w-full items-center justify-between border-b-[1px] border-b-light-gray bg-primary-white px-5 py-2.5 md:hidden">
        <div className="absolute my-auto">
          <ProfileMenu />
        </div>
        <div className="flex w-full justify-center">
          <Link to="/home">
            <img src={Logo} alt="Suggestio Logo" className="h-12 w-auto" />
          </Link>
        </div>
        {/* <div className="absolute right-0">
          <IoNotificationsOutline className="size-8" />
        </div> */}
      </div>
    </>
  )
}

export default TopMainNavigation
