'use client';
import React, { useEffect, useState } from 'react';
import ReactPlayer from 'react-player';
import useAxiosPrivate from '@/hooks/useAxiosPrivate';
import { useSearchParams } from 'next/navigation';

export const ContentPlayer = ({ noPremium }) => {
  const searchParams = useSearchParams();
  const axios = useAxiosPrivate();
  const id = searchParams.get('id');

  const [isClient, setIsClient] = useState(false);
  const [videoBlob, setVideoBlob] = useState(null);
  const token = JSON.parse(localStorage.getItem('token'));
  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    const fetchVideoData = async () => {
      try {
        const response = await axios.get(`/assets/video/stream/${id}`, {
          responseType: 'arraybuffer',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(response.data);
        const videoBlob = new Blob([response.data], { type: 'video/mp4' });
        console.log(videoBlob);
        setVideoBlob(videoBlob);
      } catch (error) {
        console.error('Error fetching video data:', error);
      }
    };

    fetchVideoData();
  }, []);

  return (
    <div>
      {isClient && (
        <div className={`relative lg:h-[60vh] md:h-[40vh] h-[30vh]`}>
          {videoBlob && (
            <ReactPlayer controls width="100%" height="100%" url={URL.createObjectURL(videoBlob)} />
          )}
        </div>
      )}
    </div>
  );
};
