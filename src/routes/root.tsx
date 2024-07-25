import { Outlet } from 'react-router-dom'
import Navigation from '../components/Navigation/Navigation'
import TabNavigation from '../components/Navigation/TabNavigation'
import TopMainNavigation from '../components/Navigation/TopMainNavigation'

const root = () => {
  return (
    <>
      <div className="relative h-full w-full bg-primary-white md:mb-0 md:ml-60 md:w-auto">
        <TopMainNavigation />

        <body className="mt-32 md:relative md:mt-16">
          <TabNavigation />
          <Outlet />
        </body>
        <Navigation />
      </div>
    </>
  )
}

export default root
