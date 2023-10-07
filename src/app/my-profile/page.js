'use client';
import React, { useState } from 'react';

import {
  Feed,
  Quiz,
  Video,
  Book,
  PodcastSlider,
  Profile,
  EventsCalendar,
  MyIncome,
  MyAccount,
  MyLearning,
  MyVideos,
} from '@/components';
import { UniversalTab } from '@/components';

const tabs = [
  { key: 'feed', label: 'My Feed', icon: '/svgs/Browser.svg' },
  { key: 'myvideos', label: 'My Videos', icon: '/svgs/Play.svg' },
  { key: 'books', label: 'My Books', icon: '/svgs/rocket.svg' },
  { key: 'quiz', label: 'My Quizzes', icon: '/svgs/quiz.svg' },
  { key: 'mylearning', label: 'My Learning', icon: '/svgs/book.svg' },
  { key: 'calendar', label: 'My Calendar', icon: '/svgs/book.svg' },
  { key: 'income', label: 'My Income', icon: '/svgs/book.svg' },
  { key: 'myaccount', label: 'My Account', icon: '/svgs/book.svg' },
];

const MyProfile = () => {
  const [active, setActive] = useState(tabs[0].key);

  return (
    <>
      <div className="mt-0.5"></div>
      <div className="pb-8 overflow-visible relative w-[90%] md:w-[85%] mx-auto">
        <Profile type={'myprofile'} />
        <UniversalTab
          tabStyle={'grid grid-cols-2 gap-4 md:grid-cols-4'}
          active={active}
          tabs={tabs}
          setActive={setActive}
        />
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
        {active === 'books' && (
          <div className="grid mt-8 gap-4 grid-cols-1 lg:grid-cols-2">
            <Book />
            <Book />
          </div>
        )}
        {active === 'calendar' && <EventsCalendar />}
        {active === 'income' && <MyIncome />}
        {active === 'myvideos' && <MyVideos />}
        {active === 'myaccount' && <MyAccount />}
        {active === 'mylearning' && <MyLearning />}
      </div>
    </>
  );
};

export default MyProfile;
