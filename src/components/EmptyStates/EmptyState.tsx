import { AddFriends, Empty, Void } from '../../assets'
import PrimaryButton from '../Button/PrimaryButton'

type Props = {
  variant?: 'empty' | 'add-friends' | 'no-data' | 'void'
  title: string
  message: string
  buttonLabel?: string
  buttonFunc?: () => void
}

const EmptyState = (props: Props) => {
  const { variant = 'empty', title, message, buttonLabel, buttonFunc } = props

  let img

  switch (variant) {
    case 'add-friends':
      img = AddFriends
      break

    case 'void':
      img = Void
      break

    default:
      img = Empty
      break
  }

  return (
    <div className="mx-auto mt-5 flex flex-col items-center px-16 md:mt-10 md:max-w-96">
      <img src={img} alt={`${title}`} />
      <h1 className="mb-2 mt-4 text-center text-2xl font-bold">{title}</h1>
      <span className="mb-5 text-center">{message}</span>
      {buttonLabel && buttonFunc && (
        <PrimaryButton onClick={() => buttonFunc()}>
          {buttonLabel}
        </PrimaryButton>
      )}
    </div>
  )
}

export default EmptyState
