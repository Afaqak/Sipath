import React from 'react';
import Image from 'next/image';
import { ExpertItem, Carousel } from '@/components';

const experts = [
  {
    accountName: 'John Doe',
    followers: '24k',
    rating: '4.7',
    imageUrl: '/professor/prof-1.jpg',
    description:
      'Lorem ipsum dolor sit amet consectetur. Id massa et fermentum. Lorem ipsum dolor sit amet consectetur.',
  },
  {
    accountName: 'Jane Smith',
    followers: '18k',
    rating: '4.5',
    imageUrl: '/professor/prof-2.jpg',
    description:
      'Lorem ipsum dolor sit amet consectetur. Id massa et fermentum. Lorem ipsum dolor sit amet consectetur.',
  },
  {
    accountName: 'Michael Johnson',
    followers: '32k',
    rating: '4.9',
    imageUrl: '/professor/prof-3.jpg',
    description:
      'Lorem ipsum dolor sit amet consectetur. Id massa et fermentum. Lorem ipsum dolor sit amet consectetur.',
  },
  {
    accountName: 'Sarah Williams',
    followers: '14k',
    rating: '4.3',
    imageUrl: '/professor/prof-4.jpg',
    description:
      'Lorem ipsum dolor sit amet consectetur. Id massa et fermentum. Lorem ipsum dolor sit amet consectetur.',
  },
];

export const Experts = () => {
  return (
    <div className="bg-[#FFD654] my-8">
      <div className="py-8 overflow-visible justify-between items-center relative w-[80%] mx-auto">
        <div className="flex gap-2 items-center mb-4">
          <h2 className="text-3xl mb-2">Suggested Experts</h2>
        </div>
        <div className="">
          <Carousel items={experts} contentComponent={ExpertItem} />
        </div>
      </div>
    </div>
  );
};
