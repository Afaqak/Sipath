import axios from 'axios';
import { VideoGallery } from '@/components/video/videoGallery';

const Videos = async () => {
  // const getVideos = await axios.get('http://backend.sipath.com/assets/videos');
  // console.log(getVideos.data, 'getVideos');
  // if (!getVideos.data) {
  //   <div>no videos!</div>;
  // }

  // return <VideoGallery videos={getVideos.data} />;
  return <VideoGallery />;
};

export default Videos;
