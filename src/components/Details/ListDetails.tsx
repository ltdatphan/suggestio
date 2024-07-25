import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { FaClipboard, FaClock, FaUser } from 'react-icons/fa6'
import { IoGlobe, IoLockClosed } from 'react-icons/io5'
import { Link } from 'react-router-dom'

dayjs.extend(relativeTime)

type Props = {
  data: models.list.IGeneralListResponseProps
}

const formatDateTime = (date: Date) => {
  const parsedDate = dayjs(date)
  return parsedDate.format('YYYY-MM-DD h:m A')
}

const formatTimeAgo = (date: Date) => {
  const parsedDate = dayjs(date) // Ensure date is treated as UTC
  return parsedDate.fromNow()
}

const UserProfileIcon = ({ userImgUrl }: { userImgUrl?: string | null }) => {
  return (
    <div className="inline">
      <span className="flex size-8 items-center justify-center rounded-full bg-custom-orange-100">
        {userImgUrl ? (
          <img src={userImgUrl} className="rounded-full" />
        ) : (
          <FaUser className="size-5 text-custom-orange-500" />
        )}
      </span>
    </div>
  )
}

const ListDetails = (props: Props) => {
  const {
    title,
    subtitle,
    isPublic,
    itemCount,
    createdAt,
    // updatedAt,
    ownerUsername,
    ownerProfileImgUrl,
  } = props.data

  return (
    <div className="my-5 flex w-full flex-col px-5">
      <h1 className="mb-1 text-2xl/6 font-bold md:text-3xl/10">{title}</h1>
      {isPublic && ownerUsername && (
        <Link
          to={`/users/${ownerUsername}`}
          className="my-2 flex items-center text-lg/6 hover:underline md:text-xl/6"
        >
          <UserProfileIcon userImgUrl={ownerProfileImgUrl} />@{ownerUsername}
        </Link>
      )}
      <span className="text-lg/6 font-medium text-gray-500 md:text-xl/6">
        {subtitle}
      </span>
      <div className="mt-2 flex flex-col gap-0.5 text-base/6 md:text-lg/6">
        {isPublic ? (
          <span className="flex w-fit items-center text-custom-blue-400">
            <IoGlobe className="mr-1 inline size-5" /> Public
          </span>
        ) : (
          <span className="flex w-fit items-center text-custom-orange-600">
            <IoLockClosed className="mr-1 inline size-5" /> Private
          </span>
        )}
        <span className="flex w-fit items-center">
          <FaClipboard className="mr-1 inline size-5" />
          {itemCount} items
        </span>
        <span className="group flex items-center">
          <FaClock className="mr-1 inline size-5" /> Created
          <span className="ml-1 group-hover:hidden">
            {formatTimeAgo(createdAt)}
          </span>
          <span className="ml-1 hidden group-hover:block">
            {formatDateTime(createdAt)}
          </span>
        </span>
        {/*
        <span className="group flex items-center">
          <FaPen className="mr-1 inline size-5" /> Updated
          <span className="ml-1 group-hover:hidden">{formatTimeAgo(updatedAt)}</span>
          <span className="ml-1 hidden group-hover:block">{formatDateTime(updatedAt)}</span>
        </span> */}
      </div>
    </div>
  )
}

export default ListDetails
