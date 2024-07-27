import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'

import HomePage from './pages/HomePage.tsx'
import LoginPage from './pages/LoginPage.tsx'
import NotFoundPage from './pages/NotFoundPage.tsx'

import { useAuth } from './hooks/useAuth.ts'

import LandingPage from './pages/LandingPage.tsx'

import { lazy, Suspense } from 'react'
import { Toaster } from 'react-hot-toast'

const CreateListPage = lazy(() => import('./pages/CreateListPage.tsx'))
const CurrentUserListDetailsPage = lazy(
  () => import('./pages/CurrentUserListDetailsPage.tsx')
)
const CurrentUserProfilePage = lazy(
  () => import('./pages/CurrentUserProfilePage.tsx')
)
const ExplorePage = lazy(() => import('./pages/ExplorePage.tsx'))
const FollowingPage = lazy(() => import('./pages/FollowingPage.tsx'))
const OtherUserListDetailsPage = lazy(
  () => import('./pages/OtherUserListDetailsPage.tsx')
)
const OtherUserProfilePage = lazy(
  () => import('./pages/OtherUserProfilePage.tsx')
)
const Saved = lazy(() => import('./pages/Saved.tsx'))
const SearchResultPage = lazy(() => import('./pages/SearchResultPage.tsx'))
const SignUpPage = lazy(() => import('./pages/SignUpPage.tsx'))
const UpdateListPage = lazy(() => import('./pages/UpdateListPage.tsx'))
const ProtectedRoute = lazy(() => import('./routes/ProtectedRoute.tsx'))

const App = () => {
  const { isLoggedIn } = useAuth()

  const router = createBrowserRouter([
    {
      path: '/',
      children: [
        {
          path: '',
          element: !isLoggedIn ? <LandingPage /> : <Navigate to="/home" />,
        },
        {
          path: 'login',
          element: !isLoggedIn ? <LoginPage /> : <Navigate to="/home" />,
        },
        {
          path: 'signup',
          element: !isLoggedIn ? <SignUpPage /> : <Navigate to="/home" />,
        },
      ],
    },
    {
      path: '/',

      element: <ProtectedRoute style="all" />,
      children: [
        {
          path: 'home',
          element: <HomePage />,
        },
        {
          path: 'following',
          element: <FollowingPage />,
        },
        {
          path: 'saved',
          element: <Saved />,
        },
      ],
    },
    {
      path: '/',
      element: <ProtectedRoute style="no-tab" />,
      children: [
        {
          path: 'explore',
          element: <ExplorePage />,
        },
        {
          path: 'users/search',
          element: <SearchResultPage />,
        },
        {
          path: 'lists/search',
          element: <SearchResultPage />,
        },
      ],
    },
    {
      path: '/',
      element: <ProtectedRoute style="no-nav" />,
      children: [
        {
          path: 'add',
          element: <CreateListPage />,
        },
        {
          path: 'lists/:listId/details',
          element: (
            // <ErrorBoundary FallbackComponent={ErrorFallback}>
            <CurrentUserListDetailsPage />
            // </ErrorBoundary>
          ),
        },
        {
          path: 'following/lists/:listId/details',
          element: <OtherUserListDetailsPage />,
        },
        {
          path: 'users/:username/lists/:listId/details',
          element: <OtherUserListDetailsPage />,
        },
        {
          path: 'lists/:listId/edit',
          element: <UpdateListPage />,
        },
        {
          path: 'myProfile',
          element: <CurrentUserProfilePage />,
        },
        {
          path: 'users/:username',
          element: <OtherUserProfilePage />,
        },
      ],
    },
    {
      path: '*',
      element: <NotFoundPage />,
    },
  ])

  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <RouterProvider router={router} />
      </Suspense>
      <Toaster />
    </>
  )
}

export default App
