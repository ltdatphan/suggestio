import { Radio, RadioGroup } from '@headlessui/react'
import React from 'react'
import { ControllerFieldState, ControllerRenderProps } from 'react-hook-form'
import { IconType } from 'react-icons'

type RadioType = {
  label: string
  value: string
  description: string
  icon: IconType
}

type RadioOptionsType = {
  label?: string
  radioItems: RadioType[]
}

type PropType = RadioOptionsType &
  Partial<ControllerRenderProps> &
  Partial<ControllerFieldState> &
  React.ComponentProps<'input'>

const Category = (props: PropType) => {
  const { name, value, label, onChange, radioItems } = props

  return (
    <>
      {label && (
        <div className="block w-full text-sm/6 font-medium text-primary-black">
          {label}
        </div>
      )}
      <RadioGroup
        name={name}
        value={value}
        onChange={onChange}
        className="grid w-full grid-cols-2 gap-4"
      >
        {radioItems.map((radioItem) => (
          <Radio
            key={radioItem.label}
            value={radioItem.value}
            className="group cursor-pointer"
          >
            <div className="group flex flex-col items-center justify-center rounded-lg border border-light-gray bg-primary-white py-8 group-data-[checked]:bg-custom-orange-300 group-data-[hover]:bg-custom-orange-200">
              <radioItem.icon className="size-8" />
              <div className="text-lg font-semibold">{radioItem.label}</div>
              <div className="w-[85%] text-center text-sm/4">
                {radioItem.description}
              </div>
            </div>
          </Radio>
        ))}
      </RadioGroup>
    </>
  )
}

export default Category
