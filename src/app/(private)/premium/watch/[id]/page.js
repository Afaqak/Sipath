import React from 'react'
import WatchVideo from '.'
import { getServerSession } from 'next-auth'
import useAxiosPrivate from '@/hooks/useAxiosPrivate'
const WatchVideoPage = async({params}) => {
  console.log(params)
  const axios=useAxiosPrivate()
  const session = await getServerSession()
  const getVideo = async function () {
    try {
      const response = await axios.get(`/assets/video/${params?.id}`, {
        headers: {
          Authorization: `Bearer ${session?.token}`,
        },
      });
      return response?.data

    } catch (err) {
      console.log(err)
    }
  };

  const video= await getVideo()

  return (
    <WatchVideo video={video}/>
  )
}

export default WatchVideoPage