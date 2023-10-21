'use client';
import { LiveMessages, VideoInfo } from '@/components';
import Image from 'next/image';
import ContentPlayer from '../../../components/podcast/reactPlayer';
const LivePremium = () => {
  return (
    <div className="">
      <div className="grid grid-cols-1 lg:grid-cols-8">
        {/*col1*/}
        <div className="live-message col-span-5 relative lg:my-8 px-4 lg:px-0 lg:pl-8 flex flex-col">
          <ContentPlayer />
          <VideoInfo />
        </div>
        {/*col2*/}
        <div className="mt-8 relative col-span-3 overflow-hidden live-message">
          <div className="py-2 shadow-lg live-message h-[500px] overflow-auto">
            <LiveMessages />
          </div>
          <div className="flex gap-2  bg-white py-2 items-center justify-center">
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
  );
};

export default LivePremium;
