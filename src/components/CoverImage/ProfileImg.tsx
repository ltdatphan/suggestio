import React from 'react'
import { FaUserCircle } from 'react-icons/fa'

type Props = {
  profileImgUrl?: string | null
  name: string
}

const ProfileImg = (props: Props) => {
  const { profileImgUrl, name } = props
  return (
    <>
      {profileImgUrl ? (
        <img
          src={profileImgUrl}
          alt={`Profile image of ${name}`}
          className="h-28 rounded-full"
        />
      ) : (
        <FaUserCircle className="size-28 rounded-full" />
      )}
    </>
  )
}

export default ProfileImg
