import { lineSpinner } from 'ldrs'
lineSpinner.register()

const Fetching = () => {
  return (
    <div className="flex justify-center py-3">
      <div className="flex w-fit rounded-full border border-light-gray bg-primary-white p-1.5">
        <l-line-spinner
          size="30"
          stroke="3"
          speed="1"
          color="#f79824"
        ></l-line-spinner>
      </div>
    </div>
  )
}

export default Fetching
