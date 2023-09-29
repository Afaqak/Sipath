'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { VideoItem, Video, ContentContainer } from '@/components';
import axios from '../../utils/index';
import { Skeleton } from '@/components/ui/skeleton';

const Videos = () => {
  const [loading, setLoading] = useState(false);
  const [videos, setVideos] = useState([]);
  const token = JSON.parse(localStorage.getItem('token'));
  useEffect(() => {
    setLoading(true);
    const fetchVideoData = async () => {
      setTimeout(async () => {
        try {
          const response = await axios.get(`/assets/videos`, {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          });
          console.log(response.data);
          setVideos(response.data);
        } catch (error) {
          console.error('Error fetching video data:', error);
        } finally {
          setLoading(false);
        }
      }, 2000);
    };

    fetchVideoData();
  }, []);

  const LoadingSkeletons = () => (
    <div className="py-8 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
      {[...Array(10)].map((_, idx) => (
        <div key={idx} className="bg-white rounded-md p-4 shadow-md">
          <Skeleton className="h-48 mb-2 " />
          <div className="flex items-center space-x-4">
            <Skeleton className="h-12 w-12 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-[250px]" />
              <Skeleton className="h-4 w-[200px]" /> 
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <ContentContainer>
      {loading && <LoadingSkeletons />}
      <Video videos={videos} title="New Uploads" load={true} />
    </ContentContainer>
  );
};

export default Videos;
