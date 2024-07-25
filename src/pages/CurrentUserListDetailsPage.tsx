import { useEffect } from 'react'
import { useInView } from 'react-intersection-observer'
import { useParams } from 'react-router-dom'
import ItemCard from '../components/Card/ItemCard'
import ItemContainer from '../components/Container/ItemContainer'
import ListDetailsCoverImg from '../components/CoverImage/ListDetailsCoverImg'
import ListDetails from '../components/Details/ListDetails'
import EmptyState from '../components/EmptyStates/EmptyState'
import ErrorBanner from '../components/Error/ErrorBanner'
import ItemCreateForm from '../components/Form/CompleteForms/ItemCreateForm'
import ItemUpdateForm from '../components/Form/CompleteForms/ItemUpdateForm'
import Fetching from '../components/Loader/Fetching'
import Loading from '../components/Loader/Loading'
import MenuWithModal from '../components/Menu/MenuWithModal'
import TopNavigation from '../components/Navigation/TopNavigation'
import useCurrentUserListDetailsPage from '../hooks/PagesHooks/useCurrentUserListDetailsPage'
import { useAuth } from '../hooks/useAuth'
import usePageTitle from '../hooks/usePageTitle'

const CurrentUserListDetailsPage = () => {
  const params = useParams()
  const listId = Number(params.listId)

  const { user } = useAuth()

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
    toggleListMenu,
    isOpenCreateForm,
    toggleOpenCreateForm,
    isOpenUpdateForm,
    toggleOpenUpdateForm,
    targetItemId,
    //Delete list
    deleteListAction,
    deleteListIsPending,
    deleteItemAction,
    deleteItemIsPending,
    //Selected list
    targetListInfo,
    setTargetListInfo,
    showListModal,
    setShowListModal,
    toggleShowListModal,
    //Selected item
    targetItemInfo,
    setTargetItemInfo,
    showItemModal,
    setShowItemModal,
    toggleShowItemModal,
    //Menu items
    listMenuItems,
    itemMenuItems,
  } = useCurrentUserListDetailsPage(listId)
  usePageTitle(listDetails?.title ? listDetails.title : 'List details')

  const isOwner = listDetails?.ownerId === user?.id
  const { ref, inView } = useInView()

  useEffect(() => {
    if (inView) fetchNextPage()
  }, [fetchNextPage, inView])

  const renderListItems = () => {
    if (status == 'pending') return <Loading />
    else if (status == 'error') <ErrorBanner error={error} />
    else
      return (
        <>
          {paginatedItems?.pages.map((page) => (
            <ItemContainer key={page.currentPage}>
              {Array.isArray(page.data.items) &&
                page.data.items.length > 0 &&
                page.data.items.map((item, index) => (
                  <li key={index}>
                    <ItemCard
                      {...item}
                      setItem={
                        isOwner
                          ? () => {
                              setTargetItemInfo({
                                id: item.id.toString(),
                                title: item.itemName,
                                img: item.itemUrl,
                              })
                            }
                          : null
                      }
                    />
                  </li>
                ))}
            </ItemContainer>
          ))}
          {paginatedItems?.pages.every(
            (page) =>
              !Array.isArray(page.data.items) || page.data.items.length === 0
          ) && (
            <EmptyState
              title="No items found"
              message="Let's add your first item!"
            />
          )}
          <div ref={ref}>{isFetchingNextPage && <Fetching />}</div>
        </>
      )
  }

  if (listDetailsQueryError)
    return <ErrorBanner error={listDetailsQueryError} />
  else if (isLoadingListDetails) return <Loading />
  else
    return (
      <div className="mb-10 flex flex-grow flex-col">
        <TopNavigation
          title="List details"
          menuFn={
            isOwner
              ? () => {
                  toggleListMenu()
                }
              : null
          }
        />
        {isFetchingListDetails && <Fetching />}
        <ItemCreateForm
          listId={listId}
          isOpen={isOpenCreateForm}
          toggleOpen={toggleOpenCreateForm}
        />
        <ItemUpdateForm
          listId={listId}
          itemId={targetItemId as number}
          isOpen={isOpenUpdateForm}
          toggleOpen={toggleOpenUpdateForm}
        />

        {listDetails && (
          <div className="relative flex flex-grow flex-col items-center">
            <ListDetailsCoverImg
              coverImgUrl={listDetails.coverImgUrl}
              title={listDetails.title}
            />
            <ListDetails data={listDetails} />

            {renderListItems()}

            {/* Add button */}
            {isOwner && (
              <div className="fixed bottom-0 z-[51] mb-24 md:mb-20">
                <button
                  onClick={() => toggleOpenCreateForm()}
                  className="rounded-full bg-custom-blue-400 px-5 py-2 text-sm/6 font-medium text-primary-white drop-shadow hover:bg-custom-blue-300 focus:outline-none focus:ring-4 focus:ring-custom-blue-200 md:text-lg/6"
                >
                  + Add item
                </button>
              </div>
            )}
          </div>
        )}
        {/* List menu + confirmation modal */}
        <MenuWithModal
          targetName="list"
          showModal={Boolean(showListModal && targetListInfo)}
          toggleShowModal={toggleShowListModal}
          modalActionAfterConfirm={() => {
            if (targetListInfo && targetListInfo.id)
              deleteListAction(parseInt(targetListInfo.id))
          }}
          modalActionIsLoading={deleteListIsPending}
          targetInfo={targetListInfo}
          toggleMenu={() => {
            setTargetListInfo(null)
            setShowListModal(false)
          }}
          menuTitle="List options"
          menuItems={listMenuItems}
        />
        {/* Item menu + confirmation modal */}
        <MenuWithModal
          targetName="item"
          showModal={Boolean(showItemModal && targetItemInfo)}
          toggleShowModal={toggleShowItemModal}
          modalActionAfterConfirm={() => {
            if (targetItemInfo && targetItemInfo.id)
              deleteItemAction(parseInt(targetItemInfo.id))
          }}
          modalActionIsLoading={deleteItemIsPending}
          targetInfo={targetItemInfo}
          toggleMenu={() => {
            setTargetItemInfo(null)
            setShowItemModal(false)
          }}
          menuItems={itemMenuItems}
          menuTitle="Item options"
        />
      </div>
    )
}

export default CurrentUserListDetailsPage
