'use client';
import React, { useEffect, useState } from 'react';
import { Video, LoadingSkeletons } from '@/components';
import axios from '../../utils/index';
export const VideoGallery = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchVideos = async () => {
      setLoading(true);
      try {
        const response = await axios.get('/assets/videos');
        setVideos(response.data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    fetchVideos();
  }, []);
  return (
    <div className="pt-8 pb-8 overflow-visible relative w-[90%] mx-auto">
      {loading && <LoadingSkeletons times={10} />}
      <Video videos={videos} title="New Uploads" load={true} />
    </div>
  );
};
