'use client';
import React, { useEffect, useState } from 'react';
import { ArchivedPodcast, UpcomingPodcast } from '@/components';
import axios from '@/utils/index'
import { useSession } from 'next-auth/react';
import { Icons } from '@/components';
import UserAvatar from '@/components/common/userAvatar';
import Link from 'next/link';
import Image from 'next/image';
import { useFormattedTimeAgo } from '@/hooks/useFormattedTimeAgo';


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
        const response = await axios.get('/podcasts?type=all');

        setPodcasts(response.data);

      } catch (err) {
        console.error(err);
      }
    };
    fetchPodcasts();
  }, []);

  return (
    <>
      <div className="w-full md:w-[90%] lg:w-[75%] mx-auto">
        <div className="my-8 flex justify-center gap-4 md:gap-10 ">
          <div className="flex p-1 w-full bg-white shadow-md rounded-sm cursor-pointer">
            <div
              className={`flex gap-2 w-full items-center justify-center ${activeButton === 'live' ? 'bg-[#FB3C22] text-white' : ''
                }`}
              onClick={() => handleButtonClick('live')}
            >
              <Icons.livePodcast fill={activeButton === 'live' ? 'white' : 'black'} />
              <span className="hidden md:block">Live Now</span>
            </div>
          </div>
          <div className="flex p-1 bg-white shadow-md rounded-sm w-full  cursor-pointer">
            <div
              className={`flex items-center gap-2 justify-center w-full py-2 ${activeButton === 'upcoming' ? 'bg-[#FB3C22] text-white' : ''
                }`}
              onClick={() => handleButtonClick('upcoming')}
            >
              <Icons.upcomingPodcast />
              <span className="hidden md:block">Upcoming Podcasts</span>
            </div>
          </div>
          <div className="flex gap-2 p-1 bg-white shadow-md rounded-sm w-full cursor-pointer">
            <div
              className={`flex gap-2  rounded-sm w-full items-center justify-center cursor-pointer  ${activeButton === 'archived' ? 'bg-[#FB3C22] text-white' : ''
                }`}
              onClick={() => handleButtonClick('archived')}
            >
              <Icons.archivedPodcast
                stroke={`${activeButton === 'archived' ? 'white' : 'black'}`}
              />
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
            <Icons.search />
          </div>
        </div>
        {activeButton === 'upcoming' && <UpcomingPodcast />}
      </div>
      {activeButton === 'live' && <PodcastVideos podcasts={podcasts} />}
      {activeButton === 'archived' && <ArchivedPodcast />}
    </>
  );
};

export default PodcastPage;

const PodcastVideos = ({ podcasts }) => {
  console.log(podcasts)
  return (
    <div className="grid grid-cols-1 py-8 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4  gap-4 w-[90%] mx-auto">
      {podcasts.map((podcast) => (
        <PodcastItem key={Math.random() * 1000000} podcast={podcast} />
      ))}
    </div>
  );
};

const PodcastItem = ({ podcast }) => {
const formattedTimeAgo = useFormattedTimeAgo(podcast?.createdAt)

  return (
    <Link
      href={`/podcast/live/${podcast?.id}?room=${podcast?.room_id}`}
      className=" max-h-[18.6rem] relative block mb-6 w-ful p-4 bg-white box-shadow-main rounded-md"
    >
      {podcast?.live && (
        <span className="absolute top-6 z-[1000] right-6 bg-[#FB3C22] flex gap-1 items-center py-[0.20rem] rounded-xl text-sm text-white px-2 font-medium">
          <Icons.live className="w-5 h-5" />
          Live
        </span>
      )}

      {podcast?.price && podcast?.price > 0 && (
        <span className="absolute top-2 z-[1000] left-0 bg-subcolor  text-[0.7rem] py-[0.15rem]  rounded-r-md text-white px-3 font-medium">
          {podcast?.price}$
        </span>
      )}
      <div className="relative">
        <Icons.play />
        {
          podcast?.thumbnail &&
          <Image
            src={podcast?.thumbnail || '/place-holder-post.jpeg'}
            alt={podcast?.title}
            width={300}
            height={200}
            className="rounded-md object-cover w-full h-44"
          />
    }
      </div>
      <div className="mt-3 flex gap-2 items">
        <UserAvatar user={{
          image: podcast['tutor.user.profile_image'],
          name: podcast['tutor.user.display_name']
        }}
        />
        <div>
          <h1 className="text-medium font-semibold mb-[0.20rem] line-clamp-2">{podcast?.title}</h1>
          <div className="flex items-center text-sm gap-2 text-gray-700">
            <span>{podcast && podcast['tutor.user.display_name']}</span>
          </div>
          <div className="flex items-center text-sm gap-2 text-gray-700">
            <span>{podcast?.views} views</span>
            <span>&bull;</span>
            <span>{podcast && formattedTimeAgo}</span>
            <span>&bull;</span>
            <div className="flex items-center">
              {podcast?.rating}{' '}
              <span>
                <Icons.rating />
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};
