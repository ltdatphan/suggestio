import { useParams } from 'react-router-dom'
import SubmitButton from '../components/Button/SubmitButton'
import ErrorBanner from '../components/Error/ErrorBanner'
import ListCategoryRadioGroup from '../components/Form/FormGroups/ListCategoryRadioGroup'
import ListDetailsGroup from '../components/Form/FormGroups/ListDetailsGroup'
import Fetching from '../components/Loader/Fetching'
import Loading from '../components/Loader/Loading'
import TopNavigation from '../components/Navigation/TopNavigation'
import useUpdateListPage from '../hooks/PagesHooks/useUpdateListPage'
import usePageTitle from '../hooks/usePageTitle'

const UpdateListPage = () => {
  const params = useParams()
  const listId = Number(params.listId)

  const {
    listTitle,
    currStep,
    nextStep,
    previousStep,
    control,
    isFetchingListDetails,
    isLoadingListDetails,
    listDetailsQueryError,
    updateIsPending,
    updateError,
    handleSubmit,
  } = useUpdateListPage(listId)

  usePageTitle(listTitle ? `Edit ${listTitle}` : 'Edit list')

  if (isLoadingListDetails) return <Loading />
  else if (listDetailsQueryError)
    return <ErrorBanner error={listDetailsQueryError} />
  else
    return (
      <div className="flex flex-grow flex-col">
        <TopNavigation
          title="Edit List"
          currStep={currStep}
          previousFn={previousStep}
        />
        {isFetchingListDetails && <Fetching />}

        <form onSubmit={handleSubmit} className="px-5">
          {/* Step 1: Choose category */}
          {currStep == 1 && (
            <ListCategoryRadioGroup control={control} nextStepFn={nextStep} />
          )}

          {/* Step 2: Fill in list details */}
          {currStep == 2 && (
            <>
              <ListDetailsGroup control={control} />
              {updateError?.message && (
                <div className="mb-2 mt-2 text-sm text-red-500">
                  {updateError?.message}
                </div>
              )}
              <SubmitButton className="mt-2.5" isLoading={updateIsPending}>
                Update list
              </SubmitButton>
            </>
          )}
        </form>
      </div>
    )
}

export default UpdateListPage
