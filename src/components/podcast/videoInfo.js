import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { Stars } from '../common/5star';
import { Icons, formatTimeAgo } from '..';
import { errorToast, successToast } from '@/utils/toasts';
import useAxiosPrivate from '@/hooks/useAxiosPrivate';
import { useParams, useSearchParams } from 'next/navigation';

const ProfileInfo = () => {
  return (
    <div className="text-gray-600 flex items-center gap-2">
      <Image
        src="/demo-4.jpg"
        className="tutor-img w-[2.4rem] object-cover"
        width={100}
        height={50}
        alt="demo-4"
      />
      <div className="flex flex-col">
        <span>Account Name</span>
        <span className="text-[0.75rem]">12k followers</span>
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

export const VideoInfo = ({ token }) => {
  const axios = useAxiosPrivate();
  const [rating, setRating] = useState(null);
  console.log(token, '${videoInfo');

  const searchParams = useSearchParams();
  const [video, setVideo] = useState({});
  const id = searchParams.get('id');

  console.log(video, id, '{vidoeInfor}');
  useEffect(() => {
    const fetchVideoInfo = async () => {
      try {
        const response = await axios.get(`/assets/video/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(response.data, '${video');
        setVideo(response.data);
      } catch (err) {}
    };
    fetchVideoInfo();
  }, [id]);
  const setAssetRating = async (newRating) => {
    try {
      const response = await axios.post(
        `/rate/${video?.id}?type=video`,
        {
          rating: newRating,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setVideo(response.data?.asset);
      console.log(response.data);
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
          <h1 className="font-semibold text-lg mb-1">{video?.title}</h1>
          <div className="flex gap-4 items-center justify-between">
            <ProfileInfo />
            <button className="py-1 border-black font-medium text-sm border-2 px-4 rounded-md">
              Follow
            </button>
          </div>
        </div>
        <div className="">
          <div className="flex items-center gap-3 justify-end">
            <Stars rating={rating} initialRating={video?.rating} setRating={handleRatingChange} />{' '}
            <Ratings rating={video?.rating} />
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
      <TagsAndDescription description={video?.description} createdAt={video?.createdAt} />
    </div>
  );
};
