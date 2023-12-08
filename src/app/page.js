'use client';
import React, { useEffect, useRef, useState } from 'react';
import { NewVideos, PremiumVideos, Experts, Categories } from '@/components';
import axios from '@/utils/index';
import { CategoriesSkeleton, ExpertSkeleton, LoadingSkeletons } from '@/utils/skeletons';

import { VideoGallery } from '@/components/video/videoGallery';
import { BuyNowModal } from '@/components/modals/paymentModal';
import { useCategories } from '@/hooks/useCategories';

const Home = () => {
  
  const [loading, setLoading] = useState(true);
  const [isOpen,setIsOpen]=useState(false)

  const [data, setData] = useState({
    videos: [],
    newVideos: [],
    videosSetOne: [],
    premiumVideos: [],
    videosSetTwo: [],
    experts: [],
    categories: [],
  });

  const premiumVideosRef = useRef(null);
  const videosSetTwoRef = useRef(null);

  const fetchVideos = async (query) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/assets/videos?${query}`);
      return response.json();
    } catch (error) {
      console.error('Error fetching videos:', error);
    }
  };

  const fetchExperts = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/users/experts?type=all`);
      return response.json();
    } catch (error) {
      console.error('Error fetching experts:', error);
    }
  };

  const fetchCategories = async () => {
    try {
      const categories=useCategories()
      return categories
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [
          videosResponse,
          newVideosResponse,
          videosSetOneResponse,
          premiumVideosResponse,
          videosSetTwoResponse,
          expertsResponse,
          categoriesResponse,
        ] = await Promise.allSettled([
          fetchVideos('type=all&limit=3'),
          fetchVideos('type=new'),
          fetchVideos('type=all&limit=3'),
          fetchVideos('type=premium'),
          fetchVideos('type=all&limit=3&set=1'),
          fetchExperts(),
          fetchCategories(),
        ]);

        setData({
          videos: videosResponse.status === 'fulfilled' ? videosResponse.value : [],
          newVideos: newVideosResponse.status === 'fulfilled' ? newVideosResponse.value : [],
          videosSetOne: videosSetOneResponse.status === 'fulfilled' ? videosSetOneResponse.value : [],
          premiumVideos: premiumVideosResponse.status === 'fulfilled' ? premiumVideosResponse.value : [],
          videosSetTwo: videosSetTwoResponse.status === 'fulfilled' ? videosSetTwoResponse.value : [],
          experts: expertsResponse.status === 'fulfilled' ? expertsResponse.value : [],
          categories: categoriesResponse.status === 'fulfilled' ? categoriesResponse.value : [],
        });
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className='w-[90%] mx-auto my-10 gap-4'>
        <LoadingSkeletons times={3} />
        <div className='my-4'>
          <CategoriesSkeleton time={3} />
        </div>
        <ExpertSkeleton times={4} />
      </div>
    );
  }

  return (
    <div className=" mt-8">

      <div className="w-[90%] mx-auto">
        {data?.videos?.length > 0 && <VideoGallery type='no-more' videos={data?.videos} />}
      </div>
      {data?.newVideos?.length > 0 && <NewVideos data={data?.newVideos} />}
      <div className="w-[90%] mx-auto">
        {data?.videosSetOne?.length > 0 && <VideoGallery type='no-more' videos={data?.videosSetOne} />}
      </div>
      <div ref={premiumVideosRef}>
        {data?.premiumVideos?.length > 0 && <PremiumVideos data={data?.premiumVideos} />}
      </div>
      <div ref={videosSetTwoRef} className="w-[90%] mx-auto">
        {data?.videosSetTwo?.length > 0 && <VideoGallery type='no-more' videos={data?.videosSetTwo} />}
      </div>
      <div>{data?.experts?.length > 0 && <Experts data={data?.experts} />}</div>
      {data?.categories?.length > 0 && <Categories data={data?.categories} />}
    </div>
  );
};

export default Home;
