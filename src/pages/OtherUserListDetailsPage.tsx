import { useEffect } from 'react'
import { useInView } from 'react-intersection-observer'
import { useParams } from 'react-router-dom'
import ItemCard from '../components/Card/ItemCard'
import ItemContainer from '../components/Container/ItemContainer'
import ListDetailsCoverImg from '../components/CoverImage/ListDetailsCoverImg'
import ListDetails from '../components/Details/ListDetails'
import EmptyState from '../components/EmptyStates/EmptyState'
import ErrorBanner from '../components/Error/ErrorBanner'
import Fetching from '../components/Loader/Fetching'
import Loading from '../components/Loader/Loading'
import TopNavigation from '../components/Navigation/TopNavigation'
import useOtherUserListDetailsPage from '../hooks/PagesHooks/useOtherUserListDetailsPage'
import usePageTitle from '../hooks/usePageTitle'

const OtherUserListDetailsPage = () => {
  const params = useParams()
  const listId = Number(params.listId)

  const {
    isLoadingListDetails,
    isFetchingListDetails,
    listDetails,
    listDetailsQueryError,
    paginatedItems,
    status,
    error,
    fetchNextPage,
    isFetchingNextPage,
  } = useOtherUserListDetailsPage(listId)
  usePageTitle(listDetails?.title ? listDetails.title : 'List details')

  const { ref, inView } = useInView()

  useEffect(() => {
    if (inView) fetchNextPage()
  }, [fetchNextPage, inView])

  const renderListItems = () => {
    if (status == 'pending') return <Loading />
    else if (status == 'error') return <ErrorBanner error={error} />
    else
      return (
        <>
          {paginatedItems?.pages.map((page) => (
            <ItemContainer key={page.currentPage}>
              {Array.isArray(page.data.items) &&
                page.data.items.length > 0 &&
                page.data.items.map((item, index) => (
                  <li key={index}>
                    <ItemCard {...item} />
                  </li>
                ))}
            </ItemContainer>
          ))}
          {paginatedItems?.pages.every(
            (page) =>
              !Array.isArray(page.data.items) || page.data.items.length === 0,
          ) && (
            <EmptyState
              title="No items found"
              message="Let's add your first item!"
            />
          )}
          <div ref={ref}>{isFetchingNextPage && <Fetching />}</div>
          {/* {Array.isArray(listItems) &&
            (listItems.length > 0 ? (
              <ItemContainer>
                {listItems.map((item, i) => (
                  <li key={i}>
                    <ItemCard {...item} />
                  </li>
                ))}
              </ItemContainer>
            ) : (
              <li>
                <EmptyState
                  title="No items found"
                  message="Seems like there's nothing here :("
                />
              </li>
            ))} */}
        </>
      )
  }

  if (listDetailsQueryError)
    return <ErrorBanner error={listDetailsQueryError} />
  else if (isLoadingListDetails) return <Loading />
  else
    return (
      <div className="mb-10 flex flex-grow flex-col">
        <TopNavigation title="List details" />
        {isFetchingListDetails && <Fetching />}

        {listDetails && (
          <div className="relative flex flex-grow flex-col">
            <ListDetailsCoverImg
              coverImgUrl={listDetails.coverImgUrl}
              title={listDetails.title}
            />
            <ListDetails data={listDetails} />
            {renderListItems()}
          </div>
        )}
      </div>
    )
}

export default OtherUserListDetailsPage
