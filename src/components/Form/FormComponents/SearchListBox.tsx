import { Field, Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/react'
import React from 'react'
import { ControllerFieldState, ControllerRenderProps } from 'react-hook-form'
import { IoChevronDown } from 'react-icons/io5'

type PropType = Partial<ControllerRenderProps> &
  Partial<ControllerFieldState> &
  React.ComponentProps<'select'>

const searchOptions = [
  { label: 'Users', value: 'users' },
  { label: 'Lists', value: 'lists' },
]

const SearchListBox = (props: PropType) => {
  const { value, onChange } = props
  return (
    <Field>
      <div className="inset-y-0 flex items-center">
        <Listbox value={value} onChange={onChange}>
          <ListboxButton
            className="relative z-10 block w-20 rounded-l-full border-y border-l border-light-gray bg-custom-orange-200 py-2 pl-4 pr-16 text-left text-sm/6 font-medium focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25">
            {searchOptions.find((op) => op.value === value)?.label}
            <IoChevronDown
              className="group pointer-events-none absolute right-1.5 top-3 size-4 fill-white/60"
              aria-hidden="true"
            />
          </ListboxButton>
          <ListboxOptions
            anchor="bottom"
            className="z-10 mt-1 w-24 divide-y divide-gray-100 rounded-lg border border-light-gray bg-white shadow"
          >
            {searchOptions.map((option) => (
              <ListboxOption
                key={option.value}
                value={option.value}
                className="inline-flex w-full cursor-pointer bg-primary-white px-4 py-2 text-sm/6 hover:bg-custom-orange-100 data-[focus]:bg-custom-orange-100"
              >
                {option.label}
              </ListboxOption>
            ))}
          </ListboxOptions>
        </Listbox>
      </div>
    </Field>
  )
}

export default SearchListBox
