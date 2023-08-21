import { VideoItem } from './videoItem';
import Image from 'next/image';

export const Video = ({ videos, title, load }) => {
  return (
    <>
      {videos.length > 0 && (
        <div className="py-8">
          <h2 className="text-2xl  font-extrabold mb-4">{title}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4  gap-4">
            {videos.map((video) => (
              <VideoItem key={video.id} video={video} />
            ))}
          </div>
          {/* view more */}
          {load && (
            <div className="flex justify-center flex-col items-center mt-8">
              <button className="bg-gray-100 px-4 py-2 rounded-md text-black font-semibold">
                Load More
              </button>
              <Image src="/svgs/expand_more.svg" width={15} height={15} />
            </div>
          )}
        </div>
      )}
    </>
  );
};
