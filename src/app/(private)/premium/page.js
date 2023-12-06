import React from 'react';
import { VideoGallery } from '@/components/video/videoGallery';
const Premium = async () => {
  const fetchVideos = async (customQuery) => {

    try {
      const queryParams = customQuery || 'type=all';

      const request = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/assets/videos?limit=${6}&${queryParams}`, {
        cache:'no-store'
      });
   
      const response = await request.json()
      return response
    } catch (err) {
      console.log(err);
    }
  };

  const newVideos = await fetchVideos('type=premium&subType=new')
  const popularVideos = await fetchVideos('type=premium&subType=popular')
  return (<div className='w-[90%] mx-auto mt-8'>
    <VideoGallery videos={newVideos} private={true} customQuery={'type=premium&subType=new'} title={'New Uploads'} />;
    <VideoGallery videos={popularVideos} private={true} customQuery={'type=premium&subType=popular'} title={'Popular Videos'} />;
  </div>
  )
};

export default Premium;
