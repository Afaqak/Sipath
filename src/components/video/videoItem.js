'use client';
import Image from 'next/image';
import Link from 'next/link';
import UserAvatar from '@/components/common/userAvatar';
import { ProfileHoverCard, DeleteModal, Icons } from '@/components';
import { useState, useRef } from 'react';
import { VideoEditModal } from '../modals/editVideoModal';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useFormattedTimeAgo } from '@/hooks/useFormattedTimeAgo';

export const VideoItem = ({ video, isEdit, setVideos, loading, setDeletedVideo }) => {
  const [open, setOpen] = useState(false);
  const [videoDelete, setVideoDelete] = useState(false);
  const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC';

  const formattedTimeAgo = useFormattedTimeAgo(video?.createdAt, userTimeZone);


  return (
    <div

      className={`max-h-[20rem] min-w-full md:w-[20rem] lg:w-[21.8rem] ${isEdit && 'border-2 border-subcolor'
        } relative block w-full p-4 bg-white box-shadow-main  rounded-md border`}
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

        <img

          src={video?.thumbnail}
          alt={'thumbnail'}
          className="rounded-md object-cover w-full h-[11.2rem]"
        />

      </Link>
      <div className="mt-3 flex gap-2 w-full">
        <div>
          <ProfileHoverCard user={{
            display_name: video && video['user.display_name'],
            profile_image: video && video['user.profile_image'],
            rating: video && video['user.rating'],
            isTutor: video && video['user.isTutor'],
            id: video && video['user.id']
          }}>
            <UserAvatar user={{ image: video && video['user.profile_image'] }} />
          </ProfileHoverCard>
        </div>
        <div className="w-full group">
          <div className="w-full flex justify-between items-start">
            <Link
              href={`/videos/watch?id=${video?.id}`}
              className="text-[1.10rem] block font-[550] mb-[0.20rem]  "
            >
              <span className="line-clamp-2 hover:underline">

                {video?.title}
              </span>
            </Link>
            {isEdit && (
              <div className=''>
                <DropdownMenu className="cursor-pointer">
                  <DropdownMenuTrigger>
                    <Icons.elipsis className="h-7 transform rotate-90  text-gray-500 w-7" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align='end'>
                    <DropdownMenuItem onClick={() => setOpen(true)} className="flex gap-2">
                      Edit <Icons.edit className="h-4 w-4 stroke-[#616161]" />
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="flex gap-2" onClick={() => setVideoDelete(true)}>
                      Delete<Icons.trash className="h-4 w-4 " />
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            )}
          </div>
          <div className="flex items-center text-sm gap-2 text-gray-700">
            <span>{video && video['user.display_name'] && video['user.display_name']}</span>
          </div>
          <div className="flex items-center text-sm gap-2 text-gray-700">
            <span>{video && video?.views} views</span>
            <span>&bull;</span>
            <span>{video && formattedTimeAgo}</span>
            <span>&bull;</span>
            <div className="flex items-center">
              {
                video?.rating < 1 ? '0' : video?.rating.slice(0, -1)
              }

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
        loading={loading}
        onDeleteSubmit={() => setDeletedVideo(video?.id, () => setVideoDelete(false))}
        setIsOpen={setVideoDelete}
        text={video?.title}
      />
    </div>
  );
};
