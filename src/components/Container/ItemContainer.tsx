import React from 'react'

type Props = {
  children: React.ReactNode
}

const ItemContainer = (props: Props) => {
  return (
    <ul className="mt-3 flex w-full flex-col gap-3 px-5">{props.children}</ul>
  )
}

export default ItemContainer
