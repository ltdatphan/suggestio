import React from 'react'

const PrimaryButton = (props: React.ComponentProps<'button'>) => {
  const { className = '', children, ...rest } = props
  return (
    <button
      className={`w-full rounded-lg bg-custom-orange-300 py-2.5 text-sm/6 font-medium text-primary-black drop-shadow hover:bg-custom-orange-200 focus:outline-none focus:ring-4 focus:ring-custom-orange-200 disabled:bg-custom-orange-100 disabled:text-slate-400 ${className}`}
      {...rest}
    >
      {children}
    </button>
  )
}

export default PrimaryButton
