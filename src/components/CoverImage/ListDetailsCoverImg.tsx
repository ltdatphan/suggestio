type Props = {
  title: string
  coverImgUrl?: string | null
}

const ListDetailsCoverImg = (props: Props) => {
  // if (props.coverImgUrl)
  //     return (
  //         <img
  //             src={props.coverImgUrl}
  //             alt={`Image of ${props.title} list`}
  //             className="h-[30vh] md:h-[35vh] w-full object-cover"
  //         />
  //     )
  // else
  //     return (
  //         <div
  //             className="h-[30vh] md:h-[35vh] w-full object-cover
  //             bg-gradient-to-tr from-custom-orange-300 to-custom-yellow-200"
  //         ></div>
  //     )

  return (
    <>
      {props.coverImgUrl ? (
        <img
          src={props.coverImgUrl}
          alt={`Image of ${props.title} list`}
          className="h-[30vh] w-full object-cover md:h-[35vh]"
        />
      ) : (
        <div className="h-[30vh] w-full bg-gradient-to-tr from-custom-orange-300 to-custom-yellow-200 object-cover md:h-[35vh]" />
      )}
    </>
  )
}

export default ListDetailsCoverImg
