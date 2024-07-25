import React from 'react'

type Props = {
  children: React.ReactNode
}

const UserContainer = (props: Props) => {
  return (
    <ul className="mx-auto flex w-full flex-col md:max-w-[36rem]">
      {props.children}
    </ul>
  )
}

export default UserContainer
