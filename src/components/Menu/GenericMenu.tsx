import { IconType } from 'react-icons'
import TopNavigation from '../Navigation/TopNavigation'

type Props = {
  toggleMenu: () => void
  menuTitle: string
  menuItems: MenuItemType[]
  targetInfo?: TargetInfoType | null
}

export type TargetInfoType = {
  id: string
  title: string
  img?: string | null
}

export type MenuItemType = {
  label: string
  Icon: IconType
  func: () => void
  labelStyling?: string
  iconStyling?: string
}

const GenericMenu = (props: Props) => {
  const { toggleMenu, menuTitle, menuItems, targetInfo = null } = props
  const isOpen = Boolean(targetInfo)
  return (
    <div className="fixed inset-x-0 z-50">
      {/* Background overlay */}
      <div
        className={`fixed inset-0 bg-black ${isOpen ? 'h-full opacity-50' : 'h-0 opacity-0'} transition-opacity duration-300 ease-in-out`}
        onClick={toggleMenu}
      ></div>

      {/* Menu */}
      <div
        className={`transform rounded bg-primary-white ${
          isOpen ? 'translate-y-0' : 'translate-y-full'
        } fixed inset-x-0 bottom-0 max-h-[70%] overflow-y-auto rounded-t-lg transition-transform duration-300 ease-in-out`}
      >
        <div>
          <TopNavigation title={menuTitle} customFn={() => toggleMenu()} />

          {/* Target preview */}
          {targetInfo && (
            <div className="flex flex-row items-center gap-x-2.5 border-b border-b-light-gray px-5 pb-3">
              <div>
                {targetInfo.img ? (
                  <img src={targetInfo.img} className="size-16 rounded-lg" />
                ) : (
                  <div
                    className="size-16 rounded-lg bg-gradient-to-tr from-custom-orange-300 to-custom-yellow-200"></div>
                )}
              </div>
              <span className="line-clamp-2 overflow-hidden text-ellipsis text-base/6 font-medium md:text-lg/6">
                {targetInfo?.title}
              </span>
            </div>
          )}

          {/* Menu items/buttons */}
          <ul className="my-5 flex flex-col gap-1 px-5 md:grid md:grid-cols-2">
            {menuItems.map((item, i) => (
              <li key={i}>
                <button
                  onClick={item.func}
                  className="flex w-full cursor-pointer items-center rounded-lg px-3 py-2.5 text-base/6 font-medium hover:bg-gray-200 md:text-lg/6"
                >
                  <item.Icon
                    className={`mr-4 size-6 fill-gray-600 ${item.iconStyling}`}
                  />
                  <span className={`${item.labelStyling}`}>{item.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default GenericMenu
