import React from 'react';
import { CategoriesSlider } from '@/components';

export const Categories = () => {
  return (
    <div className="bg-[#FFD654] my-8">
      <div className="py-8 overflow-visible justify-between items-center relative w-[90%] mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-normal">Browse Categories</h2>
        </div>
        <div className="overflow-visible">
          <CategoriesSlider />
        </div>
      </div>
    </div>
  );
};
