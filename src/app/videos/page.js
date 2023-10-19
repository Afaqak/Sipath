import axios from '../../utils/index';
import { VideoGallery } from '@/components/video/videoGallery';

const Videos = async () => {
  const getVideos = await axios.get('/assets/videos');
  console.log(getVideos.data, 'getVideos');

  return <VideoGallery videos={getVideos.data} />;
};

export default Videos;
