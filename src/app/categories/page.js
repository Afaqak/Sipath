'use client';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ContentContainer } from '@/components';

const categoriesData = [
  {
    imagePath: '/svgs/physics.svg',
    title: 'Physics',
  },
  {
    imagePath: '/svgs/chemistry.svg',
    title: 'Chemistry',
  },
  {
    imagePath: '/svgs/mathematics.svg',
    title: 'Mathematics',
  },
  {
    imagePath: '/svgs/psychology.svg',
    title: 'Psychology',
  },
  {
    imagePath: '/svgs/coding.svg',
    title: 'Coding',
  },
  {
    imagePath: '/svgs/art.svg',
    title: 'Art',
  },
  {
    imagePath: '/svgs/biology.svg',
    title: 'Biology',
  },
  {
    imagePath: '/svgs/history.svg',
    title: 'History',
  },
  {
    imagePath: '/svgs/english.svg',
    title: 'English',
  },
  {
    imagePath: '/svgs/literature.svg',
    title: 'Literature',
  },
];

const CategoriesPage = () => {
  return (
    <ContentContainer>
      <div className="py-8 grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 cursor-pointer 2xl:grid-cols-5 gap-4">
        {categoriesData.map((data) => (
          <Link
            href={`/categories/${data.title.toLowerCase()}`}
            className="flex flex-col items-center justify-center shadow-lg mb-2
         p-4 rounded-md bg-white h-44"
          >
            {' '}
            <Image
              className=" w-24 h-20 object-contain"
              src={data.imagePath}
              width={80}
              height={80}
              alt={data.imagePath}
            />
            <h1 className="text-xl font-semibold mt-4 text-black">{data.title}</h1>
          </Link>
        ))}
      </div>
    </ContentContainer>
  );
};

export default CategoriesPage;
