import React from 'react';
import Image from 'next/image';

export const Feed = ({ avatar, sender, title, showComments, setShowComments }) => {
  return (
    <div className="flex flex-col px-4 pt-4 pb-3 bg-white shadow-md rounded-md">
      <div className={`flex flex-col ${avatar ? 'gap-4' : 'gap-0'}`}>
        {avatar && (
          <div className="relative">
            <Image
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
              src="/svgs/playarrow.svg"
              width={40}
              height={40}
              alt="playarrow"
            />
            <Image
              className="rounded-md object-cover w-[40rem] h-[12rem]"
              src={avatar}
              alt="Course-details"
              width={400}
              height={200}
            />
          </div>
        )}
        <div className="relative flex gap-2">
          <Image
            src="/demo-4.jpg"
            className="rounded-full w-8 h-8 object-cover"
            width={32}
            height={32}
            alt="demo"
          />
          <div>
            <h2 className="font-semibold text-lg mb-[0.20rem] line-clamp-2">{title}</h2>
            <div className="flex items-center text-sm gap-2 text-gray-700">
              <span>{sender}</span>
            </div>
            <div className="flex items-center text-sm gap-2 text-gray-700">
              <span>1.5M views</span>
              <span>&bull;</span>
              <span>2 hours ago</span>
              <span>&bull;</span>
              <div className="flex items-center">
                4.7{' '}
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="orange"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="none"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
                    />
                  </svg>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
