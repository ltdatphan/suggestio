import { IconType } from 'react-icons'
import { FaRegStar } from 'react-icons/fa6'
import { IoIosLink } from 'react-icons/io'
import { MdOutlineStickyNote2 } from 'react-icons/md'
import SubmitButton from '../../Button/SubmitButton'

type Props = {
  buttonAction: 'create' | 'edit'
  isPending: boolean
  visibleInputs: VisibleInput
  setVisibleInputs: (
    inputType: keyof VisibleInput,
    formKey:
      | keyof models.form.IItemCreateFormProps
      | keyof models.form.IItemEditFormProps,
  ) => void
}

export type VisibleInput = {
  rating: boolean
  notes: boolean
  link: boolean
}

type FormButtonsProps = {
  formKey:
    | keyof models.form.IItemCreateFormProps
    | keyof models.form.IItemEditFormProps
  key: keyof VisibleInput
  srLabel: string
  icon: IconType
}

const formButtonsArr: FormButtonsProps[] = [
  {
    formKey: 'notes',
    key: 'notes',
    srLabel: 'Notes',
    icon: MdOutlineStickyNote2,
  },
  {
    formKey: 'rating',
    key: 'rating',
    srLabel: 'Rating',
    icon: FaRegStar,
  },
  {
    formKey: 'itemUrl',
    key: 'link',
    srLabel: 'Link',
    icon: IoIosLink,
  },
]

const ItemFormButtons = (props: Props) => {
  return (
    <div className="sticky bottom-0 left-0 right-0 flex flex-row justify-between bg-custom-orange-100 px-5 py-2.5">
      <div className="flex flex-row gap-2">
        {formButtonsArr.map((btn, i) => (
          <button
            type="button"
            key={i}
            data-active={props.visibleInputs[btn.key] ? 'true' : null}
            onClick={() => props.setVisibleInputs(btn.key, btn.formKey)}
            className="group rounded-md bg-primary-white p-3 drop-shadow hover:bg-gray-100 focus:outline-none data-[active=true]:bg-custom-orange-300"
          >
            <btn.icon className="size-5 fill-gray-400 group-data-[active=true]:fill-primary-white" />
          </button>
        ))}
      </div>
      <div className="w-1/3">
        <SubmitButton isLoading={props.isPending}>
          {props.buttonAction === 'create' ? 'Add' : 'Update'}
        </SubmitButton>
      </div>
    </div>
  )
}

export default ItemFormButtons
