import { BsThreeDots } from 'react-icons/bs'
import { IoChevronBack } from 'react-icons/io5'
import { useNavigate } from 'react-router-dom'

type TopNavProps = {
  title: string
  currStep?: number
  previousFn?: () => void
  customFn?: () => void
  menuFn?: (() => void) | null
}

const TopNavigation = ({
  title,
  previousFn,
  currStep = 1,
  customFn,
  menuFn,
}: TopNavProps) => {
  const navigate = useNavigate()

  let onClickFn
  if (customFn !== undefined) onClickFn = customFn
  else if (!previousFn || (previousFn !== undefined && currStep == 1))
    onClickFn = () => navigate(-1)
  else onClickFn = previousFn

  return (
    <div className="sticky top-0 z-50 bg-primary-white px-2 py-2.5">
      <div className="relative flex w-full items-center justify-center">
        <button
          type="button"
          onClick={() => onClickFn()}
          className="absolute left-2 top-1/2 mt-0 -translate-y-1/2 transform rounded-full p-1 hover:bg-gray-300"
        >
          <IoChevronBack className="size-6" />
        </button>
        <span className="text-lg font-medium">{title}</span>
        {menuFn && (
          <button
            type="button"
            onClick={() => menuFn()}
            className="absolute right-2 top-1/2 mt-0 -translate-y-1/2 transform rounded-full p-1 hover:bg-gray-300"
          >
            <BsThreeDots className="size-6" />
          </button>
        )}
      </div>
    </div>
  )
}

export default TopNavigation
