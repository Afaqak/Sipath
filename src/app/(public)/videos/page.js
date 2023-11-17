
import { VideoGallery } from '@/components/video/videoGallery';

const Videos = async () => {

  return(
  <>
  <VideoGallery customQuery={'type=new'} title={'New Uploads'} />;
  <VideoGallery customQuery={'type=popular'} title={'Popular Videos'} />;
  </>
  )
};

export default Videos;
