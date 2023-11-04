import axios from 'axios';
import { VideoGallery } from '@/components/video/videoGallery';

const Videos = async () => {
  // const getVideos = await axios.get('http://localhost:4000/assets/videos');
  // console.log(getVideos.data, 'getVideos');
  // if (!getVideos.data) {
  //   <div>no videos!</div>;
  // }

  // return <VideoGallery videos={getVideos.data} />;
  return(
  <>
  <VideoGallery customQuery={'type=new'} title={'New Uploads'} />;
  <VideoGallery customQuery={'type=popular'} title={'Popular Videos'} />;
  </>
  )
};

export default Videos;
