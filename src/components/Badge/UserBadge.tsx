import React from 'react'
import { Link } from 'react-router-dom'
import ListCardOwnerImg from '../CoverImage/ListCardOwnerImg'

type UserBadgePropTypes = {
  fullName?: string
  username: string
  profileImgUrl?: string | null
}

const UserBadge = (UserBadgeProps: UserBadgePropTypes) => {
  const { username, profileImgUrl } = UserBadgeProps

  return (
    <Link
      to={`/users/${username}`}
      className="group z-10 flex items-center gap-1"
    >
      <ListCardOwnerImg profileImgUrl={profileImgUrl} />
      <span className="font-medium group-hover:underline">@{username}</span>
    </Link>
  )
}

export default UserBadge
