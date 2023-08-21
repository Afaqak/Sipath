import React from 'react';
import Image from 'next/image';

export const CommentInput = () => {
  return (
    <div className="p-4 flex gap-3 items-center">
      <Image
        src="/demo-4.jpg"
        className="rounded-full w-[2.5rem] mr-1 h-[2.5rem] object-cover"
        width={100}
        height={50}
        alt="demo-4"
      />

      <div className="flex-1 flex relative items-center w-full md:px-2 rounded-sm py-1 shadow-inner  bg-gray-100">
        <div className="absolute right-2 md:right-3 flex items-center md:gap-2 gap-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="#616161"
            class="md:w-6 w-5 h-5 md:h-6 cursor-pointer"
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
          type="text "
          placeholder="Add a public comment..."
          className="w-full placeholder:text-sm placeholder:md:text-base px-2 md:px-0 bg-transparent outline-none border-none focus:ring-0 focus:outline-none"
        />
      </div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="black"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="white"
        className="md:w-8 w-6 h-6 md:h-8 md:relative md:right-0 absolute right-6 "
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
        />
      </svg>
    </div>
  );
};
