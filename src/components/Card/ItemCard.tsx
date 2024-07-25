import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react'
import { BsThreeDots } from 'react-icons/bs'
import { FaChevronDown } from 'react-icons/fa'
import { IoIosLink } from 'react-icons/io'
import { MdOutlineStickyNote2 } from 'react-icons/md'
import { ItemImagePlaceHolder } from '../../assets'
import StarRating from './StarRating'

const Notes = ({ notes }: { notes: string }) => {
  return (
    <div className="min-h-16 rounded-md bg-custom-yellow-100 px-2.5 py-2.5">
      <span className="flex items-center gap-1.5 font-medium">
        <MdOutlineStickyNote2 className="text-custom-yellow-500" />
        Notes
      </span>
      <p className="break-all text-sm">{notes}</p>
    </div>
  )
}

const ItemLink = ({ link }: { link: string }) => {
  return (
    <div className="relative min-h-16 rounded-md bg-custom-blue-100 px-2.5 py-2.5">
      <a
        href={link}
        className="fixed left-0 right-0 -my-2.5 mx-2.5 h-16 rounded-md"
        referrerPolicy="no-referrer"
        target="_blank"
      ></a>
      <span className="flex items-center gap-1.5 font-medium">
        <IoIosLink className="text-custom-blue-500" />
        Link
      </span>
      <div className="break-all text-sm">{link}</div>
    </div>
  )
}

const ItemImg = ({ itemImgUrl }: { itemImgUrl: string | null }) => {
  if (itemImgUrl)
    return (
      <img
        src={itemImgUrl ? itemImgUrl : ItemImagePlaceHolder}
        className="object-fit size-14 rounded-md"
      />
    )

  return (
    <img
      src={itemImgUrl ? itemImgUrl : ItemImagePlaceHolder}
      className="size-14 rounded-md bg-custom-orange-200 p-2.5"
    />
  )
}

const ItemCard = (
  props: models.item.IItemProps & { setItem?: (() => void) | null },
) => {
  const { itemName, itemImgUrl, subtitle, rating, notes, itemUrl, setItem } =
    props

  return (
    <li>
      <Disclosure>
        <div className="w-full rounded-lg border border-light-gray bg-white p-2 pb-2">
          <div className="flex">
            <DisclosureButton
              className="group flex w-full items-center justify-between text-start"
              disabled={!notes && !itemUrl}
            >
              <div className="flex flex-row items-center gap-2">
                <ItemImg itemImgUrl={itemImgUrl} />

                {/* Item name, subtitles, icons, ... */}
                <div className="flex flex-col">
                  <span className="mb-0.5 break-all text-base/5 font-semibold">
                    {itemName}
                  </span>
                  {subtitle && (
                    <span className="text-sm text-gray-400">{subtitle}</span>
                  )}
                  <div className="flex items-center gap-1">
                    {rating && <StarRating rating={rating} />}
                    {notes && (
                      <MdOutlineStickyNote2 className="text-custom-yellow-500" />
                    )}
                    {itemUrl && <IoIosLink className="text-custom-blue-500" />}
                  </div>
                </div>
              </div>
              <div className="ml-2 flex justify-center">
                {(notes || itemUrl) && (
                  <div className="px-1 py-2">
                    <FaChevronDown
                      className="size-4 text-gray-500 transition duration-200 ease-in-out group-data-[open]:rotate-180" />
                  </div>
                )}
              </div>
            </DisclosureButton>
            {setItem && (
              <button
                className="flex-auto cursor-pointer px-1.5"
                onClick={() => setItem && setItem()}
              >
                <BsThreeDots className="size-8 rounded-full p-1 text-gray-400 hover:bg-gray-300" />
              </button>
            )}
          </div>
          <DisclosurePanel
            transition
            className="mt-2 flex origin-top flex-col gap-2 transition duration-200 ease-in-out data-[closed]:-translate-y-3 data-[closed]:opacity-0"
          >
            {notes && <Notes notes={notes} />}
            {itemUrl && <ItemLink link={itemUrl} />}
          </DisclosurePanel>
        </div>
      </Disclosure>
    </li>
  )
}

export default ItemCard
