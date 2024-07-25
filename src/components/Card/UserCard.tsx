import { Link } from 'react-router-dom'
import SearchProfileImg from '../CoverImage/SearchProfileImg'

type Props = {
  firstName: string
  lastName: string
  username: string
  profileImgUrl?: string | null
}

const UserCard = (props: Props) => {
  const { firstName, lastName, username, profileImgUrl } = props
  return (
    <Link to={`/users/${username}`}>
      <div className="flex w-full items-center justify-center rounded-lg px-2 py-1 hover:bg-gray-200 focus:bg-gray-200">
        <SearchProfileImg
          profileImgUrl={profileImgUrl}
          name={`${firstName} ${lastName}`}
        />
        <div className="ml-2.5 flex w-full flex-col text-base/6">
          <span className="font-medium">{username}</span>
          <span className="font-light">
            {firstName} {lastName}
          </span>
        </div>
      </div>
    </Link>
  )
}

export default UserCard
