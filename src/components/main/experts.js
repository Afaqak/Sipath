import React from 'react';
import Image from 'next/image';
import { ExpertItem, Carousel } from '@/components';



export const Experts = ({data}) => {
  return (
    <div className="bg-[#FFD654] my-8">
      <div className="py-8 overflow-visible justify-between items-center relative w-[90%] mx-auto">
        <div className="flex gap-2 items-center mb-4">
          <h2 className="text-3xl mb-2">Suggested Experts</h2>
        </div>
        <div className="">
          <Carousel items={data} contentComponent={ExpertItem} />
        </div>
      </div>
    </div>
  );
};
