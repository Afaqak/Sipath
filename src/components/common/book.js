import React from 'react';
import Image from 'next/image';
import { Stars } from './5star';
import { Button } from '../ui/button';
export const Book = () => {
  return (
    <div className="bg-white p-4 relative flex-col md:flex-row shadow-lg rounded-md flex gap-4 md:w-full">
      <span className="absolute top-2 z-[1000] left-0 bg-green-700 py-1 rounded-r-md text-white px-5 font-medium">
        19.99$
      </span>
      <div className="md:w-[80%] w-[100%]">
        <Image
          src={'/books/book-2.webp'}
          className="w-full object-cover h-full"
          width={500}
          alt="physics"
          height={500}
        />
      </div>
      <div className="grid gap-1 w-[90%]\ lg:w-full">
        {/*title and rating*/}
        <div className="flex justify-between items-center">
          <h1>Title goes here</h1>
          <div className="flex text-sm font-bold gap-2">
            4.7 <Image src={'svgs/star.svg'} width={20} height={20} alt="star" />
          </div>
        </div>
        {/*account and stars*/}
        <div className="flex justify-between">
          <div>
            <Image
              src={'/demo-1.jpg'}
              className="rounded-full object-cover w-[2rem] h-[2rem]"
              width={30}
              height={40}
              alt="demo-1"
            />
          </div>
          <Stars />
        </div>
        <div className="text-[0.8rem] md:text-sm">
          <p>
            Lorem ipsum dolor sit amet sia ana consectetur. Lectus gravida lorem velit quis amet
            quas lacus. Nunc non massa. Lorem ipsum dolor sit amet slec consectetur. Lectus gravida
            lorem velit quis amet lacus. Nunc non massa.
          </p>
        </div>
        <div>
          <Button className="font-semibold bg-white w-full text-subcolor justify-center flex items-center gap-1 px-8 rounded-md border-[3px] border-subcolor">
            <Image width={20} height={20} alt="bag" src={'/svgs/bag.svg'} />
            <span>Buy Book</span>
          </Button>
        </div>
      </div>
    </div>
  );
};
