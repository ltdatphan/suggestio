import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'

import HomePage from './pages/HomePage.tsx'
import LoginPage from './pages/LoginPage.tsx'
import NotFoundPage from './pages/NotFoundPage.tsx'

import { useAuth } from './hooks/useAuth.ts'

import Landing from './pages/Landing.tsx'

import { Toaster } from 'react-hot-toast'
import CreateListPage from './pages/CreateListPage.tsx'
import CurrentUserListDetailsPage from './pages/CurrentUserListDetailsPage.tsx'
import CurrentUserProfilePage from './pages/CurrentUserProfilePage.tsx'
import ExplorePage from './pages/ExplorePage.tsx'
import FollowingPage from './pages/FollowingPage.tsx'
import OtherUserListDetailsPage from './pages/OtherUserListDetailsPage.tsx'
import OtherUserProfilePage from './pages/OtherUserProfilePage.tsx'
import Saved from './pages/Saved.tsx'
import SearchResultPage from './pages/SearchResultPage.tsx'
import UpdateListPage from './pages/UpdateListPage.tsx'
import ProtectedRoute from './routes/ProtectedRoute.tsx'

const App = () => {
  const { isLoggedIn } = useAuth()

  const router = createBrowserRouter([
    {
      path: '/',
      children: [
        {
          path: '',
          element: !isLoggedIn ? <Landing /> : <Navigate to="/home" />,
        },
        {
          path: 'login',
          element: !isLoggedIn ? <LoginPage /> : <Navigate to="/home" />,
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
      <RouterProvider router={router} />
      {/* <ScrollToTop /> */}
      <Toaster />
    </>
  )
}

export default App
