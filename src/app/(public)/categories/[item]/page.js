'use client';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { ExpertsComponent } from '@/components';
import { useRouter, useSearchParams } from 'next/navigation';
import useAxiosPrivate from '@/hooks/useAxiosPrivate';
import { VideoGallery } from '@/components/video/videoGallery';

const colors = {
  physics: '#371FCA',
  mathematics: '#1C8827',
  english: '#1850BC',
  literature: '#F3992F',
  coding: '#000000',
  chemistry: '#B8730D',
  biology: '#03A185',
  history: '#64420E',
  psychology: '#FB3C22',
  art: '#9747FF',
};



const Page = ({ params }) => {
  const categoryParam = useSearchParams()
  const [videos, setVideos] = useState([])
  const [premiumVideos, setPremiumVideos] = useState([])
  const [experts, setExperts] = useState([])
  const category = categoryParam?.get('id')
  const router = useRouter();
  const axios = useAxiosPrivate()
  const fetchVideosOfCategory = async () => {
    try {
      const response = await axios.get(`/categories/${category}/content?type=videos`)

      setVideos(response?.data)
    } catch (err) {
      console.log(err)
    }
  }
  const fetchPremiumVideosOfCategory = async () => {
    try {
      const response = await axios.get(`/categories/${category}/content?type=premium`)
      setPremiumVideos(response?.data)

    } catch (err) {
      console.log(err)
    }
  }

  const fetchCategoryOfExperts = async () => {
    try {
      const response = await axios.get(`/categories/${category}/content?type=tutors`)
      setExperts(response?.data)

    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    fetchVideosOfCategory()
    fetchCategoryOfExperts()
    fetchPremiumVideosOfCategory()
  }, [])

  return (
    <div className='my-8 overflow-visible relative w-[90%] mx-auto'>
      <div className=" mb-4">
        <div className="flex text-lg font-semibold gap-2">
          <span className="cursor-pointer" onClick={() => router.back()}>
            Categories
          </span>{' '}
          {'>'}
          <Image src={`/svgs/${params?.item}.svg`} alt={'svg'} width={20} height={20} />{' '}
          <span className={`text-[${colors[params.item]}]`}>
            {params?.item[0].toUpperCase() + params?.item.slice(1)}
          </span>
        </div>
      </div>
      <VideoGallery title={'Videos'} videos={videos} />
      <VideoGallery title={'Premium'} videos={premiumVideos} />
      <div className="mx-auto">
        <ExpertsComponent title={'Experts'} data={experts} />
      </div>
    </div >
  );
};

export default Page;
