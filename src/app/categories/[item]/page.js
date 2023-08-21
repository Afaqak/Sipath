'use client';
import Image from 'next/image';
import React from 'react';
import { Video, ExpertsComponent, ContentContainer } from '@/components';
import { useRouter } from 'next/navigation';

const colors = {
  physics: '#371FCA',
  mathematics: '#1C8827',
  english: '#1850BC',
  literature: '#F3992F',
  coding: '#000000',
  chemistry: '#B8730D',
  biology: '#03A185',
  history: '#64420E',
  psychology: '#FB3C22',
  art: '#9747FF',
};

const Courses = [
  {
    id: 1,
    title: 'Video 1',
    thumbnail: '/new videos/demo-6.jpg',
    account: 'Account 1',
    views: '1.5M',
    rating: '4.5',
    category: 'mathematics,english,math',
    price: '19.99',
  },
  {
    id: 2,
    title: 'Video 2',
    thumbnail: '/new videos/demo-7.jpg',
    account: 'Account 2',
    views: '1.5M',
    rating: '4.5',
    category: 'mathematics,english,chemistry',
  },
  {
    id: 3,
    title: 'Video 3',
    thumbnail: '/new videos/demo-8.png',
    account: 'Account 3',
    views: '1.5M',
    rating: '4.5',
    category: 'physics,art,math',
  },
  {
    id: 4,
    title: 'Video 4',
    thumbnail: '/new videos/demo-9.jpg',
    account: 'Account 4',
    views: '1.5M',
    rating: '4.5',
    price: 19.99,
    category: 'history,english,coding',
  },
  {
    id: 5,
    title: 'Video 4',
    thumbnail: '/new videos/demo-10.jpg',
    account: 'Account 4',
    views: '1.5M',
    rating: '4.5',
    category: 'mathematics,english,biology',
  },

  {
    id: 6,
    title: 'Video 2',
    thumbnail: '/new videos/demo-11.jpg',
    account: 'Account 2',
    views: '1.5M',
    rating: '4.5',
    category: 'psychology,english,math',
  },
  {
    id: 7,
    title: 'Video 2',
    thumbnail: '/new videos/demo-2.jpg',
    account: 'Account 2',
    views: '1.5M',
    rating: '4.5',
    category: 'chemistry,english,biology',
    price: '19.99',
  },
  {
    id: 8,
    title: 'Video 2',
    thumbnail: '/new videos/demo-3.jpg',
    account: 'Account 2',
    views: '1.5M',
    rating: '4.5',
    category: 'chemistry,english,art',
  },
  {
    id: 9,
    title: 'Video 2',
    thumbnail: '/new videos/demo-4.jpg',
    account: 'Account 2',
    views: '1.5M',
    rating: '4.5',
    category: 'coding,art,physics',
    price: '19.99',
  },
];

const dataExpert = [
  {
    accountName: 'John Doe',
    followers: '24k',
    rating: '4.7',
    imageUrl: '/professor/prof-1.jpg',
    description:
      'Lorem ipsum dolor sit amet consectetur. Id massa et fermentum. Lorem ipsum dolor sit amet consectetur.',
    category: 'mathematics,english,math',
  },
  {
    accountName: 'Jane Smith',
    followers: '18k',
    rating: '4.5',
    imageUrl: '/professor/prof-2.jpg',
    description:
      'Lorem ipsum dolor sit amet consectetur. Id massa et fermentum. Lorem ipsum dolor sit amet consectetur.',
    category: 'chemistry,english,biology',
  },
  {
    accountName: 'Michael Johnson',
    followers: '32k',
    rating: '4.9',
    imageUrl: '/professor/prof-3.jpg',
    description:
      'Lorem ipsum dolor sit amet consectetur. Id massa et fermentum. Lorem ipsum dolor sit amet consectetur.',
    category: 'physics,art,math',
  },
  {
    accountName: 'Sarah Williams',
    followers: '14k',
    rating: '4.3',
    imageUrl: '/professor/prof-4.jpg',
    description:
      'Lorem ipsum dolor sit amet consectetur. Id massa et fermentum. Lorem ipsum dolor sit amet consectetur.',
    category: 'history,english,coding',
  },
];

const Page = ({ params }) => {
  const router = useRouter();
  console.log(colors[params.item]);

  // const findCategoryItems=Courses[0].category.split(",").includes(params.item)
  const findCourseWithNoPrize = Courses.filter(
    (cat) => cat?.category?.split(',').includes(params.item) && !cat.price
  );
  const findCourseWithPrize = Courses.filter(
    (cat) => cat?.category?.split(',').includes(params.item) && cat.price
  );
  const findExperts = dataExpert.filter((cat) => cat?.category?.split(',').includes(params.item));

  return (
    <ContentContainer>
      <div className="py-8">
        <div className="flex text-lg font-semibold gap-2">
          <span className="cursor-pointer" onClick={() => router.back()}>
            Categories
          </span>{' '}
          {'>'}
          <Image src={`/svgs/${params.item}.svg`} width={20} height={20} />{' '}
          <span className={`text-[${colors[params.item]}]`}>
            {params?.item[0].toUpperCase() + params?.item.slice(1)}
          </span>
        </div>
      </div>
      <Video title={'Videos'} videos={findCourseWithNoPrize} />
      <Video title={'Premium'} videos={findCourseWithPrize} />
      <div className="mx-auto">
        <ExpertsComponent title={'Experts'} data={findExperts} />
      </div>
    </ContentContainer>
  );
};

export default Page;
