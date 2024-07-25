import { useEffect } from 'react'
import { FaUserCheck } from 'react-icons/fa6'
import { useInView } from 'react-intersection-observer'
import { useParams } from 'react-router-dom'
import SubmitButton from '../components/Button/SubmitButton'
import ListCard from '../components/Card/ListCard'
import ListContainer from '../components/Container/ListContainer'
import ProfileDetails from '../components/Details/ProfileDetails'
import EmptyState from '../components/EmptyStates/EmptyState'
import ErrorBanner from '../components/Error/ErrorBanner'
import Fetching from '../components/Loader/Fetching'
import Loading from '../components/Loader/Loading'
import TopNavigation from '../components/Navigation/TopNavigation'
import useOtherUserProfilePage from '../hooks/PagesHooks/useOtherUserProfilePage'
import { useAuth } from '../hooks/useAuth'
import usePageTitle from '../hooks/usePageTitle'

const OtherUserProfilePage = () => {
  const { user } = useAuth()
  const params = useParams()
  const username = String(params?.username)

  const {
    isLoadingProfile,
    isFetchingProfile,
    profile,
    profileQueryError,
    status,
    data,
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
  } = useOtherUserProfilePage(username)

  const { ref, inView } = useInView()

  useEffect(() => {
    if (inView) fetchNextPage()
  }, [fetchNextPage, inView])

  const renderLists = () => {
    if (status == 'pending') return <Loading />
    else if (status == 'error') return <ErrorBanner error={error} />
    else
      return (
        <>
          {data?.pages.map((page) => (
            <ListContainer key={page.currentPage}>
              {Array.isArray(page.data.lists) &&
                page.data.lists.length > 0 &&
                page.data.lists.map((list, index) => (
                  <li key={index}>
                    <ListCard {...list} />
                  </li>
                ))}
            </ListContainer>
          ))}
          {data?.pages.every(
            (page) =>
              !Array.isArray(page.data.lists) || page.data.lists.length === 0
          ) && (
            <EmptyState
              title="No lists found"
              message="Seems like there's nothing here :("
            />
          )}
          <div ref={ref}>{isFetchingNextPage && <Fetching />}</div>
        </>
      )
  }

  usePageTitle(
    profile?.firstName && profile?.lastName && profile?.username
      ? `@${profile.username} - ${profile.firstName} ${profile.lastName} profile `
      : 'User profile'
  )

  const isCurrentUser =
    profile?.username == user?.username ||
    (profile?.isFollowedByCurrentUser == null &&
      profile?.isFollowingCurrentUser == null)

  if (isLoadingProfile) return <Loading />
  else if (profileQueryError) return <ErrorBanner error={profileQueryError} />
  else
    return (
      <div className="mb-10 flex w-full flex-grow flex-col">
        <TopNavigation
          title={
            profile?.firstName && profile?.lastName
              ? `${profile.firstName} ${profile.lastName}`
              : 'My Profile'
          }
        />
        {isFetchingProfile && <Fetching />}
        {profile && (
          <>
            <ProfileDetails profile={profile} />
            <div className="mb-5 flex justify-center gap-6">
              {!isCurrentUser &&
                (!profile.isFollowedByCurrentUser ? (
                  <SubmitButton
                    onClick={() => followFn(profile.id)}
                    isLoading={isFollowPending}
                    className="max-w-32"
                  >
                    Follow
                  </SubmitButton>
                ) : (
                  <SubmitButton
                    onClick={() => unfollowFn(profile.id)}
                    isLoading={isUnfollowPending}
                    className="w-12 max-w-28 bg-gray-200 hover:bg-gray-300 disabled:bg-gray-200"
                  >
                    <FaUserCheck className="size-5" />
                  </SubmitButton>
                ))}
              {profile.isFollowingCurrentUser && (
                <SubmitButton
                  className="max-w-36 bg-gray-200 font-medium hover:bg-gray-100 disabled:bg-gray-200"
                  // disabled
                >
                  Follows you
                </SubmitButton>
              )}
            </div>
            {renderLists()}
          </>
        )}
      </div>
    )
}

export default OtherUserProfilePage
