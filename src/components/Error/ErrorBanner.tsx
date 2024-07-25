import { MdError } from 'react-icons/md'

type Props = {
  error: Error | null
}

const ErrorBanner = (props: Props) => {
  if (props.error)
    return (
      <div className="mx-auto mt-4 flex flex-col items-center">
        <MdError className="size-14 text-red-500" />
        <span className="text-xl font-semibold">Error</span>
        <p className="mt-2 text-center">
          {props.error.message.split('.').map((l, _) => (
            <>
              {l} <br />
            </>
          ))}
        </p>
      </div>
    )
}

export default ErrorBanner
