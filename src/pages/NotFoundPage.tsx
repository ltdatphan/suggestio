import React from 'react'
import usePageTitle from '../hooks/usePageTitle'

const NotFoundPage = () => {
  usePageTitle('Page not found')
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-screen-xl px-4 py-8 lg:px-6 lg:py-16">
        <div className="mx-auto max-w-screen-sm text-center">
          <h1 className="text-primary-600 mb-4 text-7xl font-extrabold tracking-tight lg:text-9xl">
            404
          </h1>
          <p className="mb-4 text-3xl font-bold tracking-tight text-gray-900 md:text-4xl">
            Page not found.
          </p>
          <p className="mb-4 text-lg font-light text-gray-500">
            The page you requested cannot be found.{' '}
          </p>
        </div>
      </div>
    </section>
  )
}

export default NotFoundPage
