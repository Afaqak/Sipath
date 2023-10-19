'use client';
import React, { useEffect, useState } from 'react';
import { Video, LoadingSkeletons } from '@/components';

export const VideoGallery = ({ videos }) => {
  console.log(videos);
  const [loading, setLoading] = useState(false);
  const [videosData, setVideosData] = useState([]);

  useEffect(() => {
    const fetchVideos = async () => {
      setLoading(true);

      const response = await videos;

      setVideosData(response);
      setLoading(false);
    };
    fetchVideos();
  }, []);

  return (
    <div className="pt-8 pb-8 overflow-visible relative w-[90%] mx-auto">
      {loading && <LoadingSkeletons times={10} />}
      <Video videos={videosData} title="New Uploads" load={true} />
    </div>
  );
};
