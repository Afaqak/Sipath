'use client'
import { useEffect, useState } from 'react';
import { ContentContainer, ExpertsComponent } from '@/components';
import useAxiosPrivate from '@/hooks/useAxiosPrivate';
import React from 'react';

import { useSession } from 'next-auth/react';


const ExpertsPage = () => {
  const axios = useAxiosPrivate()
  const { data: user, status } = useSession()
  const [experts, setExperts] = useState([])
  const [topRated, setTopRated] = useState([])

  const fetchAllExperts = async (limit=6,setLoad) => {
    try {
      let response;
      if (user?.token) {
        response = await axios.get(`/users/experts?type=all&limit=${limit}`, {
          headers: {
            'Authorization': `Bearer ${user?.token}`
          }
        })
      } else {
        response = await axios.get(`/users/experts?type=all`)
      }
      setExperts(response?.data)
 
        setLoad()
      

    } catch (err) {
      console.log(err)
    }
  }
  const fetchTopRatedExperts = async (limit=6,setLoad) => {
    try {
      const response = await axios.get(`/users/experts?type=topRated&limit=${limit}`)
      setTopRated(response?.data)
      if(setLoad){
        setLoad()
      }
    } catch (err) {
      console.log(err)
    }
  }
  useEffect(() => {
    if (status === 'loading') {
      return
    }
    fetchAllExperts()
    fetchTopRatedExperts()
  }, [status])

  return (
    <div className=''>
      {
        experts.length > 0 &&
        <ExpertsComponent fetchExperts={(limit,setLoad)=>fetchAllExperts(limit,setLoad)} setData={setExperts} session={user} title="Most Followed" data={experts} />

      }
      {
        topRated.length > 0 &&
        <ExpertsComponent fetchExperts={(limit,setLoad)=>fetchTopRatedExperts(limit,setLoad)} setData={setTopRated} session={user} title="Top Rated" data={topRated} />
      }
    </div>
  );
};

export default ExpertsPage;
