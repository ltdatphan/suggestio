import React from 'react'
import { FixingBugs } from '../../assets'

const ErrorFallback = () => {
  return (
    <div className="mx-auto flex h-full flex-grow flex-col items-center justify-center px-10 md:max-w-96">
      <img src={FixingBugs} />
      <h1 className="mb-5 mt-1 text-3xl font-bold">OOPS! </h1>
      <span className="text-center text-lg font-light">
        Something went wrong on our end. Please try again later.
      </span>
    </div>
  )
}

export default ErrorFallback
