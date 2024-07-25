import { useEffect } from 'react'
import { useInView } from 'react-intersection-observer'
import { useNavigate } from 'react-router-dom'
import ListCard from '../components/Card/ListCard'
import ListContainer from '../components/Container/ListContainer'
import EmptyState from '../components/EmptyStates/EmptyState'
import ErrorBanner from '../components/Error/ErrorBanner'
import Fetching from '../components/Loader/Fetching'
import Loading from '../components/Loader/Loading'
import useFollowingPage from '../hooks/PagesHooks/useFollowingPage'
import usePageTitle from '../hooks/usePageTitle'

const FollowingPage = () => {
  const navigate = useNavigate()
  usePageTitle('Following')
  const { data, status, error, fetchNextPage, isFetchingNextPage } =
    useFollowingPage()

  const { ref, inView } = useInView()

  useEffect(() => {
    if (inView) fetchNextPage()
  }, [fetchNextPage, inView])

  if (status == 'pending') return <Loading />
  else if (status == 'error') return <ErrorBanner error={error} />
  else
    return (
      <div className="mb-10 flex w-full flex-grow flex-col">
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
            !Array.isArray(page.data.lists) || page.data.lists.length === 0,
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
      </div>
    )
}

export default FollowingPage
