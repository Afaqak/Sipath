'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import {
  Feed,
  BookAppointment,
  Quiz,
  Video,
  BookSlider,
  Donate,
  PodcastSlider,
  Profile,
  UniversalTab,
} from '@/components';

const courses = [
  {
    id: 1,
    price: '19.99',
    title: 'Video title goes here',
    thumbnail: '/new videos/demo-1.jpg',
    account: 'Account 1',
    views: '1.5M',
    rating: '4.5',
    livepodcast: true,
  },
  {
    id: 2,
    price: '19.99',
    title: 'Video title goes here',
    thumbnail: '/new videos/demo-2.jpg',
    account: 'Account 2',
    views: '1.5M',
    rating: '4.5',
  },
  {
    id: 3,
    price: '19.99',
    title: 'Video title goes here',
    thumbnail: '/new videos/demo-9.jpg',
    account: 'Account 3',
    views: '1.5M',
    rating: '4.5',
  },
  {
    id: 4,
    price: '19.99',
    title: 'Video title goes here',
    thumbnail: '/new videos/demo-4.jpg',
    account: 'Account 4',
    views: '1.5M',
    rating: '4.5',
  },
  {
    id: 5,
    price: '19.99',
    title: 'Video title goes here',
    thumbnail: '/new videos/demo-5.png',
    account: 'Account 4',
    views: '1.5M',
    rating: '4.5',
  },
  ,
  {
    id: 2,
    price: '19.99',
    title: 'Video title goes here',
    thumbnail: '/new videos/demo-6.jpg',
    account: 'Account 2',
    views: '1.5M',
    rating: '4.5',
  },
  {
    id: 3,
    price: '19.99',
    title: 'Video title goes here',
    thumbnail: '/new videos/demo-3.jpg',
    account: 'Account 3',
    views: '1.5M',
    rating: '4.5',
  },
];
const tabs = [
  { key: 'feed', label: 'Feed', icon: '/svgs/Browser.svg' },
  { key: 'videos', label: 'Videos', icon: '/svgs/Play.svg' },
  { key: 'courses', label: 'Courses', icon: '/svgs/rocket.svg' },
  { key: 'quiz', label: 'Quizzes', icon: '/svgs/quiz.svg' },
  { key: 'podcast', label: 'Podcast', icon: '/svgs/podcasts.svg' },
  { key: 'book', label: 'Books', icon: '/svgs/book.svg' },
];

const Tutor = () => {
  const [active, setActive] = useState(tabs[0].key);
  const [donate, setDonate] = useState(false);
  const [appointment, setAppointment] = useState(false);
  return (
    <div className="pb-8 overflow-visible relative w-[90%] md:w-[85%] mx-auto">
      <Profile />
      <div className="flex justify-between gap-2 mt-4">
        <button
          onClick={() => setAppointment(!appointment)}
          className="py-1 bg-white flex items-center justify-center gap-2 rounded-md w-full border-2 border-black"
        >
          <Image src={'/svgs/Calendar.svg'} alt="calendart" width={20} height={20} />
          <span className="md:block hidden">Book Appointment</span>
        </button>
        <button className="py-1 bg-white flex items-center justify-center gap-2 rounded-md w-full border-2 border-[#1850BC]">
          <Image src={'/svgs/messageblue.svg'} alt="calendart" width={20} height={20} />
          <span className="md:block hidden">Message Expert</span>
        </button>
        <button
          onClick={() => setDonate(!donate)}
          className="py-1 bg-white flex items-center justify-center gap-2 rounded-md w-full border-2 border-[#1C8827]"
        >
          <Image src={'/svgs/coins.svg'} alt="calendart" width={20} height={20} />
          <span className="md:block hidden">Donate</span>
        </button>
      </div>
      <div className="flex mt-4">
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
      <UniversalTab
        tabStyle="grid gap-2 grid-cols-3 lg:grid-cols-6 "
        tabs={tabs}
        setActive={setActive}
        active={active}
      />
      {appointment && <BookAppointment setAppointment={setAppointment} />}
      {donate && <Donate setDonate={setDonate} />}
      {active === 'feed' && (
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          <div className=" bg-white shadow-md mx-auto mt-10 rounded-md">
            <Feed avatar={'/new videos/demo-3.jpg'} title={'new video'} sender={'john'} />
          </div>
          <div className="   bg-white shadow-md mx-auto mt-10 rounded-md">
            <Feed avatar={'/new videos/demo-9.jpg'} title={'new video'} sender={'john'} />
          </div>
          <div className=" bg-white shadow-md mx-auto mt-10 rounded-md">
            <Feed avatar={'/new videos/demo-9.jpg'} title={'new video'} sender={'john'} />
          </div>
        </div>
      )}
      {active === 'courses' && <Video videos={courses} />}
      {active === 'quiz' && (
        <div className="w-[90%] mx-auto mt-10">
          <Quiz />
          <Quiz />
          <Quiz />
        </div>
      )}
      {active === 'podcast' && (
        <div>
          <PodcastSlider videos={courses} />
          <Video videos={courses} title={'Past Podcasts'} />
        </div>
      )}
      {active === 'book' && (
        <div className="mt-8">
          <BookSlider />
        </div>
      )}
    </div>
  );
};

export default Tutor;
