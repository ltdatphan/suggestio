import { Field, Input as HeadlessInput, Label } from '@headlessui/react'
import React from 'react'
import { ControllerFieldState, ControllerRenderProps } from 'react-hook-form'
import { IoSearchOutline } from 'react-icons/io5'

type SpecificInputType = {
  label?: string
  target: 'users' | 'lists'
}

type PropType = SpecificInputType &
  Partial<ControllerRenderProps> &
  Partial<ControllerFieldState> &
  React.ComponentProps<'input'>

const Search = (props: PropType) => {
  return (
    <>
      <Field className="relative z-10 w-full">
        {props.label && (
          <Label className="sr-only block text-sm/6 text-primary-black">
            {props.label}
          </Label>
        )}
        <HeadlessInput
          {...props}
          invalid={props.error ? true : false}
          type="search"
          className="block w-full rounded-r-full border border-light-gray px-3 py-2 text-sm/6 outline-none data-[invalid]:bg-red-50 data-[focus]:ring-2 data-[invalid]:ring-2 data-[focus]:ring-custom-orange-400 data-[invalid]:ring-red-400"
          placeholder={
            props.target === 'lists'
              ? 'Enter list name...'
              : 'Enter username...'
          }
        />
        <button
          type="submit"
          className="absolute bottom-1 end-1 rounded-full border border-orange-300 bg-custom-orange-300 px-3 py-1.5 text-sm hover:bg-custom-orange-300 focus:outline-none focus:ring-2 focus:ring-custom-orange-100"
        >
          <span className="sr-only">Search</span>
          <IoSearchOutline className="size-5 text-primary-black" aria-hidden />
        </button>
        {props.error && (
          <span className="absolute mt-1 text-sm/6 text-red-500">
            {props.error.message}
          </span>
        )}
      </Field>
    </>
  )
}

export default Search
