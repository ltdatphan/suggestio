import { Control, Controller } from 'react-hook-form'
import {
  FaBookOpen,
  FaDumbbell,
  FaFaceGrinStars,
  FaLocationDot,
} from 'react-icons/fa6'
import { IoGlasses } from 'react-icons/io5'
import { RiMovie2Fill } from 'react-icons/ri'
import PrimaryButton from '../../Button/PrimaryButton'
import Radio from '../FormComponents/Radio'

type Props = {
  control: Control<
    models.form.IListCreateFormProps | models.form.IListEditFormProps
  >
  nextStepFn: () => void
}

const categories = [
  {
    label: 'Places',
    value: 'places',
    description: 'Restaurants, cafes',
    icon: FaLocationDot,
  },
  {
    label: 'TV & Movies',
    value: 'tv',
    description: 'Movies, shows',
    icon: RiMovie2Fill,
  },
  {
    label: 'Books',
    value: 'books',
    description: 'Reading list, reviews',
    icon: FaBookOpen,
  },
  {
    label: 'Fitness',
    value: 'fitness',
    description: 'Workouts, nutrition',
    icon: FaDumbbell,
  },
  {
    label: 'Products',
    value: 'products',
    description: 'Fashion, tech',
    icon: IoGlasses,
  },
  {
    label: 'Other',
    value: 'other',
    description: 'For everything else',
    icon: FaFaceGrinStars,
  },
]

const ListCategoryRadioGroup = (props: Props) => {
  const { control, nextStepFn } = props
  return (
    <div className="flex flex-col items-center gap-3.5">
      <h1 className="text-xl font-semibold">Choose list type</h1>
      <Controller
        name="listType"
        control={control}
        rules={{ required: 'Please select category' }}
        render={({
          field: { name, onChange, value },
          fieldState: { error },
        }) => (
          <>
            <Radio
              name={name}
              radioItems={categories}
              onChange={onChange}
              value={value}
              error={error}
            />
            <PrimaryButton
              disabled={value === '' ? true : false}
              onClick={() => nextStepFn()}
            >
              Next
            </PrimaryButton>
          </>
        )}
      />
    </div>
  )
}

export default ListCategoryRadioGroup
