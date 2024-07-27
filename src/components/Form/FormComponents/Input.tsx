import {
  Description,
  Field,
  Input as HeadlessInput,
  Label,
} from '@headlessui/react'
import React from 'react'
import { ControllerFieldState, ControllerRenderProps } from 'react-hook-form'

type SpecificInputType = {
  label?: string
  description?: string
}

type PropType = SpecificInputType &
  Partial<ControllerRenderProps> &
  Partial<ControllerFieldState> &
  React.ComponentProps<'input'>

const Input = (props: PropType) => {
  return (
    <div className="mb-3">
      <Field>
        {props.label && (
          <Label className="block text-sm/6 font-medium text-primary-black">
            {props.label}
          </Label>
        )}

        {props.description && (
          <Description className="text-sm/6 text-primary-black/60">
            {props.description}
          </Description>
        )}

        <HeadlessInput
          {...props}
          invalid={props.error ? true : false}
          className="mt-1.5 block w-full rounded-lg border-2 border-light-gray bg-gray-50 px-3 py-2.5 text-sm text-primary-black drop-shadow focus:outline-none data-[invalid]:bg-red-50 data-[focus]:outline-2 data-[invalid]:outline-0 data-[focus]:-outline-offset-2 data-[focus]:outline-custom-orange-400 data-[invalid]:ring-2 data-[invalid]:ring-red-400"
        />
        {props.error && (
          <span className="text-sm/6 text-red-500">{props.error.message}</span>
        )}
      </Field>
    </div>
  )
}
export default Input
