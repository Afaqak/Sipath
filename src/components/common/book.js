'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import { Stars } from './5star';
import { Button } from '../ui/button';
import UserAvatar from './userAvatar';
import { useSession } from 'next-auth/react';
import { EditBookModal } from '../tutors/editBookModal';
import { DeleteModal } from './deleteModal';
import { successToast, errorToast } from '@/utils/toasts';
import useAxiosPrivate from '@/hooks/useAxiosPrivate';
export const Book = ({ book, isProfile }) => {
  const axios = useAxiosPrivate();
  const { data: user } = useSession();
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(null);
  console.log(rating, book?.rating, book?.id, '{ratings}');

  const setAssetRating = async (newRating) => {
    console.log(newRating, '{newRating}');
    try {
      const response = await axios.post(
        `/rate/${book?.id}?type=book`,
        {
          rating: newRating,
        },
        {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        }
      );
      // setVideo(response.data?.asset);
      console.log(response.data, response.status);
      successToast('You have rated the Video!');
    } catch (error) {
      errorToast('Error Occured while setting the rating!');
    }
  };
  const handleRatingChange = (newRating) => {
    setRating(newRating);
    setAssetRating(newRating);
  };

  return (
    <div className="bg-white p-6 md:h-[243.198px] relative flex-col md:flex-row shadow-xl rounded-md flex gap-4 md:w-full">
      {book?.price && book?.price > 0 && (
        <span className="absolute top-4 tracking-wide z-[1000] left-0 bg-green-700 py-[0.10rem] shadow-xl rounded-r-sm text-sm text-white px-5 font-medium">
          {book?.price}$
        </span>
      )}
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
            <div className="flex text-sm font-bold text-black gap-2">
              {book?.rating > 0 ? book.rating.slice(0, -1) : <span>0</span>}

              <Image src={'/svgs/star.svg'} width={20} height={20} alt="star" />
            </div>
          </div>
          {/*account and stars*/}
          <div className="flex justify-between">
            <div className="flex gap-1 items-center text-sm">
              <UserAvatar className="h-8 w-8" user={{ image: user?.user?.profile_image }} />
              {user?.user?.display_name}
            </div>
            {isProfile ? (
              ''
            ) : (
              <Stars rating={rating} setRating={handleRatingChange} initialRating={book?.rating} />
            )}
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
