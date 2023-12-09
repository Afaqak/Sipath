import React from 'react'
import WatchVideo from '.'
import { getServerSession } from 'next-auth'
import useAxiosPrivate from '@/hooks/useAxiosPrivate'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'

const WatchVideoPage = async ({ params, searchParams }) => {
  console.log(params, searchParams)
  const axios = useAxiosPrivate()
  const session = await getServerSession(authOptions)
  console.log("dddd", session)


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
      console.log(err)
    }
  };

  const video = await getVideo()
  const purchaseSuccess = await setPurchase()

  console.log(purchaseSuccess, "{successfull chase}")

  return (
    <WatchVideo video={video} purchaseSuccess={purchaseSuccess?.message === 'purchase successful' ? true : false} />
  )
}

export default WatchVideoPage