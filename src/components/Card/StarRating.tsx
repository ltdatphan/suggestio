import { FaStar, FaStarHalf } from 'react-icons/fa'

const StarRating = ({ rating }: { rating: number }) => {
  const fullStars = Math.floor(rating)
  const halfStars = rating - fullStars

  return (
    <div className="relative">
      {/* <div className="flex text-gray-400">
                {[...Array(maxStars).keys()].map((_, i) => (
                    <FaRegStar key={i} className="size-3" />
                ))}
            </div> */}
      <div className="top-0 flex text-custom-yellow-400">
        {[...Array(fullStars).keys()].map((_, i) => (
          <FaStar key={i} className="size-3" />
        ))}
        {halfStars != 0 && <FaStarHalf className="size-3" />}
      </div>
    </div>
  )
}

export default StarRating
