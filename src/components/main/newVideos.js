import React from 'react';

import Image from 'next/image';
import { VideoItem, Carousel } from '@/components';

const newVideos = [
  {
    id: 1,
    title: 'Video title goes here',
    thumbnail: '/new videos/demo-2.jpg',
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
    thumbnail: '/new videos/demo-3.jpg',
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
    thumbnail: '/new videos/demo-4.jpg',
    account: 'Account 4',
    views: '1.5M',
    rating: '4.5',
  },
];

export const NewVideos = () => {
  return (
    <div className="bg-[#FFD654] my-8">
      <div className="py-8 overflow-visible justify-between items-center relative w-[90%] mx-auto">
        <div className="flex gap-2 items-center mb-4">
          <Image src={'/svgs/circle.svg'} className="mt-1" width={25} height={25} />
          <h2 className="text-3xl">New Videos</h2>
        </div>
        <div className="overflow-visible md:-ml-1">
          <Carousel items={newVideos} contentComponent={VideoItem} />
        </div>
      </div>
    </div>
  );
};
