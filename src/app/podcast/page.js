'use client';
import React, { useEffect, useState } from 'react';
import { ContentContainer, ArchivedPodcast, UpcomingPodcast } from '@/components';
import axios from '../../utils/index';
import { useSession } from 'next-auth/react';
import { Icons } from '@/components';
import UserAvatar from '@/components/common/userAvatar';
import Link from 'next/link';
import Image from 'next/image';
const thumbnails = [
  '/new videos/demo-7.jpg',
  '/new videos/demo-9.jpg',
  '/new videos/demo-10.jpg',
  '/new videos/demo-11.jpg',
  '/new videos/demo-8.png',
];

const formatTimeAgo = (timestamp) => {
  const now = new Date();
  const createdAt = new Date(timestamp);

  const timeDiff = now - createdAt;
  const seconds = Math.floor(timeDiff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const weeks = Math.floor(days / 7);
  const months = Math.floor(days / 30);

  if (months > 0) {
    return `${months} month${months > 1 ? 's' : ''} ago`;
  } else if (weeks > 0) {
    return `${weeks} week${weeks > 1 ? 's' : ''} ago`;
  } else if (days > 0) {
    return `${days} day${days > 1 ? 's' : ''} ago`;
  } else if (hours > 0) {
    return `${hours} hour${hours > 1 ? 's' : ''} ago`;
  } else if (minutes > 0) {
    return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
  } else {
    return `${seconds} second${seconds > 1 ? 's' : ''} ago`;
  }
};

const PodcastPage = () => {
  const [activeButton, setActiveButton] = useState('live');
  const [podcasts, setPodcasts] = useState([]);
  const { data: user } = useSession();
  const handleButtonClick = (button) => {
    setActiveButton(button);
  };

  useEffect(() => {
    const fetchPodcasts = async () => {
      try {
        const response = await axios.get('/podcasts', {
          headers: {
            Authorization: `Bearer ${user.token}`,
            'Content-Type': 'application/json',
          },
        });

        setPodcasts(response.data);
        console.log(response.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchPodcasts();
  }, []);

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
      {activeButton === 'live' && <PodcastVideos podcasts={podcasts} />}
      {activeButton === 'archived' && <ArchivedPodcast />}
    </ContentContainer>
  );
};

export default PodcastPage;

const PodcastVideos = ({ podcasts }) => {
  return (
    <div className="grid grid-cols-1 py-8 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4  gap-4">
      {podcasts.map((podcast) => (
        <PodcastItem key={Math.random() * 1000000} podcast={podcast} />
      ))}
    </div>
  );
};

const PodcastItem = ({ podcast }) => {
  return (
    <Link
      href={`/podcast/live?room=${podcast?.room_id}&listener=true`}
      className=" h-[18.6rem] relative block mb-6 w-ful p-4 bg-white shadow-md rounded-md"
    >
      {podcast?.live && (
        <span className="absolute top-6 z-[1000] right-6 bg-[#FB3C22] flex gap-1 items-center py-[0.20rem] rounded-xl text-sm text-white px-2 font-medium">
          <Icons.live className="w-5 h-5" />
          Live
        </span>
      )}

      {podcast?.price && podcast?.price > 0 && (
        <span className="absolute top-2 z-[1000] left-0 bg-green-[#1C8827] bg-green-700 text-[0.7rem] py-[0.15rem]  rounded-r-md text-white px-3 font-medium">
          {podcast?.price}$
        </span>
      )}
      <div className="relative">
        <Icons.play />
        <Image
          src={thumbnails[Math.floor(Math.random() * thumbnails.length)]}
          alt={thumbnails[Math.floor(Math.random() * thumbnails.length)]}
          width={300}
          height={200}
          className="rounded-md object-cover w-full h-44"
        />
      </div>
      <div className="mt-3 flex gap-2 items">
        <UserAvatar />
        <div>
          <h1 className="text-medium font-semibold mb-[0.20rem] line-clamp-2">{podcast?.title}</h1>
          <div className="flex items-center text-sm gap-2 text-gray-700">
            <span>authors</span>
          </div>
          <div className="flex items-center text-sm gap-2 text-gray-700">
            <span>{podcast?.views} views</span>
            <span>&bull;</span>
            <span>{formatTimeAgo(podcast.createdAt)}</span>
            <span>&bull;</span>
            <div className="flex items-center">
              {podcast?.rating}{' '}
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
    </Link>
  );
};
