import React from 'react';
import Image from 'next/image';
export const Quiz = () => {
  return (
    <div className="mt-4 flex md:flex-row flex-col md:items-center justify-between bg-white rounded-lg shadow-lg">
      <div className="flex md:flex-row  relative md:max-w-[20%] items-center flex-col">
        <div className="h-44 md:h-28 rounded-lg">
          <Image
            src={'/new videos/demo-7.jpg'}
            alt="demo-4"
            className="h-full w-full object-cover rounded-md"
            width={100}
            height={100}
          />
        </div>
        <div className="w-[3.4rem] tutor-img bottom-2 md:right-0 md:top-1/2 md:-translate-y-1/2  right-2 md:translate-x-6  absolute h-[3.4rem] ">
          <Image
            className="h-full w-full object-cover rounded-full"
            src={'/demo-1.jpg'}
            width={60}
            height={60}
            alt="demo"
          />
        </div>
      </div>
      <div className="flex justify-between flex-1 flex-col px-3 mb-3 md:px-0 md:mb-0 md:flex-row">
        <div className="flex items-center gap-4 mt-4 md:mt-0 md:ml-8">
          <div>
            <h1 className="font-semibold md:text-lg text-base">VIDEO TITLE</h1>
            <p>Account name</p>
          </div>
        </div>
        <div className="flex md:flex-row flex-col md:px-4  gap-2">
          <div
            className="flex gap-1 flex-row justify-between items-center md:justify-end md:flex-col text-sm
      "
          >
            <h2 className="font-extrabold gap-1 flex items-center">
              4.7 <Image src="/svgs/star.png" className="" width={24} height={24} />
            </h2>
            <p className="text-gray-600 text-[0.8rem] font-medium flex gap-1">
              {' '}
              24K <span>Views</span>
            </p>
          </div>
          <div className="flex flex-col gap-2 text-sm lg:text-base sel justify-end">
            <button className="px-4 py-1 rounded-md border-2 border-black">View Quiz</button>
            <button className="px-4 py-1 rounded-md text-[#1C8827] border-[#1C8827] border-2">
              View Solutions
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
