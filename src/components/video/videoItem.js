'use client';
import Image from 'next/image';
import Link from 'next/link';
import { Icons } from '../icons';
import UserAvatar from '../common/userAvatar';
import { formatTimeAgo } from '@/utils';
import { useState, useRef } from 'react';
import { VideoEditModal } from './editVideoModal';
import { DeleteModal } from '../common/deleteModal';
import { useOutsideClick } from '@/hooks/useOutsideClick';

export const VideoItem = ({ video, isEdit, setVideos, setDeletedVideo }) => {
  const [open, setOpen] = useState(false);
  const [toggleMenu, setToggleMenu] = useState(false);
  const [videoDelete, setVideoDelete] = useState(false);
  const ref = useRef();
 

  useOutsideClick(ref, () => setToggleMenu(false));
  return (
    <div

      className={`h-[20rem] min-w-full md:w-[20rem] lg:w-[23rem] ${isEdit && 'border-2 border-subcolor'
        } relative block w-full p-4 bg-white shadow-lg rounded-md border`}
    >
      {video?.live && (
        <span className="absolute top-6 z-[1000] right-6 bg-[#FB3C22] flex gap-1 items-center py-[0.20rem] rounded-xl text-sm text-white px-2 font-medium">
          <Icons.live className="w-5 h-5" />
          Live
        </span>
      )}

      {video?.price && video?.price > 0 && (
        <span className="absolute top-2 z-[1000] left-0 bg-subcolor text-[0.7rem] py-[0.15rem]  rounded-r-md text-white px-3 font-medium">
          {video?.price}$
        </span>
      )}
      <Link href={`/videos/watch?id=${video?.id}`} className="relative cursor-pointer block">
        <Icons.play />
        <Image
          src={video?.thumbnail}
          alt={'thumbnail'}
          width={300}
          height={200}
          className="rounded-md object-cover w-full h-[11.2rem]"
        />
      </Link>
      <div className="mt-3 flex gap-2 w-full">
        <Link className='block' href={`/profile/${video?.author_id}`}> <UserAvatar user={{ image: video['user.profile_image'] && video['user.profile_image'] }} /></Link>
        <div className="w-full group">
          <div className="w-full flex justify-between items-start">
            <Link
              href={`/videos/watch?id=${video?.id}`}
              className="text-[1.10rem] block font-[550] mb-[0.20rem]  "
            >
              <span className="line-clamp-2 hover:underline">
                {/* {video?.title} */}
                {video?.title}
              </span>
            </Link>
            {isEdit && (
              <div className="relative">
                <div className="cursor-pointer">
                  <Icons.elipsis
                    onClick={() => setToggleMenu(!toggleMenu)}
                    className="h-[1.25rem] text-gray-500 w-[1.25rem] "
                  />
                </div>
                <div
                  ref={ref}
                  className={`bg-white rounded-md shadow-md w-28 absolute border top-8 duration-200 ease-in-out right-0 transition-all ${toggleMenu ? 'opacity-100 translate-y-0 visible' : 'opacity-0 invisible translate-y-10'
                    }`}
                >
                  <ul className="flex flex-col divide-y cursor-pointer text-sm">
                    <li>
                      <p
                        className="flex items-center gap-6 py-1 px-2 hover:bg-[#d1d1d1]"
                        onClick={() => setOpen(true)}
                      >
                        <Icons.edit className="h-4 w-4 stroke-[#616161]" />
                        Edit
                      </p>
                    </li>
                    <li
                      onClick={() => setVideoDelete(true)}
                      className="flex items-center gap-6 py-1 px-2 hover:bg-[#d1d1d1]"
                    >
                      <Icons.trash className="h-4 w-4 " />
                      Delete
                    </li>
                  </ul>
                </div>

              </div>
            )}
          </div>
          <div className="flex items-center text-sm gap-2 text-gray-700">
            <span>{video['user.display_name'] && video['user.display_name']}</span>
          </div>
          <div className="flex items-center text-sm gap-2 text-gray-700">
            <span>{video?.views} views</span>
            <span>&bull;</span>
            <span>{formatTimeAgo(video.createdAt)}</span>
            <span>&bull;</span>
            <div className="flex items-center">
              {video?.rating}{' '}
              <span>
                <Icons.rating />
              </span>
            </div>
          </div>
        </div>
      </div>
      <VideoEditModal
        video={video}
        setVideos={setVideos}
        isEdit={true}
        isOpen={open}
        setIsOpen={setOpen}
      />
      <DeleteModal
        isOpen={videoDelete}
        onDeleteSubmit={() => setDeletedVideo(video?.id)}
        setIsOpen={setVideoDelete}
        text={video?.title}
      />
    </div>
  );
};
