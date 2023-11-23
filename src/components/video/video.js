import { Icons, LoadingSkeletons } from '..';
import { VideoItem } from './videoItem';
import Image from 'next/image';

export const Video = ({ videos, title }) => {
  return (
    <>
      <div className="pt-8 ">
        <h2 className="text-2xl  font-extrabold mb-4">{title}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4  gap-4">
          {videos?.length > 0 && videos?.map((video, index) => (
            <VideoItem key={index} video={video} />
          ))}
        </div>
        {!videos?.length > 0 && (
          <div className='flex items-center flex-col mt-12 gap-2 py-6 justify-end'>
            <Icons.empty className="w-20 h-20 text-subcolor2" />
            <p className="text-lg font-semibold">No Videos Available Right Now</p>
          </div>
        )}
    </div >
    </>
  );
};
