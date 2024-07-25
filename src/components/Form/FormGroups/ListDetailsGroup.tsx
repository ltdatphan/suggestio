import React from 'react'
import { Control, Controller } from 'react-hook-form'
import { IoGlobeOutline, IoLockClosedOutline } from 'react-icons/io5'
import Input from '../FormComponents/Input'
import Radio from '../FormComponents/Radio'
import TextArea from '../FormComponents/TextArea'

type Props = {
  control: Control<
    models.form.IListCreateFormProps | models.form.IListEditFormProps
  >
}

const visibilityOptions = [
  {
    label: 'Public',
    value: 'public',
    description: 'Visible to anyone',
    icon: IoGlobeOutline,
  },
  {
    label: 'Private',
    value: 'private',
    description: 'Only visible to you',
    icon: IoLockClosedOutline,
  },
]

const ListDetailsGroup = (props: Props) => {
  const { control } = props
  return (
    <div className="flex flex-col gap-2.5">
      <Controller
        name="title"
        control={control}
        rules={{ required: 'List name is required' }}
        render={({
          field: { name, onChange, value },
          fieldState: { error },
        }) => (
          <Input
            label="List name"
            placeholder="Top cafes in Toronto, Must watch movies, ..."
            type="text"
            name={name}
            onChange={onChange}
            value={value}
            error={error}
          />
        )}
      />

      <Controller
        name="visibility"
        control={control}
        rules={{ required: 'Please select visibility' }}
        render={({
          field: { name, onChange, value },
          fieldState: { error },
        }) => (
          <>
            <Radio
              label="Visibility"
              name={name}
              radioItems={visibilityOptions}
              onChange={onChange}
              value={value}
              error={error}
            />
          </>
        )}
      />

      <Controller
        name="subtitle"
        control={control}
        // rules={}
        render={({
          field: { name, onChange, value },
          fieldState: { error },
        }) => (
          <>
            <TextArea
              label="Description (optional)"
              description="Tell us more about your list"
              name={name}
              onChange={onChange}
              value={value}
              error={error}
            />
          </>
        )}
      />
    </div>
  )
}

export default ListDetailsGroup
