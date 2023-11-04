import { LoadingSkeletons } from '..';
import { VideoItem } from './videoItem';
import Image from 'next/image';

export const Video = ({ videos, title }) => {
  return (
    <>

      <div className="py-8">
        <h2 className="text-2xl  font-extrabold mb-4">{title}</h2>
        {
          !videos.length? <LoadingSkeletons times={3} /> :
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4  gap-4">
              {videos.map((video, index) => (
                <VideoItem key={index} video={video} />
              ))}
            </div>
        }
      </div>

    </>
  );
};
