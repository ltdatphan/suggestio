import { useEffect } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import ErrorFallback from '../components/Error/ErrorFallback'
import Navigation from '../components/Navigation/Navigation'
import TabNavigation from '../components/Navigation/TabNavigation'
import TopMainNavigation from '../components/Navigation/TopMainNavigation'
import { useAuth } from '../hooks/useAuth'

type PropType = {
  style: 'all' | 'no-tab' | 'no-nav'
}

const ScrollToTop = () => {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return null
}

const ProtectedRoute = (props: PropType) => {
  const { isLoggedIn } = useAuth()

  if (!isLoggedIn) return <Navigate to="/login" />

  switch (props.style) {
    case 'all':
      return (
        <div className="relative flex min-h-screen flex-col bg-primary-white">
          <ScrollToTop />
          <TopMainNavigation />
          <div className="mb-4 mt-28 flex flex-grow flex-col items-center md:relative md:mb-0 md:ml-60 md:mt-12">
            <TabNavigation />
            <ErrorBoundary
              FallbackComponent={ErrorFallback}
              onError={(error, errorInfo) => {
                console.error(
                  'Error caught by ErrorBoundary: ',
                  error,
                  errorInfo
                )
              }}
            >
              <Outlet />
            </ErrorBoundary>
          </div>
          <Navigation />
        </div>
      )
    case 'no-tab':
      return (
        <div className="relative flex min-h-screen flex-col bg-primary-white">
          <ScrollToTop />
          <TopMainNavigation />
          <div className="mb-4 mt-16 flex flex-grow flex-col md:relative md:mb-0 md:ml-60 md:mt-0">
            <ErrorBoundary
              FallbackComponent={ErrorFallback}
              onError={(error, errorInfo) => {
                console.error(
                  'Error caught by ErrorBoundary: ',
                  error,
                  errorInfo
                )
              }}
            >
              <Outlet />
            </ErrorBoundary>
          </div>
          <Navigation />
        </div>
      )
    case 'no-nav':
      return (
        <div className="relative flex min-h-screen flex-col bg-primary-white">
          <ScrollToTop />
          <div className="mb-4 flex flex-grow flex-col md:relative md:mb-0 md:ml-60">
            <ErrorBoundary
              FallbackComponent={ErrorFallback}
              onError={(error, errorInfo) => {
                console.error(
                  'Error caught by ErrorBoundary: ',
                  error,
                  errorInfo
                )
              }}
            >
              <Outlet />
            </ErrorBoundary>
          </div>
          <Navigation />
        </div>
      )
  }
}

export default ProtectedRoute
