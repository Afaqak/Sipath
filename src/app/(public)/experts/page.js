'use client'
import { useEffect, useState } from 'react';
import { ContentContainer, ExpertsComponent } from '@/components';
import useAxiosPrivate from '@/hooks/useAxiosPrivate';
import React from 'react';
import { ExpertSkeleton } from '@/utils/skeletons';
import { Skeleton } from '@/components/ui/skeleton';


const ExpertsPage = () => {
  const axios = useAxiosPrivate()
  const [experts,setExperts]=useState([])
  const fetchAllExperts = async () => {
    try {
      const response = await axios.get(`/users/experts?type=all`)

      setExperts(response?.data)
      
    } catch (err) {
      console.log(err)
    }
  }
  // const fetchTopRatedExperts = async () => {
  //   try {
  //     const response = await axios.get(`/users/experts?type=topRated`)
  //     console.log(response.data)
  //   } catch (err) {
  //     console.log(err)
  //   }
  // }
  useEffect(() => {
    fetchAllExperts()
  }, [])
  // useEffect(() => {
  //   fetchTopRatedExperts()
  // }, [])
  return (
    <div className=''>
      {
        experts.length>0 &&
        <ExpertsComponent title="Most Followed" data={experts} />

      }
    </div>
  );
};

export default ExpertsPage;
