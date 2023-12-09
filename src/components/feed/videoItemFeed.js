
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Icons } from "@/components";
import { VideoEditModal } from "@/components/modals/editVideoModal"
import { DeleteModal } from "@/components/modals/deleteModal";
import { ProfileHoverCard } from "@/components";
import UserAvatar from "../common/userAvatar";

export const VideoItemFeed = ({ video, isEdit, setVideos, loading, setDeletedVideo }) => {
  const [open, setOpen] = useState(false);
  const [videoDelete, setVideoDelete] = useState(false);


  return (
    <div className=' flex flex-col gap-2 '>
      <div

        className={`max-h-[13rem] min-h-[12rem] pb-4 flex gap-4  bg-white box-shadow-main rounded-md border p-4 min-w-full md:w-[20rem] lg:w-[21.8rem] ${isEdit && 'border-2 border-subcolor'
          } relative block w-full`}
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
        <Link href={`/videos/watch/${video?.id}`} className="relative cursor-pointer block">
          <Icons.play />
          {video?.thumbnail &&
            <Image
              src={video?.thumbnail}
              alt={'thumbnail'}
              width={300}
              height={200}
              className="rounded-md object-contain border w-[19rem] h-[10rem]"
            />
          }
        </Link>
        <div className="mt-3 flex gap-2 w-full">

          <div className="w-full flex flex-col gap-4 justify-between group">
            <div className="w-full flex flex-col">
              <Link
                href={`/videos/watch?id=${video?.id}`}
                className="text-[1.10rem] block font-[550] mb-[0.20rem] capitalize"
              >
                <span className="line-clamp-2 hover:underline">

                  {video?.title}
                </span>
              </Link>
              <div className='flex gap-2 items-center'>
                <ProfileHoverCard user={{
                  display_name: video && video?.['user.display_name'],
                  profile_image: video && video?.['user.profile_image'],
                  rating: video && video?.['user.rating'],
                  isTutor: video && video?.['user.isTutor'],
                  id: video && video['user.id']
                }}>
                  <UserAvatar className="h-7 w-7" user={{
                    image: video && video['user.profile_image'],
                    name: video && video?.['user.display_name'].slice(0,2)
                  }} />
                </ProfileHoverCard>

                <span className='text-[0.8rem] -mt-1 uppercase'>{video && video['user.display_name']}</span>
              </div>
              <span className="line-clamp-2 text-sm mt-1">
                {video?.description}
              </span>
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
            <div className="flex justify-end items-center text-sm gap-2 text-gray-700">
              {/* <Icons.chat onClick={()=>setChatOpen(!chatOpen)} className='cursor-pointer w-5 h-5' /> */}
              <div className="flex flex-col items-center">

                <div className='flex gap-1'>
                  {
                    video?.rating < 1 ? '0' : video?.rating.slice(0, -1)
                  }
                  <span>
                    <Icons.rating />
                  </span>
                </div>
                <span>{video && video?.views} views</span>
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

    </div>
  );
};

