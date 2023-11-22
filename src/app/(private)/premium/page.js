import React from 'react';
import { VideoGallery } from '@/components/video/videoGallery';
const Premium = async () => {
  const fetchVideos = async (customQuery) => {

    try {
      const queryParams = customQuery || 'type=all';

      const request = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/assets/videos?limit=${6}&${queryParams}`,{
        next:{
          revalidate:300
        }
      });
      console.log(request,"{response}")
      const response = await request.json()
      return response
    } catch (err) {
      console.log(err);
    }
  };

  const newVideos = await fetchVideos('type=premium&subType=new')
  const popularVideos = await fetchVideos('type=premium&subType=popular')
  return (<>
    <VideoGallery videos={newVideos} customQuery={'type=premium&subType=new'} title={'New Uploads'} />;
    <VideoGallery videos={popularVideos} customQuery={'type=premium&subType=popular'} title={'Popular Videos'} />;
  </>
  )
};

export default Premium;
