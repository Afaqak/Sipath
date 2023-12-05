// VideoGallery.js
'use client'
import React, { useState } from 'react';
import { Icons, VideoItem } from '@/components';
import Image from 'next/image';

export const VideoGallery = ({ title, videos, customQuery ,type="gallery"}) => {

  const [loadedVideos, setLoadedVideos] = useState(videos)
  const [limit, setLimit] = useState(6);
  const [load, setLoad] = useState()

  const fetchVideos = async (limitSend, setLoad) => {

    try {
      const queryParams = customQuery || 'type=all';
      
      const request = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/assets/videos?limit=${limitSend}&${queryParams}`);
      const response = await request.json()
      console.log(response, "{rd}")
      setLoadedVideos([...response]);
      if (setLoad) {
        setLoad()
      }
    } catch (err) {
      console.log(err);
    }
  };

  const loadMore = () => {
    setLoad(true)
    let limitSend = limit + 6
    fetchVideos(limitSend, () => setLoad(false))
    setLimit(limitSend);
  };



  return (
    <div className="pb-2 overflow-visible relative">

      <div className="">
        <h2 className="text-2xl  font-extrabold mb-4">{title}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4  gap-4">
          {loadedVideos?.length > 0 && loadedVideos?.map((video, index) => (
            <VideoItem key={index} video={video} />
          ))}
        </div>
        {!loadedVideos?.length > 0 && (
          <div className='flex items-center flex-col mt-12 gap-2 py-6 justify-end'>
            <Icons.empty className="w-20 h-20 text-subcolor2" />
            <p className="text-lg font-semibold">No Videos Available Right Now</p>
          </div>
        )}
      </div >
      {
        type==='gallery' && loadedVideos?.length > 0 &&
        <div className="text-center flex items-center justify-center mt-8">
          {load ? <span className='animate-spin'><Icons.Loader2 stroke='black' height='40' width='40' /></span> :
            <div className="flex justify-center flex-col items-center">
              <button onClick={loadMore} className="bg-gray-100 px-4 py-2 rounded-md text-black font-semibold">
                Load More
              </button>
              <Image src="/svgs/expand_more.svg" alt="expand_more" width={15} height={15} />

            </div>
          }
        </div>
      }
    </div>
  );
};
