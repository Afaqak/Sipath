// VideoGallery.js
'use client'
import React, { useEffect, useState } from 'react';
import { Video, LoadingSkeletons } from '@/components';
import axios from '../../utils/index';
import Image from 'next/image';

export const VideoGallery = ({ title, customQuery }) => {
  const [videos, setVideos] = useState([]);
  const [limit, setLimit] = useState(6);

  const fetchVideos = async () => {
  
    try {
      const queryParams = customQuery || 'type=all';

      const response = await axios.get(`/assets/videos?limit=${limit}&${queryParams}`);
      console.log(response.data)
      setVideos([...response.data]);
    } catch (err) {
      console.log(err);
    } 
  };

  const loadMore = () => {
    setLimit(limit + 6);
  };

  useEffect(() => {
    fetchVideos();
  }, [limit]);

  return (
    <div className="pt-8 pb-8 overflow-visible relative w-[90%] mx-auto">
      
      <Video videos={videos} title={title} load={true} />
      {
        videos?.length > 0 &&
        <div className="text-center">
          <div className="flex justify-center flex-col items-center mt-8">
            <button onClick={loadMore} className="bg-gray-100 px-4 py-2 rounded-md text-black font-semibold">
              Load More
            </button>
            <Image src="/svgs/expand_more.svg" alt="expand_more" width={15} height={15} />
          </div>
        </div>
      }
    </div>
  );
};
