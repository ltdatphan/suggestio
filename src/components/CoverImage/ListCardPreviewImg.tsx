type Props = {
  coverImgUrl?: string | null
  title: string
}

const ListCardPreviewImg = (props: Props) => {
  const { coverImgUrl, title } = props
  return (
    <>
      {coverImgUrl ? (
        <img
          src={coverImgUrl}
          alt={`Image of ${title} list`}
          className="h-44 w-full rounded-xl object-cover sm:h-48"
        />
      ) : (
        <div className="h-44 w-full rounded-xl bg-gradient-to-tr from-custom-orange-300 to-custom-yellow-200 object-cover sm:h-48"></div>
      )}
    </>
  )
}

export default ListCardPreviewImg
