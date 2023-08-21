'use client';
import React, { useState } from 'react';
import { ContentContainer, Video, ArchivedPodcast, upcomingPodcast } from '@/components';

const newUploads = [
  {
    id: 1,
    title: 'Video title goes here',
    thumbnail: '/new videos/demo-6.jpg',
    account: 'Account 1',
    views: '1.5M',
    rating: '4.5',
    live: true,
  },
  {
    id: 2,
    title: 'Video title goes here',
    thumbnail: '/new videos/demo-7.jpg',
    account: 'Account 2',
    views: '1.5M',
    rating: '4.5',
    live: true,
  },
  {
    id: 3,
    price: '19.99',
    title: 'Video title goes here',
    thumbnail: '/new videos/demo-8.png',
    account: 'Account 3',
    views: '1.5M',
    rating: '4.5',
    live: true,
  },
  {
    id: 4,
    live: true,
    title: 'Video title goes here',
    thumbnail: '/new videos/demo-9.jpg',
    account: 'Account 4',
    views: '1.5M',
    rating: '4.5',
  },
  {
    id: 5,
    price: '19.99',
    title: 'Video title goes here',
    thumbnail: '/new videos/demo-10.jpg',
    account: 'Account 4',
    views: '1.5M',
    rating: '4.5',
    live: true,
  },
  ,
  {
    id: 2,
    price: '19.99',
    title: 'Video title goes here',
    thumbnail: '/new videos/demo-11.jpg',
    account: 'Account 2',
    views: '1.5M',
    rating: '4.5',
    live: true,
  },
];

const PodcastPage = () => {
  const [activeButton, setActiveButton] = useState('live');

  const handleButtonClick = (button) => {
    setActiveButton(button);
  };

  return (
    <ContentContainer>
      <div className="w-full md:w-[90%] lg:w-[75%] mx-auto">
        <div className="my-8 flex justify-center gap-4 md:gap-10 ">
          <div className="flex p-1 w-full bg-white shadow-md rounded-sm cursor-pointer">
            <div
              className={`flex gap-2 w-full items-center justify-center ${
                activeButton === 'live' ? 'bg-[#FB3C22] text-white' : ''
              }`}
              onClick={() => handleButtonClick('live')}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-5 h-5"
              >
                <circle cx="12" cy="12" r="9" strokeLinecap="round" strokeLinejoin="round" />
                <circle
                  cx="12"
                  cy="12"
                  r="5"
                  fill={activeButton === 'live' ? 'white' : 'black'}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span className="hidden md:block">Live Now</span>
            </div>
          </div>
          <div className="flex p-1 bg-white shadow-md rounded-sm w-full  cursor-pointer">
            <div
              className={`flex items-center gap-2 justify-center w-full py-2 ${
                activeButton === 'upcoming' ? 'bg-[#FB3C22] text-white' : ''
              }`}
              onClick={() => handleButtonClick('upcoming')}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z"
                />
              </svg>
              <span className="hidden md:block">Upcoming Podcasts</span>
            </div>
          </div>
          <div className="flex gap-2 p-1 bg-white shadow-md rounded-sm w-full cursor-pointer">
            <div
              className={`flex gap-2  rounded-sm w-full items-center justify-center cursor-pointer  ${
                activeButton === 'archived' ? 'bg-[#FB3C22] text-white' : ''
              }`}
              onClick={() => handleButtonClick('archived')}
            >
              <svg
                width="20"
                height="19"
                viewBox="0 0 25 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  className={`${activeButton === 'archived' ? ' strokeWhite' : ' stroke-black'}`}
                  d="M2.5 6.16667L11.7308 2.32051C12.2231 2.11538 12.7769 2.11538 13.2692 2.32051L17.5 4.08333L22.5 6.16667M2.5 6.16667L7.5 8.25M2.5 6.16667V10.5M12.5 10.3333V22M12.5 10.3333L22.5 6.16667M12.5 10.3333L7.5 8.25M12.5 22L3.11538 18.0897C2.74274 17.9345 2.5 17.5704 2.5 17.1667V13.5M12.5 22L21.8846 18.0897C22.2573 17.9345 22.5 17.5704 22.5 17.1667V6.16667M7.5 8.25L14 5.5"
                  stroke="black"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span className="hidden md:block">Archived Podcasts</span>
            </div>
          </div>
        </div>
        <div className="flex">
          <input
            placeholder="Search..."
            type="text"
            className="w-full px-2 focus:outline-none border-none py-1 rounded-l-md shadow-[inset_1px_2px_4px_rgba(0,0,0,0.1)]"
          />
          <div className="bg-white px-4 flex items-center border-2 border-gray-300 rounded-r-md">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6 p-1"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
              />
            </svg>
          </div>
        </div>
        {activeButton === 'upcoming' && <UpcomingPodcast />}
      </div>
      {activeButton === 'live' && <Video videos={newUploads} />}
      {activeButton === 'archived' && <ArchivedPodcast />}
    </ContentContainer>
  );
};

export default PodcastPage;
