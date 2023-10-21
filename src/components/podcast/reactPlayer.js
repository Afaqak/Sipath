'use client';
import React, { useEffect, useState } from 'react';
import ReactPlayer from 'react-player';
import useAxiosPrivate from '@/hooks/useAxiosPrivate';
import { useSearchParams } from 'next/navigation';
import { useSession } from 'next-auth/react';

const ContentPlayer = ({ noPremium, token }) => {
  const searchParams = useSearchParams();
  const axios = useAxiosPrivate();

  const videoId = searchParams.get('id');
  console.log(videoId, '{videoid}');
  const [isClient, setIsClient] = useState(false);
  const [videoBlob, setVideoBlob] = useState(null);
  const { data: user } = useSession();
  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    console.log('effect run ');
    const fetchVideoData = async () => {
      try {
        const response = await axios.get(`/assets/video/stream/${videoId}`, {
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
  }, [videoId]);

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

export default React.memo(ContentPlayer);
