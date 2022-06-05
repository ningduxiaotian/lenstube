import Popover from '@components/UIElements/Popover'
import useAppStore from '@lib/store'
import { LENSTUBE_URL } from '@utils/constants'
import { isAlreadyAddedToWatchLater } from '@utils/functions/isAlreadyAddedToWatchLater'
import useCopyToClipboard from '@utils/hooks/useCopyToClipboard'
import React from 'react'
import toast from 'react-hot-toast'
import { FiFlag } from 'react-icons/fi'
import { HiOutlineDotsVertical } from 'react-icons/hi'
import { MdOutlineWatchLater } from 'react-icons/md'
import { RiShareForwardLine } from 'react-icons/ri'
import { LenstubePublication } from 'src/types/local'

const VideoOptions = ({ video }: { video: LenstubePublication }) => {
  const { addToWatchLater, removeFromWatchLater, watchLater } = useAppStore()
  const [, copy] = useCopyToClipboard()

  const share = () => {
    copy(`${LENSTUBE_URL}/videos/${video.id}`)
    toast.success('Perma link copied to clipboard 🎉')
  }

  return (
    <Popover
      trigger={
        <div className="invisible p-1 group-hover:visible">
          <HiOutlineDotsVertical />
        </div>
      }
      panelClassName="right-0"
    >
      <div className="p-1 mt-0.5 overflow-hidden border border-gray-200 rounded-lg shadow dark:border-gray-800 bg-secondary">
        <div className="flex flex-col text-sm transition duration-150 ease-in-out rounded-lg">
          <button
            onClick={() =>
              isAlreadyAddedToWatchLater(video, watchLater)
                ? removeFromWatchLater(video)
                : addToWatchLater(video)
            }
            className="inline-flex items-center px-3 py-1.5 space-x-2 rounded-lg opacity-70 hover:opacity-100 hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <MdOutlineWatchLater className="text-base" />
            <span className="whitespace-nowrap">
              {isAlreadyAddedToWatchLater(video, watchLater)
                ? 'Remove from Watch Later'
                : 'Watch Later'}
            </span>
          </button>
          <button
            onClick={() => share()}
            className="inline-flex items-center px-3 py-1.5 space-x-2 rounded-lg opacity-70 hover:opacity-100 hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <RiShareForwardLine className="text-base" />
            <span className="whitespace-nowrap">Share</span>
          </button>
          <button className="inline-flex hover:text-red-500 items-center px-3 py-1.5 space-x-2 rounded-lg opacity-70 hover:opacity-100 hover:bg-gray-100 dark:hover:bg-gray-800">
            <FiFlag className="text-sm mx-0.5" />
            <span className="whitespace-nowrap">Report</span>
          </button>
        </div>
      </div>
    </Popover>
  )
}

export default VideoOptions