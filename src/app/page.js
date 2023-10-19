'use client';
import React, { useEffect, useState } from 'react';
import { NewVideos, VideoFeed, PremiumVideos, Experts, Categories } from '@/components';
import { withPrivateRoute } from '@/components/privateRoute';

const comments = [
  {
    id: 1,
    avatar: '/new videos/demo-3.jpg',
    title: 'Video title goes here',
    sender: 'User',
    message: 'Hello! how are you?',
  },
  {
    id: 2,
    avatar: '/new videos/demo-2.jpg',
    title: 'Video title goes here',
    sender: 'User',
    message:
      'lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    replies: [
      {
        id: 1,
        sender: 'Bot',
        message: 'Sure, go ahead! lorem ipsum dolor sit amet consectetur ',
      },
    ],
  },
  {
    id: 3,

    sender: 'User',
    message:
      'lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    replies: [
      {
        id: 1,
        sender: 'Bot',
        message: 'Sure, go ahead! lorem ipsum dolor sit amet consectetur ',
      },
    ],
  },
  {
    id: 4,
    avatar: '/new videos/demo-3.jpg',
    title: 'Video title goes here',
    sender: 'User',
    message:
      'lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    replies: [
      {
        id: 1,
        sender: 'Bot',
        message: 'Sure, go ahead! lorem ipsum dolor sit amet consectetur ',
      },
    ],
  },
  {
    id: 5,
    avatar: '/demo-5.jpg',
    title: 'Video title goes here',
    sender: 'User',
    message:
      'lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    replies: [
      {
        id: 1,
        sender: 'Bot',
        message: 'Sure, go ahead! lorem ipsum dolor sit amet consectetur ',
      },
    ],
  },
];

const Home = () => {
  // console.log(data?.user, 'session');

  return (
    <div className="">
      <div className="w-[90%] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <VideoFeed comments={comments.slice(1, 2)} />
        <VideoFeed comments={comments.slice(1, 2)} />
        <VideoFeed comments={comments.slice(1, 2)} />
      </div>
      <NewVideos />
      <div className="w-[90%] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <VideoFeed comments={comments.slice(3, 4)} />
        <VideoFeed comments={comments.slice(3, 4)} />
        <VideoFeed comments={comments.slice(3, 4)} />
      </div>
      <PremiumVideos />
      <div className="w-[90%] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <VideoFeed comments={comments.slice(1, 2)} />
        <VideoFeed comments={comments.slice(3, 4)} />
        <VideoFeed comments={comments.slice(3, 4)} />
      </div>
      <Experts />
      <div className="w-[90%] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <VideoFeed comments={comments.slice(3, 4)} />
        <VideoFeed comments={comments.slice(3, 4)} />
        <VideoFeed comments={comments.slice(3, 4)} />
      </div>
      <Categories />
    </div>
  );
};

export default withPrivateRoute(Home);
