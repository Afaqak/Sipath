import React, { useState, Suspense } from 'react';
import Image from 'next/image';
import UserAvatar from './userAvatar';
import { Icons, formatTimeAgo } from '..';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import Link from 'next/link';

export const Feed = ({ feed }) => {
  const [bigImage, setBigImage] = useState(feed?.attached_images.length>0 ? feed?.attached_images[0]:null);

  const handleThumbnailClick = (thumbnail) => {
    setBigImage(thumbnail);
  };


  return (

    <div className="flex flex-col md:w-[70%] w-[90%] lg:w-[50%] mx-auto px-4 pt-4 pb-3 bg-white shadow-md rounded-md">
      <div className="flex justify-between">
        <div className="flex items-center gap-2">

          <Link className='block' href={`/profile/${feed?.user?.id}`}><UserAvatar className="w-8 h-8" user={{ image: feed?.user?.profile_image, name: feed?.user?.display_name }} /></Link>
          <div className="flex uppercase text-subcolor3 text-[0.7rem] flex-col">
            <span className="">{feed?.user?.display_name}</span>
            <span className="">{formatTimeAgo(feed.createdAt)}</span>
          </div>
        </div>
        <DropdownMenu className="w-14 h-14">
          <DropdownMenuTrigger className="focus:outline-none outline-none">
            <Icons.elipsis stroke="black" width="20" className="rotate-90 transform" height="20" />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {/* <DropdownMenuItem>Delete</DropdownMenuItem> */}
            {/* <DropdownMenuSeparator /> */}
            <DropdownMenuItem>Report</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div
        className="mt-2 text-gray-700"
        dangerouslySetInnerHTML={{ __html: feed.text }}
      />
      {feed ?.attached_images && feed?.attached_images?.length > 0 && (
        <div className="mt-4">
          <Image
            priority
            src={bigImage}
            alt="Big"
            height={400}
            width={400}
            className="rounded-md w-full h-full aspect-video object-contain mb-2 border-2"
          />
          <div className="flex gap-2 pb-2 pl-[0.3rem] min-w-full overflow-x-auto">
            {feed?.attached_images && feed?.attached_images.length > 0 &&
              feed?.attached_images?.map((thumbnail, index) => (
                <div className="relative" key={index}>
                  <img
                    key={index}
                    src={thumbnail}
                    alt={`Thumbnail ${index + 1}`}
                    className={`cursor-pointer min-w-[4rem] max-w-[4rem] h-[4rem] rounded-md object-contain transform border-2 mr-2 ${bigImage && bigImage === thumbnail ? 'border-main ' : ''
                      }`}
                    onClick={() => handleThumbnailClick(thumbnail)}
                  />
                </div>
              ))}
          </div>
        </div>
      )}
      <div className="flex justify-end">
        <Image src={'/svgs/Message square.svg'} width={10} height={10} className="w-5 cursor-pointer h-5" />
      </div>
    </div>

  );
};


