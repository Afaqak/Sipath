'use client';
import { ContentPlayer, LiveMessages, VideoInfo } from '@/components';
import Image from 'next/image';

const LivePremium = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-8">
      <div className="live-message col-span-5 relative lg:my-8 px-4 lg:px-0 lg:pl-8">
        <ContentPlayer noPremium={true} />
        <VideoInfo />
      </div>
      <div className="mt-8 relative overflow-y-scroll col-span-3 overflow-hidden live-message">
        <LiveMessages />
        <div className="bg-white  py-2 shadow-lg">
          <div className="flex gap-2 py-1 items-center justify-center">
            <input
              className="rounded-md py-1 focus:outline-none w-[70%] placeholder:text-sm shadow-[inset_1px_4px_10px_rgba(0,0,0,0.1)] px-2"
              placeholder="Type here..."
              type="text"
            />
            <button>
              <Image src={'/svgs/send.svg'} width={30} height={30} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LivePremium;
