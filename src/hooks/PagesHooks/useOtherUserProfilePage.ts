import useFollowAction from '../ApiHooks/useFollowAction'
import useGetUserListsByUsername from '../ApiHooks/useGetUserListsByUsername'
import useGetUserProfileByUsername from '../ApiHooks/useGetUserProfileByUsername'
import useUnfollowAction from '../ApiHooks/useUnfollowAction'

const useOtherUserProfilePage = (username: string) => {
  const {
    isLoading: isLoadingProfile,
    isFetching: isFetchingProfile,
    data: profile,
    error: profileQueryError,
  } = useGetUserProfileByUsername(username)

  const fetchedUserId = profile?.id

  const { data, status, error, fetchNextPage, isFetchingNextPage } =
    useGetUserListsByUsername(username, !!fetchedUserId)

  const {
    isPending: isFollowPending,
    data: followData,
    error: followError,
    mutate: followFn,
  } = useFollowAction(profile?.username ? profile.username : '')

  const {
    isPending: isUnfollowPending,
    data: unfollowData,
    error: unfollowError,
    mutate: unfollowFn,
  } = useUnfollowAction(profile?.username ? profile.username : '')

  return {
    isLoadingProfile,
    isFetchingProfile,
    profile,
    profileQueryError,
    data,
    status,
    error,
    fetchNextPage,
    isFetchingNextPage,

    //Follow and unfollow
    isFollowPending,
    followError,
    followFn,
    isUnfollowPending,
    unfollowError,
    unfollowFn,
  }
}

export default useOtherUserProfilePage
