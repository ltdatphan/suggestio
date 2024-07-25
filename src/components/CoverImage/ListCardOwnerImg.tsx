import React from 'react'
import { FaUserCircle } from 'react-icons/fa'

type ListOwnerCoverImgPropsType = {
  fullName?: string
  profileImgUrl?: string | null
}

const ListCardOwnerImg = (
  listOwnerCoverImgProps: ListOwnerCoverImgPropsType
) => {
  const { profileImgUrl, fullName = 'User' } = listOwnerCoverImgProps

  return (
    <>
      {profileImgUrl ? (
        <img
          src={profileImgUrl}
          alt={`${fullName}'s profile`}
          className="inline-block size-6 rounded-full"
        />
      ) : (
        <FaUserCircle className="mr-1 inline-block size-6" />
      )}
    </>
  )
}

export default ListCardOwnerImg
