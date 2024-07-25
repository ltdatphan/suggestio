import React from 'react'
import { Link } from 'react-router-dom'
import UserBadge from '../Badge/UserBadge'
import ListCardPreviewImg from '../CoverImage/ListCardPreviewImg'

const OtherUserListCard = (props: models.list.IPublicListResponseProps) => {
  const { id, title, coverImgUrl, ownerUsername, ownerProfileImgUrl } = props

  let path = `/following/lists/${id}/details`
  if ('ownerUsername' in props) {
    path = `/users/${props.ownerUsername}/lists/${id}/details`
  }

  return (
    <div className="relative w-full rounded-xl border-[1px] border-light-gray bg-white drop-shadow">
      <Link to={path} className="absolute z-10 -m-2.5 h-full w-full" />
      <div className="relative">
        <ListCardPreviewImg coverImgUrl={coverImgUrl} title={title} />
      </div>
      <div className="space-y-1 py-2">
        <h2 className="text-lg font-medium">{title}</h2>
        <div className="flex w-full justify-between">
          {'ownerUsername' in props ? (
            <UserBadge
              // fullName={props.ownerFullName}
              username={props.ownerUsername}
              profileImgUrl={props.ownerProfileImgUrl}
            />
          ) : null}
        </div>
      </div>
    </div>
  )
}

export default OtherUserListCard
