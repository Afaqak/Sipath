import axios from '../../utils/index';
import { VideoGallery } from '@/components/video/videoGallery';

const Videos = async () => {
  const getVideos = await axios.get('http://localhost:4000/assets/videos');
  console.log(getVideos.data, 'getVideos');
  if (!getVideos.data) {
    <div>no videos!</div>;
  }

  return <VideoGallery videos={getVideos.data} />;
};

export default Videos;
