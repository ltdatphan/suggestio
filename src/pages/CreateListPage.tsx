import SubmitButton from '../components/Button/SubmitButton'
import ListCategoryRadioGroup from '../components/Form/FormGroups/ListCategoryRadioGroup'
import ListDetailsGroup from '../components/Form/FormGroups/ListDetailsGroup'
import TopNavigation from '../components/Navigation/TopNavigation'
import useCreateListPage from '../hooks/PagesHooks/useCreateListPage'
import usePageTitle from '../hooks/usePageTitle'

const CreateListPage = () => {
  usePageTitle('Create list')
  const {
    control,
    handleSubmit,
    currStep,
    nextStep,
    previousStep,
    isPending,
    error,
  } = useCreateListPage()

  return (
    <div className="h-full w-full">
      <TopNavigation
        title="New List"
        currStep={currStep}
        previousFn={previousStep}
      />
      <form onSubmit={handleSubmit} className="px-5">
        {/* Form name + previous step button */}

        {/* Step 1: Choose category */}
        {currStep == 1 && (
          <ListCategoryRadioGroup control={control} nextStepFn={nextStep} />
        )}

        {/* Step 2: Fill in list details */}
        {currStep == 2 && (
          <>
            <ListDetailsGroup control={control} />
            {error?.message && (
              <div className="mb-2 mt-2 text-sm text-red-500">
                {error?.message}
              </div>
            )}
            <SubmitButton className="mt-2.5" isLoading={isPending}>
              Create list
            </SubmitButton>
          </>
        )}
      </form>
    </div>
  )
}

export default CreateListPage
