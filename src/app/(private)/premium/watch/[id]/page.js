import React from 'react'
import WatchVideo from '.'
import { getServerSession } from 'next-auth'
import useAxios from '@/hooks/useAxios'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'

const WatchVideoPage = async ({ params, searchParams }) => {

  const axios = useAxios()
  const session = await getServerSession(authOptions)


  const setPurchase = async () => {
    if (!searchParams.session_id) return
    try {
      const response = await axios.post(`/purchases?session_id=${searchParams.session_id}`, {
        asset_id: params.id,
        asset_type: "video"
      }, {
        headers: {
          Authorization: `Bearer ${session?.token}`
        }
      });
      console.log(response.data, "{reszponse purchase}")
      return response?.data;

      // router.replace(baseUrlWithoutQueryParams)
      // setIsSuccessModalOpen(true);
      // setTimeout(() => {
      //   setIsSuccessModalOpen(false);
      // }, 2500);

    } catch (err) {
      console.log('Error in setPurchase:', err);
    }
  };



  const getVideo = async function () {
    try {
      const response = await axios.get(`/assets/video/${params?.id}`, {
        headers: {
          Authorization: `Bearer ${session?.token}`,
        },
      });
  
      return response?.data

    } catch (err) {
      const toSend = err.response.data?.asset
      let clone = Object.assign({}, toSend)
      delete clone.user
      const toSendUser={
        author_id:clone.author_id,
      ...toSend?.user
      }

      return {
        asset: clone,
        ...toSendUser
      }
     
    }
  };

  const video = await getVideo()
  const purchaseSuccess = await setPurchase()


  return (
    <WatchVideo video={video} purchaseSuccess={purchaseSuccess?.message === 'purchase successful' ? true : false} />
  )
}

export default WatchVideoPage