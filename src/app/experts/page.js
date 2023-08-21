import { ContentContainer, ExpertsComponent } from '@/components';
import React from 'react';
const dataExpert = [
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

const ExpertsPage = () => {
  return (
    <ContentContainer>
      <ExpertsComponent title="Most Followed" data={dataExpert} />
      <ExpertsComponent title="Top Rated" data={dataExpert} />
    </ContentContainer>
  );
};

export default ExpertsPage;
