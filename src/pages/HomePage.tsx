import { useEffect } from 'react'
import { useInView } from 'react-intersection-observer'
import { useNavigate } from 'react-router-dom'
import ListCard from '../components/Card/ListCard'
import ListContainer from '../components/Container/ListContainer'
import EmptyState from '../components/EmptyStates/EmptyState'
import ErrorBanner from '../components/Error/ErrorBanner'
import Fetching from '../components/Loader/Fetching'
import Loading from '../components/Loader/Loading'
import { TargetInfoType } from '../components/Menu/GenericMenu'
import MenuWithModal from '../components/Menu/MenuWithModal'
import useHomePage from '../hooks/PagesHooks/useHomePage'
import usePageTitle from '../hooks/usePageTitle'

const HomePage = () => {
  const navigate = useNavigate()
  usePageTitle('Home')
  const {
    status,
    data,
    error,
    fetchNextPage,
    isFetchingNextPage,
    //Delete list
    deleteFn,
    deleteIsPending,
    //Selected list
    targetInfo,
    setTargetInfo,
    showModal,
    setShowModal,
    toggleShowModal,
    //Menu items
    menuItems,
  } = useHomePage()

  const { ref, inView } = useInView()

  useEffect(() => {
    if (inView) fetchNextPage()
  }, [fetchNextPage, inView])

  if (status === 'pending') return <Loading />
  else if (status === 'error') return <ErrorBanner error={error} />
  else
    return (
      <div className="mb-10 flex w-full flex-grow flex-col">
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
            variant="empty"
            title="No lists found"
            message="Let's create your first list"
            buttonLabel="Create a list"
            buttonFunc={() => navigate('/add')}
          />
        )}
        <div ref={ref}>{isFetchingNextPage && <Fetching />}</div>
        <MenuWithModal
          targetName="list"
          showModal={Boolean(showModal && targetInfo)}
          toggleShowModal={toggleShowModal}
          modalActionAfterConfirm={() => {
            if (targetInfo && targetInfo.id) deleteFn(parseInt(targetInfo.id))
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

export default HomePage
