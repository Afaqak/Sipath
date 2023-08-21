import React from 'react';
import { ContentContainer, Video } from '@/components';
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
const newUploads = [
  {
    id: 1,
    price: '19.99',
    title: 'Video title goes here',
    thumbnail: '/new videos/demo-6.jpg',
    account: 'Account 1',
    views: '1.5M',
    rating: '4.5',
  },
  {
    id: 2,
    price: '19.99',
    title: 'Video title goes here',
    thumbnail: '/new videos/demo-7.jpg',
    account: 'Account 2',
    views: '1.5M',
    rating: '4.5',
  },
  {
    id: 3,
    price: '19.99',
    title: 'Video title goes here',
    thumbnail: '/new videos/demo-8.png',
    account: 'Account 3',
    views: '1.5M',
    rating: '4.5',
  },
  {
    id: 4,
    price: '19.99',
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
  },
];

const Premium = () => (
  <ContentContainer>
    <Video videos={premiumVideos} title="Most Popular" load={true} />
    <Video videos={newUploads} title="New Uploads" load={true} />
  </ContentContainer>
);

export default Premium;
