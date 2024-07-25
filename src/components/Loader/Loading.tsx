import { lineSpinner } from 'ldrs'

lineSpinner.register()

const Loading = () => {
  return (
    <div className="flex w-full flex-grow items-center justify-center">
      <l-line-spinner
        size="60"
        stroke="5"
        speed="1"
        color="#f79824"
      ></l-line-spinner>
    </div>
  )
}

export default Loading
