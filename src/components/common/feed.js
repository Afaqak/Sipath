import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import UserAvatar from './userAvatar';
import { Icons, ProfileHoverCard, CreateComment } from '..';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { usePathname} from 'next/navigation';
import { useFormattedTimeAgo } from '@/hooks/useFormattedTimeAgo';
import 'react-quill/dist/quill.snow.css';
import Link from 'next/link';
import { CommentSectionFeed } from '../feed';


export const Feed = ({ feed, openModal, user, style = 'md:w-[70%] w-[90%] lg:w-[50%]' }) => {

  const formattedTimeAgo = useFormattedTimeAgo(feed?.createdAt)
  const [toggleComment, setCommentToggle] = useState(false)
  const [bigImage, setBigImage] = useState(feed?.attached_images?.[0] || null);
  const path = usePathname()
  const setPage = path.startsWith('/profile')

const handleThumbnailClick = (thumbnail) => {
    setBigImage(thumbnail);
  };






  return (

    <div className={`flex flex-col ${style} mx-auto px-4 pt-4 pb-3 bg-white box-shadow-main rounded-md`}>
      <div className="flex justify-between items-center ">
        <ProfileHoverCard user={feed?.user} >
          <div className='flex gap-2 '>
            <UserAvatar className="w-8 h-8" user={{ image: feed.user?.profile_image, name: feed.user?.display_name }} />
            <div className="flex uppercase text-subcolor3 font-medium text-[0.7rem] flex-col">
              <span className="">{feed?.user?.display_name}</span>
              <span className="">{feed && formattedTimeAgo}</span>
            </div>
          </div>
        </ProfileHoverCard>
        {
          !setPage &&

          <DropdownMenu className="w-14 h-14">
            <DropdownMenuTrigger className="focus:outline-none outline-none">
              <Icons.elipsis stroke="black" width="20" className="rotate-90 transform" height="20" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {user && +user?.id === +feed?.user?.id &&
                <>
                  <DropdownMenuItem onClick={openModal} className="flex gap-2"><Icons.trash /> Delete</DropdownMenuItem>
                  <DropdownMenuSeparator />
                </>
              }
              {user && +user?.id === +feed?.user?.id &&
                <>
                  <DropdownMenuItem className="flex gap-2"><Icons.edit className='h-4 w-4 stroke-subcolor' stroke='black' />
                    <Link href={`/user/post/edit/${feed?.id}`}>Edit</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                </>
              }

              <DropdownMenuItem>Report</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        }
      </div>
      <div
        className="mt-2 text-gray-700"
        dangerouslySetInnerHTML={{ __html: feed.text }}
      />
      {feed?.attached_images && feed?.attached_images?.length > 0 && (
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
                  <Image
                    key={index}
                    width={50}
                    height={50}
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
      <div className={`flex justify-end pb-2`} onClick={() => setCommentToggle(!toggleComment)}>
        <Icons.chat className='w-5 h-5 cursor-pointer' />

      </div>
      {toggleComment && <CommentSectionFeed itemId={feed?.id} session={user} type={'post'} />
      }

    </div>

  );
};

