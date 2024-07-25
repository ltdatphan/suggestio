import { IoGlobe, IoLockClosed } from 'react-icons/io5'

export const VisibilityBadge = ({ isPublic }: { isPublic: boolean }) => {
  if (isPublic)
    return (
      <span className="flex w-fit items-center text-custom-blue-400">
        <IoGlobe className="mr-1 inline size-4" /> Public
      </span>
    )
  else
    return (
      <span className="flex w-fit items-center text-custom-orange-600">
        <IoLockClosed className="mr-1 inline size-4" /> Private
      </span>
    )
}
