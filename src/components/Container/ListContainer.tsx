import React from 'react'

type Props = {
  children: React.ReactNode
}

const ListContainer = (props: Props) => {
  return (
    <ul className="mt-6 grid w-full grid-cols-1 gap-6 sm:px-5 md:grid-cols-2 md:gap-8 xl:grid-cols-3">
      {props.children}
    </ul>
  )
}

export default ListContainer
