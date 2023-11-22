'use client';
import React, { useEffect, useRef, useState } from 'react';
import { NewVideos, VideoFeed, PremiumVideos, Experts, Categories, Video } from '@/components';
import axios from '@/utils/index'
import { ExpertSkeleton } from '@/utils/skeletons';
import { useSession } from 'next-auth/react';
import { errorToast, successToast } from '@/utils/toasts';


const Home = () => {

  const [videos, setVideos] = useState([])
  const [newVideos, setNewVideos] = useState([])
  const [videos_set_one, setVideos_set_one] = useState([])
  const [videos_set_two, setVideos_set_two] = useState([])
  const [premiumVideos, setPremiumVideos] = useState([])
  const [experts, setExperts] = useState([])
  const [categories, setCategories] = useState([])



  const premiumVideosRef = useRef(null);
  const videosSetTwoRef = useRef(null);

  const fetchVideos = async (query, setData) => {

    try {
      const request = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/assets/videos?${query}`);
      const response = await request.json()
      setData(response);

    } catch (err) {
      console.log(err);
    }
  };


  const fetchExperts = async () => {

    try {
      const request = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/users/experts?type=all`);
      const response = await request.json()
      setExperts(response);

    } catch (err) {
      console.log(err);
    }

  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get(`/categories`)

      setCategories(response?.data)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetchVideos('type=all&limit=3', setVideos);
        await fetchVideos('type=new', setNewVideos);
        await fetchVideos('type=all&limit=3', setVideos_set_one);
        await fetchVideos('type=premium', setPremiumVideos);
        await fetchVideos('type=all&limit=3&set=1', setVideos_set_two);
        await fetchExperts();
        await fetchCategories();
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();

    return () => {
      // Cleanup if needed
    };
  }, []);

 

  return (
    <div className="">

      <div className="w-[90%] mx-auto" >
        {
          videos?.length > 0 && <Video videos={videos} />
        }
      </div>
      {newVideos?.length > 0 &&
        <NewVideos data={newVideos} />
      }
      <div className="w-[90%] mx-auto ">
        {
          videos_set_one?.length > 0 && <Video videos={videos_set_one} />
        }

      </div>
      <div ref={premiumVideosRef}>
        {premiumVideos?.length > 0 && <PremiumVideos data={premiumVideos} />}
      </div>
      <div ref={videosSetTwoRef} className="w-[90%] mx-auto">
        {
          videos_set_two?.length > 0 && <Video videos={videos_set_two} />
        }

      </div>
      <div >
        {experts?.length > 0 && <Experts data={experts} />}
      </div>
      {
        categories.length > 0 &&
        <Categories data={categories} />
      }
    </div>
  );
};

export default Home;

