import { Tab, TabGroup, TabList } from '@headlessui/react'
import { Link, useLocation } from 'react-router-dom'

type TabNavDataType = {
  name: string
  path: string
}

const tabs: TabNavDataType[] = [
  { name: 'My lists', path: '/home' },
  { name: 'Following', path: '/following' },
  //TODO: Enable this once feature is ready
  // { name: 'Saved', path: '/saved' },
]

const TabNavigation = () => {
  const location = useLocation()

  return (
    <div className="fixed top-16 z-40 flex h-16 items-center justify-center md:top-0">
      <TabGroup>
        <TabList className="flex gap-2 rounded-full border-[1px] border-light-gray bg-white p-[0.35rem] backdrop-blur-sm">
          {tabs.map((tab, i) => (
            <Tab
              key={i}
              as={Link}
              to={tab.path}
              data-user-selected={
                location.pathname === tab.path ? 'true' : 'false'
              }
              className="md:text-md rounded-full px-5 py-1 text-base/6 focus:outline-none data-[hover]:bg-custom-orange-300 data-[user-selected=true]:bg-custom-orange-200 data-[user-selected=true]:font-medium data-[focus]:outline-1 data-[focus]:outline-white md:px-6"
            >
              {tab.name}
            </Tab>
          ))}
        </TabList>
      </TabGroup>
    </div>
  )
}

export default TabNavigation
