import React from 'react';
import { VideoItem } from '@/components/video/videoItem';

const premiumVideos = [
  {
    id: 1,

    title: 'Video title goes here',
    thumbnail: '/new videos/demo-1.jpg',
    account: 'Account 1',
    views: '1.5M',
    rating: '4.5',
  },
  {
    id: 2,

    title: 'Video title goes here',
    thumbnail: '/new videos/demo-2.jpg',
    account: 'Account 2',
    views: '1.5M',
    rating: '4.5',
  },
  {
    id: 3,

    title: 'Video title goes here',
    thumbnail: '/new videos/demo-9.jpg',
    account: 'Account 3',
    views: '1.5M',
    rating: '4.5',
  },
  {
    id: 4,

    title: 'Video title goes here',
    thumbnail: '/new videos/demo-4.jpg',
    account: 'Account 4',
    views: '1.5M',
    rating: '4.5',
  },
  {
    id: 5,

    title: 'Video title goes here',
    thumbnail: '/new videos/demo-5.png',
    account: 'Account 4',
    views: '1.5M',
    rating: '4.5',
  },
  ,
  {
    id: 2,

    title: 'Video title goes here',
    thumbnail: '/new videos/demo-6.jpg',
    account: 'Account 2',
    views: '1.5M',
    rating: '4.5',
  },
  {
    id: 3,

    title: 'Video title goes here',
    thumbnail: '/new videos/demo-3.jpg',
    account: 'Account 3',
    views: '1.5M',
    rating: '4.5',
  },
];

export const MyLearning = () => {
  return (
    <div className=" mt-8">
      <div>
        <h1 className="text-xl mb-2 font-bold">Continue Watching Course</h1>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {premiumVideos.map((video) => (
            <VideoItem video={video} />
          ))}
        </div>
      </div>
    </div>
  );
};
