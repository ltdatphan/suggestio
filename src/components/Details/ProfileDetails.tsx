import ProfileImg from '../CoverImage/ProfileImg'

type Props = {
  profile: models.user.IUserProfileResponseProps
}

const ProfileDetails = (props: Props) => {
  const { profile } = props
  return (
    <div className="mb-5 mt-5 flex w-full flex-col items-center justify-center gap-4">
      <ProfileImg
        profileImgUrl={profile.profileImgUrl}
        name={`${profile.firstName} ${profile.lastName}`}
      />
      <span className="text-xl font-medium">{`@${profile.username}`}</span>
      <div className="mx-auto grid grid-cols-3 gap-8">
        <div className="flex flex-col items-center">
          <span className="font-extrabold">{profile.listCount}</span>
          <span className="text-gray-400">Lists</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="font-extrabold">{profile.followersCount}</span>
          <span className="text-gray-400">Followers</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="font-extrabold">{profile.followingsCount}</span>
          <span className="text-gray-400">Following</span>
        </div>
      </div>
    </div>
  )
}

export default ProfileDetails
