
import { VideoGallery } from '@/components/video/videoGallery';

const Videos = async () => {

  const fetchVideos = async (customQuery) => {
  
    try {
      const queryParams = customQuery || 'type=all';

      const request = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/assets/videos?limit=${6}&${queryParams}`,{
        cache:'no-cache'
      });
      const response=await request.json()
      return response
    } catch (err) {
      console.log(err);
    } 
  };

  const newVideos=await fetchVideos('type=new')
  const popularVideos=await fetchVideos('type=popular')

  return(
  <div className='w-[90%] mx-auto'>
  <VideoGallery videos={newVideos} customQuery={'type=new'} title={'New Uploads'} />;
  <VideoGallery videos={popularVideos} customQuery={'type=popular'} title={'Popular Videos'} />;
  </div>
  )
};

export default Videos;
