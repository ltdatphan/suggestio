import { BsThreeDots } from 'react-icons/bs'
import { Link } from 'react-router-dom'
import { VisibilityBadge } from '../Badge/VisibilityBadge'
import ListCardPreviewImg from '../CoverImage/ListCardPreviewImg'

const CurrentUserListCard = (
  props: models.list.IBasicListResponseProps & { showMenu?: () => void }
) => {
  const { id, title, isPublic, coverImgUrl, showMenu } = props

  return (
    <div className="relative w-full rounded-xl border-[1px] border-light-gray bg-white drop-shadow">
      <Link
        to={`/lists/${id}/details`}
        className="absolute z-10 -m-2.5 h-full w-full"
      />
      <div className="relative">
        <ListCardPreviewImg coverImgUrl={coverImgUrl} title={title} />
        {showMenu && (
          <button
            onClick={() => showMenu()}
            className="fixed right-0 top-0 z-10 mr-5 mt-5 rounded-full bg-primary-white p-1"
          >
            <BsThreeDots className="size-5" />
          </button>
        )}
      </div>
      <div className="space-y-1 py-2">
        <h2 className="text-lg font-medium">{title}</h2>
        <div className="flex w-full justify-between">
          <VisibilityBadge isPublic={isPublic} />
        </div>
      </div>
    </div>
  )
}

export default CurrentUserListCard
