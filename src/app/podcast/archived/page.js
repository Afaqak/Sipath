'use client';
import { CreateComment, LiveMessages, VideoInfo } from '@/components';

import Image from 'next/image';

const Archived = () => {
  return (
    <div className="container ">
      <div className="grid grid-cols-1 lg:grid-cols-3">
        <div className="  col-span-2 relative  md:my-8 px-4 lg:px-0 lg:pl-8">
          {/* <ContentPlayer  /> */}
          <VideoInfo />
          <Comments />
        </div>
        <div className="mt-8 relative ">
          <LiveMessages />
          <div className="bg-white  py-2 shadow-sm">
            <div className="flex gap-2 py-1 items-center justify-center">
              <input
                className="rounded-md py-1 focus:outline-none w-[70%] placeholder:text-sm shadow-[inset_1px_4px_10px_rgba(0,0,0,0.1)] px-2"
                placeholder="Type here..."
                type="text"
              />
              <button>
                <Image src={'/svgs/send.svg'} alt="send" width={30} height={30} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Archived;

const Comments = () => {
  return (
    <div className=" mt-8">
      <div className="justify-between font-bold text-lg mb-2 flex">
        <h2>132 comments</h2>
        <h2>Sort by</h2>
      </div>
      <div className="bg-white p-4 rounded-md shadow-md">
        <CreateComment />
      </div>
    </div>
  );
};
