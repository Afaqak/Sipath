'use client'
import { useEffect, useState } from 'react';
import { ContentContainer, ExpertsComponent } from '@/components';
import useAxiosPrivate from '@/hooks/useAxiosPrivate';
import React from 'react';


const ExpertsPage = () => {
  const axios = useAxiosPrivate()
  const [experts,setExperts]=useState([])
  const fetchAllExperts = async () => {
    try {
      const response = await axios.get(`/users/experts?type=all`)
      console.log(response.data)
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
    <ContentContainer>
      <ExpertsComponent title="Most Followed" data={experts} />
      {/*<ExpertsComponent title="Top Rated" data={dataExpert} /> */}
    </ContentContainer>
  );
};

export default ExpertsPage;
