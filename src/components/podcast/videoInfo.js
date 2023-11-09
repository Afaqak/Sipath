import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { Stars } from '../common/5star';
import { Icons, formatTimeAgo } from '..';
import { errorToast, successToast } from '@/utils/toasts';
import useAxiosPrivate from '@/hooks/useAxiosPrivate';
import { useParams, useSearchParams } from 'next/navigation';

const ProfileInfo = ({ author, followers }) => {
  return (
    <div className="text-gray-600 flex  gap-2">
      <Image
        src="/demo-4.jpg"
        className="tutor-img w-[2.4rem] object-cover"
        width={100}
        height={50}
        alt="demo-4"
      />
      <div className="flex flex-col">
        <span>{author}</span>
        <span className="text-[0.75rem]">{followers}</span>
      </div>
    </div>
  );
};

const Ratings = ({ rating }) => {
  return (
    <div className="flex gap-1 items-center flex-col text-sm">
      <div className="flex items-center font-bold">
        {rating?.slice(0, -1)} <Image src="/svgs/star.png" alt="star" width={24} height={24} />
      </div>
    </div>
  );
};

const ActionButton = ({ icon, text }) => {
  return (
    <button className="bg-gray-100 flex items-center gap-3 py-2 font-medium px-6 md:px-4 rounded-md">
      {text}
      {icon}
    </button>
  );
};

const TagsAndDescription = ({ description, createdAt }) => {
  return (
    <div className="text-sm mt-3">
      <div className="text-[#616161]">
        <span>24k views</span> . <span>{formatTimeAgo(createdAt)}</span> #loremipsum #lorem
      </div>
      <p>{description}</p>
    </div>
  );
};

export const VideoInfo = ({ token, type, selectedVideo, setSelectedVideo }) => {
  const axios = useAxiosPrivate();
  const [rating, setRating] = useState(null);

  const searchParams = useSearchParams()
  const id = searchParams.get('id');
  console.log(selectedVideo, "{from info}")
  useEffect(() => {
    setRating(0)
  }, [id])

  const setAssetRating = async (newRating) => {
    let assetId;
    try {
      if (type === 'solovideo') {
        assetId = id;
      } else {
        assetId = selectedVideo?.asset?.id;
      }

      const response = await axios.post(
        `/rate/${assetId}?type=video`,
        {
          rating: newRating,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setSelectedVideo(prev => {
        return { ...prev, asset: response?.data?.asset }
      });

      successToast('You have rated the Video!');
    } catch (error) {
      errorToast('Error Occured while setting the rating!');
    }
  };
  const handleRatingChange = (newRating) => {
    setRating(newRating);
    setAssetRating(newRating);
  };
  // console.log(video, '{video info}', token);
  return (
    <div className="bg-white mt-8 py-4 px-4 md:px-6 w-full rounded-md shadow-md">
      <div className="flex justify-between flex-col md:flex-row md:items-center">
        <div className="mb-2">
          <h1 className="font-semibold text-lg mb-1">{selectedVideo?.asset?.title}</h1>
          <div className="flex gap-4 items-center justify-between">
            <ProfileInfo author={selectedVideo?.display_name} followers={selectedVideo?.follower_count} />
            <button className="py-1 border-black font-medium text-sm border-2 px-4 rounded-md">
              Follow
            </button>
          </div>
        </div>
        <div className="">
          <div className="flex items-center gap-3 justify-end">
            <Stars rating={rating} initialRating={selectedVideo?.asset?.rating} setRating={handleRatingChange} />{' '}
            <Ratings rating={selectedVideo?.asset?.rating} />
          </div>
          <div className="flex gap-3 md:mt-2 mt-3 justify-end md:justify-start">
            <ActionButton icon={<Icons.share />} text="Share" />
            <ActionButton
              icon={
                <Image alt="platlist_add" src={'/svgs/playlist_add.svg'} width={25} height={25} />
              }
              text="Save"
            />
            <ActionButton icon={<Icons.elipsis className="h-6 w-6 fill-black stroke-black" />} />
          </div>
        </div>
      </div>
      <TagsAndDescription description={selectedVideo?.asset?.description} createdAt={selectedVideo?.asset?.createdAt} />
    </div>
  );
};
