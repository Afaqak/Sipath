import React from 'react';
import Image from 'next/image';
import { Carousel,  VideoItemSlider } from '@/components';

export const PremiumVideos = ({data}) => {
  return (
    <div className="bg-[#FFD654] my-8">
      <div className="py-8 overflow-visible justify-between items-center relative w-[90%] mx-auto">
        <div className="flex gap-2 items-center mb-4">
          <Image
            src={'/svgs/premiumstar.svg'}
            alt="premium star"
            className="mt-1"
            width={25}
            height={25}
          />
          <h2 className="text-3xl">Premium </h2>
        </div>
        <div className="md:-ml-1">
          <Carousel items={data} contentComponent={VideoItemSlider} />
        </div>
      </div>
    </div>
  );
};
