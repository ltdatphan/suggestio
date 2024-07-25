import { lineSpinner } from 'ldrs'
import React from 'react'
lineSpinner.register()

type StatePropTypes = {
  isLoading?: boolean
  status?: 'success' | 'error' | undefined
}

type Props = StatePropTypes & React.ComponentProps<'button'>

const SubmitButton = (props: Props) => {
  const { className = '', children, status, isLoading, ...rest } = props
  return (
    <button
      type="submit"
      data-status={status}
      className={`flex w-full items-center justify-center rounded-lg bg-custom-orange-300 px-2 py-2.5 text-sm/6 font-medium text-primary-black drop-shadow hover:bg-custom-orange-200 focus:outline-none focus:ring-4 focus:ring-custom-orange-200 disabled:bg-custom-orange-100 disabled:text-slate-400 data-[status=error]:bg-red-400 data-[status=success]:bg-green-400 ${className}`}
      disabled={isLoading}
      {...rest}
    >
      {!isLoading && status == undefined && children}
      {isLoading && (
        <span className="flex items-center justify-center gap-1">
          Loading
          {/* <Spinner className="inline size-6 fill-primary-black text-custom-orange-100" /> */}
          <l-line-spinner
            size="24"
            stroke="2"
            speed="1"
            color="#f79824"
          ></l-line-spinner>
        </span>
      )}
      {!isLoading && status == 'success' && 'Success'}
      {!isLoading && status == 'error' && 'Error. Try again?'}
    </button>
  )
}

export default SubmitButton
