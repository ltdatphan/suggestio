import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { FaUser } from 'react-icons/fa6'
import { IoGlobeOutline, IoLockClosedOutline } from 'react-icons/io5'
import { Link } from 'react-router-dom'

dayjs.extend(relativeTime)

type ListCardPropType = {
  id: number
  title: string
  isPublic: boolean
  coverImgUrl: string | null
  itemCount: number
  createdAt: Date
  updatedAt: Date
  ownerUsername?: string | null
  ownerProfileImgUrl?: string | null
  showMenu?: () => void
}

type PreviewImgPropType = {
  coverImgUrl?: string | null
  title: string
}

const PreviewImg = (props: PreviewImgPropType) => {
  const { coverImgUrl, title } = props
  return (
    <>
      {coverImgUrl ? (
        <img
          src={coverImgUrl}
          alt={`Image of ${title} list`}
          className="h-52 w-full object-cover sm:h-72 sm:rounded-xl"
        />
      ) : (
        <div className="h-52 w-full bg-gradient-to-tr from-custom-orange-300 to-custom-yellow-200 object-cover sm:h-72 sm:rounded-xl"></div>
      )}
    </>
  )
}

const VisibilityIcon = ({ isPublic }: { isPublic: boolean }) => {
  if (isPublic)
    return (
      <div>
        <span className="flex size-10 items-center justify-center rounded-full bg-custom-blue-100">
          <IoGlobeOutline className="size-6 text-custom-blue-400" />
        </span>
      </div>
    )
  else
    return (
      <div>
        <span className="flex size-10 items-center justify-center rounded-full bg-custom-orange-100">
          <IoLockClosedOutline className="size-6 text-custom-orange-500" />
        </span>
      </div>
    )
}

const UserProfileIcon = ({ userImgUrl }: { userImgUrl?: string | null }) => {
  return (
    <div>
      <span className="flex size-10 items-center justify-center rounded-full bg-custom-orange-100">
        {userImgUrl ? (
          <img src={userImgUrl} className="rounded-full" />
        ) : (
          <FaUser className="size-5 text-custom-orange-500" />
        )}
      </span>
    </div>
  )
}

const ListCard = (props: ListCardPropType) => {
  const {
    id,
    title,
    isPublic,
    itemCount,
    coverImgUrl,
    showMenu,
    ownerUsername,
    ownerProfileImgUrl,
    createdAt,
    updatedAt,
  } = props

  const formatTimeAgo = (date: Date) => {
    const parsedDate = dayjs(date) // Ensure date is treated as UTC
    return parsedDate.fromNow()
  }

  const listPath = ownerUsername
    ? `/users/${ownerUsername}/lists/${id}/details`
    : `/lists/${id}/details`
  const profilePath = `/users/${ownerUsername}`

  return (
    <div className="relative w-full">
      <Link
        to={listPath}
        className="absolute z-[10] h-full w-full rounded-xl"
      />
      <PreviewImg coverImgUrl={coverImgUrl} title={title} />
      <div className="mt-3 flex gap-3 px-3 sm:px-0">
        {isPublic && ownerUsername ? (
          <Link to={profilePath} className="z-[11]">
            <UserProfileIcon userImgUrl={ownerProfileImgUrl} />
          </Link>
        ) : (
          <VisibilityIcon isPublic={isPublic} />
        )}

        <div className="flex w-full justify-between">
          <div className="flex flex-col gap-0.5">
            <h2 className="line-clamp-2 overflow-hidden text-ellipsis text-base/6 font-medium md:text-lg/6">
              {title}
            </h2>
            <div className="flex flex-col text-sm/5 text-gray-600 md:text-base/6">
              {isPublic !== null && ownerUsername == null && (
                <span>{isPublic === true ? 'Public' : 'Private'}</span>
              )}
              {ownerUsername && (
                <Link to={profilePath} className="z-[11] hover:font-semibold">
                  @{ownerUsername}
                </Link>
              )}
              <span>
                {itemCount} items • {formatTimeAgo(createdAt)}
              </span>
            </div>
          </div>
          {showMenu && (
            <span className="z-[11]">
              <button
                onClick={() => showMenu()}
                className="z-10 flex size-8 items-center justify-center rounded-full bg-primary-white p-1 hover:bg-gray-200"
              >
                <BsThreeDotsVertical className="size-5" />
              </button>
            </span>
          )}
        </div>
      </div>
    </div>
  )
}

export default ListCard
