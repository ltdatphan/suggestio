import { useEffect } from 'react'
import { Controller } from 'react-hook-form'
import { useInView } from 'react-intersection-observer'
import ListCard from '../components/Card/ListCard'
import UserCard from '../components/Card/UserCard'
import ListContainer from '../components/Container/ListContainer'
import UserContainer from '../components/Container/UserContainer'
import EmptyState from '../components/EmptyStates/EmptyState'
import ErrorBanner from '../components/Error/ErrorBanner'
import Search from '../components/Form/FormComponents/Search'
import SearchListBox from '../components/Form/FormComponents/SearchListBox'
import Fetching from '../components/Loader/Fetching'
import Loading from '../components/Loader/Loading'
import useSearchResultPage from '../hooks/PagesHooks/useSearchResultPage'
import usePageTitle from '../hooks/usePageTitle'

const SearchResultPage = () => {
  const {
    query,
    data,
    status,
    error,
    fetchNextPage,
    isFetchingNextPage,
    control,
    watch,
    handleSubmit,
  } = useSearchResultPage()

  usePageTitle(`Search result for '${query}'`)
  const { ref, inView } = useInView()

  useEffect(() => {
    if (inView) fetchNextPage()
  }, [fetchNextPage, inView])

  if (status == 'pending') return <Loading />
  else if (status == 'error') return <ErrorBanner error={error} />
  else
    return (
      // md:mx-auto md:max-w-[36rem]
      <div className="mb-10 mt-2.5 flex w-full flex-grow flex-col px-2">
        <form
          onSubmit={handleSubmit}
          className="mx-auto mb-2 w-full md:mb-5 md:max-w-[36rem]"
        >
          <div className="flex w-full">
            <Controller
              name="searchType"
              control={control}
              rules={{ required: 'Please enter search query' }}
              render={({
                         field: { name, onChange, value },
                         fieldState: { error },
                       }) => (
                <SearchListBox
                  name={name}
                  onChange={onChange}
                  value={value}
                  error={error}
                />
              )}
            />
            <Controller
              name="query"
              control={control}
              rules={{ required: 'Please enter search query' }}
              render={({
                         field: { name, onChange, value },
                         fieldState: { error },
                       }) => (
                <Search
                  label="Search input"
                  name={name}
                  onChange={onChange}
                  value={value}
                  error={error}
                  target={watch('searchType')}
                />
              )}
            />
          </div>
        </form>
        {data.targetType === 'users' && (
          <>
            {data.usersData?.pages.map((page) => (
              <UserContainer key={page.currentPage}>
                {Array.isArray(page.data.users) &&
                  page.data.users.length > 0 &&
                  page.data.users.map((user, index) => (
                    <li key={index}>
                      <UserCard
                        firstName={user.firstName}
                        lastName={user.lastName}
                        username={user.username}
                        profileImgUrl={user.profileImgUrl}
                      />
                    </li>
                  ))}
              </UserContainer>
            ))}
            {data.usersData?.pages.every(
              (page) =>
                !Array.isArray(page.data.users) || page.data.users.length === 0,
            ) && (
              <EmptyState
                title={`No results for "${query}"`}
                message="We couldn't find any users. Please try a different query."
              />
            )}
            <div ref={ref}>{isFetchingNextPage && <Fetching />}</div>
          </>
        )}

        {data.targetType === 'lists' && (
          <>
            {data.listsData?.pages.map((page) => (
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
            {data.listsData?.pages.every(
              (page) =>
                !Array.isArray(page.data.lists) || page.data.lists.length === 0,
            ) && (
              <EmptyState
                title={`No results for "${query}"`}
                message="We couldn't find any lists. Please try a different query."
              />
            )}
            <div ref={ref}>{isFetchingNextPage && <Fetching />}</div>
          </>
        )}
      </div>
    )
}

export default SearchResultPage
