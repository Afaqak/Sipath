'use client';
import Link from 'next/link';
import React, { useRef, useState } from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';

export function CategoriesSlider({ data:category }) {
  return (
    <Swiper
      slidesPerView={5}
      spaceBetween={10}
      pagination={{
        clickable: true,
      }}
      breakpoints={{
        300: {
          slidesPerView: 1,
        },
        640: {
          slidesPerView: 2,
        },
        768: {
          slidesPerView: 3,
        },
      }}
      className="mySwiper w-[90%] md:w-full "
    >
      {
        category.length > 0 && category?.map(data => (
                <SwiperSlide className="customCatSlide">
          <Link
            key={data.id}
            href={`/categories/${data.category.toLowerCase()}?id=${data?.id}`}
            className="flex flex-col items-center justify-center shadow-lg mb-2 p-4 rounded-md bg-white h-44"
          >
            <Image
              className="w-24 h-20 object-contain"
              src={`/svgs/${data.category.toLowerCase()}.svg`}
              width={80}
              height={80}
              alt={data.category}
            />
            <h1 className="text-xl font-semibold mt-4 text-black">{data.category}</h1>
          </Link>
          </SwiperSlide>
        ))}



      {/* <SwiperSlide className="customCatSlide">
        <div
          className="flex flex-col items-center justify-center shadow-lg mb-4
         p-4 rounded-md bg-white h-44"
        >
          <Image src={'/svgs/physics.svg'} alt="physics" width={90} height={90} />
          <h1 className="text-xl font-semibold mt-4 text-[#371FCA]">Physics</h1>
        </div>
      </SwiperSlide>
      <SwiperSlide className="customCatSlide">
        <div
          className="flex flex-col items-center justify-center shadow-lg mb-2
         p-4 rounded-md bg-white h-44"
        >
          <Image src={'/svgs/chemistry.svg'} alt="chemistry" width={90} height={90} />
          <h1 className="text-xl font-semibold mt-4 text-[#B8730D]">Chemistry</h1>
        </div>
      </SwiperSlide>
      <SwiperSlide className="customCatSlide">
        <div
          className="flex flex-col items-center justify-center shadow-lg mb-2
         p-4 rounded-md bg-white h-44"
        >
          <Image src={'/svgs/mathematics.svg'} alt="maths" width={90} height={90} />

          <h1 className="text-xl font-semibold mt-4 text-subcolor ">Mathematics</h1>
        </div>
      </SwiperSlide>
      <SwiperSlide className="customCatSlide">
        <div
          className="flex flex-col items-center justify-center shadow-lg mb-2
         p-4 rounded-md bg-white h-44"
        >
          {' '}
          <Image src={'/svgs/psychology.svg'} alt="psychology" width={90} height={90} />
          <h1 className="text-xl font-semibold mt-4 text-[#FB3C22]">Psychology</h1>
        </div>
      </SwiperSlide>
      <SwiperSlide className="customCatSlide">
        <div
          className="flex flex-col items-center justify-center shadow-lg mb-2
         p-4 rounded-md bg-white h-44"
        >
          {' '}
          <Image src={'/svgs/coding.svg'} alt="coding" width={90} height={90} />
          <h1 className="text-xl font-semibold mt-4 text-black">Coding</h1>
        </div>
      </SwiperSlide> */}
    </Swiper>
  );
}
