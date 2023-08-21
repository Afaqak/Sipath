import React from 'react';
import { MyVideoItem } from '../myVideos/myVideoItem';
const premiumVideos = [
  {
    id: 1,
    price: '19.99',
    title: 'Video title goes here',
    thumbnail: '/new videos/demo-1.jpg',
    account: 'Account 1',
    views: '1.5M',
    rating: '4.5',
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

export const MyVideos = () => {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 mt-8 gap-4">
      {premiumVideos.map((video) => (
        <MyVideoItem video={video} />
      ))}
    </div>
  );
};
