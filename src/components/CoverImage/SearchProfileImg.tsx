import { FaUserCircle } from 'react-icons/fa'

type Props = {
  profileImgUrl?: string | null
  name: string
}

const SearchProfileImg = (props: Props) => {
  const { profileImgUrl, name } = props
  return (
    <div className="flex size-10 items-center justify-center">
      <div>
        {profileImgUrl ? (
          <img
            src={profileImgUrl}
            alt={`Profile image of ${name}`}
            className="size-8 rounded-full"
          />
        ) : (
          <FaUserCircle className="size-8 rounded-full" />
        )}
      </div>
    </div>
  )
}

export default SearchProfileImg
