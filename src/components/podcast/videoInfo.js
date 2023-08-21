import React from 'react';
import Image from 'next/image';
import { Stars } from '../common/5star';
const ProfileInfo = () => {
  return (
    <div className="text-gray-600 flex items-center gap-2">
      <Image
        src="/demo-4.jpg"
        className="tutor-img w-[2.4rem] object-cover"
        width={100}
        height={50}
      />
      <div className="flex flex-col">
        <span>Account Name</span>
        <span className="text-[0.75rem]">12k followers</span>
      </div>
    </div>
  );
};

const Ratings = () => {
  return (
    <div className="flex gap-1 items-center flex-col text-sm">
      <h2 className="flex items-center font-bold">
        4.7 <Image src="/svgs/star.png" width={24} height={24} />
      </h2>
    </div>
  );
};

const ActionButton = ({ icon, text }) => {
  return (
    <button className="bg-gray-100 flex items-center gap-3 py-2 font-medium px-6 md:px-4 rounded-md">
      {text}
      {icon}
    </button>
  );
};

const TagsAndDescription = () => {
  return (
    <div className="text-sm mt-3">
      <div className="text-[#616161]">
        <span>24k views</span> . <span>2 months ago</span> #loremipsum #lorem
      </div>
      <p>
        Lorem ipsum dolor sit amet consectetur. Id massa et fermentum. Lorem ipsum dolor sit amet
        consectetur. Id massa et fermentum. Show more
      </p>
    </div>
  );
};

export const VideoInfo = () => {
  return (
    <div className="bg-white mt-8 py-4 px-4 md:px-6 w-full rounded-md shadow-md">
      <div className="flex justify-between flex-col md:flex-row md:items-center">
        <div className="mb-2">
          <h1 className="font-semibold text-lg mb-1">Video title goes here</h1>
          <div className="flex gap-4 items-center justify-between">
            <ProfileInfo />
            <button className="py-1 border-black font-medium text-sm border-2 px-4 rounded-md">
              Follow
            </button>
          </div>
        </div>
        <div className="">
          <div className="flex items-center gap-3 justify-end">
            <Stars /> <Ratings />
          </div>
          <div className="flex gap-3 md:mt-2 mt-3 justify-end md:justify-start">
            <ActionButton
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z"
                  />
                </svg>
              }
              text="Share"
            />
            <ActionButton
              icon={<Image src={'/svgs/playlist_add.svg'} width={25} height={25} />}
              text="Save"
            />
            <ActionButton
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z"
                  />
                </svg>
              }
            />
          </div>
        </div>
      </div>
      <TagsAndDescription />
    </div>
  );
};
