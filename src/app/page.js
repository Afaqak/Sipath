'use client';
import React, { useEffect, useRef, useState } from 'react';
import { NewVideos, VideoFeed, PremiumVideos, Experts, Categories, Video } from '@/components';
import axios from '../utils/index'
import { ExpertSkeleton } from '@/utils/skeletons';
import { useSession } from 'next-auth/react';


const Home = () => {

  const [videos, setVideos] = useState([])
  const [newVideos, setNewVideos] = useState([])
  const [videos_set_one, setVideos_set_one] = useState([])
  const [videos_set_two, setVideos_set_two] = useState([])
  const [premiumVideos, setPremiumVideos] = useState([])
  const [experts, setExperts] = useState([])
  const [categories, setCategories] = useState([])
  const {data:user}=useSession()

  const premiumVideosRef = useRef(null);
  const videosSetTwoRef = useRef(null);

  const fetchVideos = async (query, setData) => {
   
    try {
      const response = await axios.get(`/assets/videos?${query}`);
      setData([...response.data]);

    } catch (err) {
      console.log(err);
    }
  };


  const fetchExperts = async () => {

    try {
      const response = await axios.get(`/users/experts?type=all`);
      setExperts(response.data);

    } catch (err) {
      console.log(err);
    }

  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get('/categories')
      setCategories(response?.data)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {

    fetchVideos('type=all&limit=3', setVideos);
    fetchVideos('type=new', setNewVideos);
    fetchVideos('type=all&limit=3', setVideos_set_one);
    fetchVideos('type=premium', setPremiumVideos);
    fetchVideos('type=all&limit=3&set=1', setVideos_set_two);
    fetchExperts()
    fetchCategories()

    return () => {

    };
  }, []);


  return (
    <div className="">
      <div className="w-[90%] mx-auto" >
        <Video videos={videos} />
      </div>
      {newVideos?.length > 0 &&
        <NewVideos data={newVideos} />
      }
      <div className="w-[90%] mx-auto ">
        <Video videos={videos_set_one} />
      </div>
      <div ref={premiumVideosRef}>
        {premiumVideos?.length > 0 && <PremiumVideos data={premiumVideos} />}
      </div>
      <div ref={videosSetTwoRef} className="w-[90%] mx-auto ">
        <Video videos={videos_set_two} />
      </div>
      <div >
        {experts.length>0 && <Experts data={experts} />}
      </div>
      {
        categories.length > 0 &&
        <Categories data={categories} />
      }
    </div>
  );
};

export default Home;

