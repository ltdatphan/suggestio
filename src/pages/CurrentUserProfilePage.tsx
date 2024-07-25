import { useEffect } from 'react'
import { useInView } from 'react-intersection-observer'
import { useNavigate } from 'react-router-dom'
import ListCard from '../components/Card/ListCard'
import ListContainer from '../components/Container/ListContainer'
import ProfileDetails from '../components/Details/ProfileDetails'
import EmptyState from '../components/EmptyStates/EmptyState'
import ErrorBanner from '../components/Error/ErrorBanner'
import Fetching from '../components/Loader/Fetching'
import Loading from '../components/Loader/Loading'
import { TargetInfoType } from '../components/Menu/GenericMenu'
import MenuWithModal from '../components/Menu/MenuWithModal'
import TopNavigation from '../components/Navigation/TopNavigation'
import useCurrentUserProfilePage from '../hooks/PagesHooks/useCurrentUserProfilePage'
import usePageTitle from '../hooks/usePageTitle'

const CurrentUserProfilePage = () => {
  const navigate = useNavigate()
  usePageTitle('My profile')
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
    deleteAction,
    deleteIsPending,
    //
    targetInfo,
    setTargetInfo,
    showModal,
    setShowModal,
    toggleShowModal,
    menuItems,
  } = useCurrentUserProfilePage()

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
                    <ListCard
                      showMenu={() => {
                        const targetInfo: TargetInfoType = {
                          id: String(list.id),
                          title: list.title,
                          img: list.coverImgUrl,
                        }
                        setTargetInfo(targetInfo)
                      }}
                      {...list}
                    />
                  </li>
                ))}
            </ListContainer>
          ))}
          {data?.pages.every(
            (page) =>
              !Array.isArray(page.data.lists) || page.data.lists.length === 0
          ) && (
            <EmptyState
              variant="add-friends"
              title="No lists found"
              message="Follow other users to see their lists here"
              buttonLabel="Search and follow other users"
              buttonFunc={() => navigate('/explore')}
            />
          )}
          <div ref={ref}>{isFetchingNextPage && <Fetching />}</div>
        </>
      )
  }

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
            {renderLists()}
          </>
        )}
        <MenuWithModal
          targetName="list"
          showModal={Boolean(showModal && targetInfo)}
          toggleShowModal={toggleShowModal}
          modalActionAfterConfirm={() => {
            if (targetInfo && targetInfo.id)
              deleteAction(parseInt(targetInfo.id))
          }}
          modalActionIsLoading={deleteIsPending}
          targetInfo={targetInfo}
          toggleMenu={() => {
            setTargetInfo(null)
            setShowModal(false)
          }}
          menuTitle="List options"
          menuItems={menuItems}
        />
      </div>
    )
}

export default CurrentUserProfilePage
