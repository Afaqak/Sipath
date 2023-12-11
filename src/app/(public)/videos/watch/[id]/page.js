import React from 'react'
import WatchVideo from '.'
import { getServerSession } from 'next-auth'
import useAxios from '@/hooks/useAxios'
const WatchVideoPage = async({params,searchParams}) => {

  const axios=useAxios()
  const session = await getServerSession()
  const getVideo = async function () {
    try {
      const response = await axios.get(`/assets/video/${params?.id}`);
      return response?.data
   
    } catch (err) {
      console.log(err)
    }
  };

  const video= await getVideo()
  console.log(video)
  return (
    <WatchVideo video={video}/>
  )
}

export default WatchVideoPage