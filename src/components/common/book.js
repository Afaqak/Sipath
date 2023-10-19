'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import { Stars } from './5star';
import { Button } from '../ui/button';
import UserAvatar from './userAvatar';
import { useSession } from 'next-auth/react';
import { EditBookModal } from '../tutors/editBookModal';
import { DeleteModal } from './deleteModal';
export const Book = ({ book, isProfile }) => {
  const { data: user } = useSession();
  const [open, setOpen] = useState(false);
  return (
    <div className="bg-white p-6 md:h-[243.198px] relative flex-col md:flex-row shadow-xl rounded-md flex gap-4 md:w-full">
      <span className="absolute top-4 z-[1000] left-0 bg-green-700 py-[0.10rem] shadow-xl rounded-r-sm text-sm text-white px-5 font-medium">
        {book?.price}
      </span>
      <div className="md:w-52 bg-gray-300 h-[195.198px] flex items-center justify-center w-[100%]">
        <Image
          src={book?.thumbnail}
          className=" object-contain h-full w-full"
          width={500}
          alt="physics"
          height={500}
        />
      </div>
      <div
        className={`flex justify-between  h-full flex-col lg:w-full ${
          isProfile ? 'md:w-full' : 'md:w-90%'
        }`}
      >
        {/*title and rating*/}
        <div>
          <div className="flex justify-between items-center">
            <h1 className="text-[1.08rem] font-medium capitalize">{book?.title}</h1>
            <div className="flex text-sm font-bold gap-2">
              4.7 <Image src={'svgs/star.svg'} width={20} height={20} alt="star" />
            </div>
          </div>
          {/*account and stars*/}
          <div className="flex justify-between">
            <div className="flex gap-1 items-center text-sm">
              <UserAvatar className="h-8 w-8" user={{ image: user?.user?.profile_image }} />
              {user?.user?.display_name}
            </div>
            <Stars />
          </div>
          <div className="text-[0.8rem] md:text-sm line-clamp-4 mb-3 mt-2">
            <p className="text-subcolor3 font-thin">{book?.description}</p>
          </div>
        </div>
        {isProfile ? (
          <div className="flex gap-4 w-full">
            <Button
              variant="outline"
              className="font-semibold bg-white text-subcolor justify-center flex items-center gap-1 w-full  rounded-md border-[3px] border-subcolor"
            >
              <Image width={20} height={20} alt="bag" src={'/svgs/bag.svg'} />

              <span>View Book</span>
            </Button>
            <Button
              onClick={() => setOpen(true)}
              variant="outline"
              className="font-semibold bg-white text-subcolor justify-center flex items-center gap-1 w-full  rounded-md border-[3px] border-subcolor"
            >
              <Image width={20} height={20} alt="bag" src={'/svgs/bag.svg'} />

              <span>Edit Book</span>
            </Button>
          </div>
        ) : (
          <Button
            variant="outline"
            className="font-semibold bg-white text-subcolor justify-center flex items-center gap-1 w-full  rounded-md border-[3px] border-subcolor"
          >
            <Image width={20} height={20} alt="bag" src={'/svgs/bag.svg'} />

            <span>Buy Book</span>
          </Button>
        )}
      </div>
      <EditBookModal book={book} isOpen={open} setIsOpen={setOpen} />
      <DeleteModal />
    </div>
  );
};
