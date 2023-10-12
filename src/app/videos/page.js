'use client';
import React, { useEffect, useState } from 'react';
import { Video, ContentContainer, LoadingSkeletons } from '@/components';
import { Skeleton } from '@/components/ui/skeleton';
import { withPrivateRoute } from '@/components/privateRoute';
import { useSession } from 'next-auth/react';
import useAxiosPrivate from '@/hooks/useAxiosPrivate';

const Videos = () => {
  const [loading, setLoading] = useState(false);
  const [videos, setVideos] = useState([]);
  const { data: user } = useSession();
  const axios = useAxiosPrivate();
  useEffect(() => {
    setLoading(true);
    const fetchVideoData = async () => {
      setTimeout(async () => {
        try {
          const response = await axios.get(`/assets/videos`);
          console.log(response.data);
          setVideos(response.data);
        } catch (error) {
          console.error('Error fetching video data:', error);
        } finally {
          setLoading(false);
        }
      }, 1000);
    };
    if (user?.token) {
      fetchVideoData();
    }
  }, []);

  return (
    <ContentContainer>
      <div className="pt-8">
        {loading && <LoadingSkeletons times={10} />}
        <Video videos={videos} title="New Uploads" load={true} />
      </div>
    </ContentContainer>
  );
};

export default withPrivateRoute(Videos);
