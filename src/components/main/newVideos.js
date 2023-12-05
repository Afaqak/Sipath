'use client'
import React from 'react';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import {  Carousel ,VideoItemSlider} from '@/components';
export const NewVideos = ({data}) => {
 
  return (
    <div className="bg-[#FFD654] my-8">
      <div className="py-8 overflow-visible justify-between items-center relative w-[90%] mx-auto">
        <div className="flex gap-2 items-center mb-4">
          <Image src={'/svgs/circle.svg'} alt="circle" className="mt-1" width={25} height={25} />
          <h2 className="text-3xl">New Videos</h2>
        </div>
        <div className="overflow-visible md:-ml-1">
          <Carousel items={data} contentComponent={VideoItemSlider} />
        </div>
      </div>
    </div>
  );
};
