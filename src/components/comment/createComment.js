'use client';
import React from 'react';
import Image from 'next/image';
import { useDispatch, useSelector } from 'react-redux';
import UserAvatar from '../common/userAvatar';
import { Icons } from '../icons';
export const CreateComment = ({ reply, onSubmit, setComments, commentRef }) => {
  const user = useSelector((state) => state.userAuth?.user);
  return (
    <form onSubmit={onSubmit} className="flex gap-3 items-center">
      <UserAvatar
        user={{ name: user?.first_name || user?.display_name || user?.email }}
        className="h-8 w-8"
      />
      <div className="flex-1 flex relative items-center w-full md:px-2 rounded-sm py-1 shadow-inner  bg-gray-100">
        <div className="absolute right-2 md:right-3 flex items-center md:gap-2 gap-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="#616161"
            className="md:w-6 w-5 h-5 md:h-6 cursor-pointer"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
            />
          </svg>
          <Image
            src="/svgs/function.svg"
            className="md:w-6 w-5 h-5 md:h-6 cursor-pointer"
            width={25}
            height={25}
            alt="function"
          />
        </div>
        <input
          ref={commentRef}
          type="text"
          placeholder="Add a public comment..."
          className="w-full placeholder:text-sm placeholder:md:text-base px-2 md:px-0 bg-transparent outline-none border-none focus:ring-0 focus:outline-none"
        />
      </div>
      {!reply && (
        <button type="submit">
          <Icons.comment />
        </button>
      )}
    </form>
  );
};
