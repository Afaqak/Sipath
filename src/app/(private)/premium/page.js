import React from 'react';
import { ContentContainer, Video } from '@/components';
import { VideoGallery } from '@/components/video/videoGallery';
const Premium = () => (
  <>
    <VideoGallery customQuery={'type=premium&subType=new'} title={'New Uploads'} />;
    <VideoGallery customQuery={'type=premium&subType=popular'} title={'Popular Videos'} />;
  </>
);

export default Premium;
