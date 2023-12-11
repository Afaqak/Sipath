import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { Stars } from '../common/5star';
import { Icons } from '..';
import { errorToast, successToast, warningToast } from '@/utils/toasts';
import useAxios from '@/hooks/useAxios';
import { useParams, useSearchParams, useRouter } from 'next/navigation';
import UserAvatar from '../common/userAvatar';
import { useFormattedTimeAgo } from '@/hooks/useFormattedTimeAgo';
import { useSession } from 'next-auth/react';



const ProfileInfo = ({ author, followers, profile_image }) => {
  return (
    <div className=" flex  gap-2">
      <UserAvatar className='w-12 h-12' user={{ image: profile_image, name: author ? author?.slice(0, 2) : "" }} />
      <div className="flex flex-col">
        <span className=" font-medium">{author}</span>
        <span className="text-[0.84rem]">{followers === 1 ? `${followers} follower` : `${followers} followers`} </span>
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

const ActionButton = ({ icon, text, onClick }) => {
  return (
    <button onClick={onClick} className="bg-gray-100 flex items-center gap-3 py-2 font-medium px-6 md:px-4 rounded-md">
      {text}
      {icon}
    </button>
  );
};

const TagsAndDescription = ({ description, createdAt, views }) => {
  const formattedTimeAgo = useFormattedTimeAgo(createdAt)
  return (
    <div className="text-[0.86rem] mt-3 bg-stone-100 hover:bg-stone-200/60 rounded-md p-4">
      <div className="font-semibold">
        <span className='font-semibold'>{views} Views</span>   <span>&bull;</span> <span>{formattedTimeAgo}</span>
      </div>
      <p className='line-clamp-3'>{description}</p>
    </div>
  );
};

export const VideoInfo = ({ type, selectedVideo, setSelectedVideo, followedUser, setFollowedUser }) => {
  const { data: session } = useSession()
  const axios = useAxios();
  const [rating, setRating] = useState(null);
  const router = useRouter()
  const params = useParams()
  const id = params?.id

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
            Authorization: `Bearer ${session?.token}`,
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

    if (!session?.token) {
      return warningToast("Login to Rate User", () => router.push('/sign-in'))
    }
    setRating(newRating);
    setAssetRating(newRating);
  };

  const handleFollowUser = async () => {
    try {
      if (!session?.token) {
        return warningToast("Login to follow User", () => router.push('/sign-in'))
      }
      if (followedUser) {
        await axios.delete('/users/unfollow', {
          headers: {
            Authorization: `Bearer ${session?.token}`,
          },
          data: {
            user_id: selectedVideo?.author_id,
          },
        })
        setFollowedUser(false)
        setSelectedVideo(prevVideo => ({
          ...prevVideo,
          follower_count: prevVideo.follower_count - 1,
        }));
      } else {
        await axios.post(
          '/users/follow',
          {
            user_id: selectedVideo?.author_id,
          },
          {
            headers: {
              Authorization: `Bearer ${session?.token}`,
            },
          }
        );
        setSelectedVideo(prevVideo => ({
          ...prevVideo,
          follower_count: prevVideo.follower_count + 1,
        }));
        setFollowedUser(true)
      }


    } catch (err) {
      console.log(err)
      errorToast('Error Occurred!');
    }
  };


  const saveVideo = async () => {
    try {
      const response = await axios.post(`/users/saved-videos`, {
        video_id: selectedVideo?.asset?.id
      }, {
        headers: {
          Authorization: `Bearer ${session?.token}`
        }
      })

      console.log(response)

      successToast('Video Saved!')

    } catch (err) {
      console.log(err)
    }
  }



  return (
    <div className="bg-white mt-8 py-4 px-4 md:px-6 w-full rounded-md shadow-md">


      <div className="flex justify-between flex-col md:flex-row md:items-center">
        <div className="mb-2">
          <h1 className="font-bold text-[1.32rem] capitalize mb-2">{selectedVideo?.asset?.title}</h1>
          <div className="flex gap-4 items-center justify-between">
            <ProfileInfo profile_image={selectedVideo?.profile_image} author={selectedVideo?.display_name} followers={selectedVideo?.follower_count} />
            <button onClick={handleFollowUser} className={` border-black font-medium  border-2 px-4 py-1 rounded-full ${followedUser ? "bg-black text-white" : ""}`}>
              {
                followedUser ? "Followed" : "Follow"
              }
            </button>
          </div>
        </div>
        <div className="">
          <div className="flex items-center gap-3 justify-end">
            <Stars rating={rating} initialRating={selectedVideo?.asset?.rating} setRating={handleRatingChange} />{' '}
            <Ratings rating={selectedVideo?.asset?.rating} />
          </div>
          <div className="flex gap-3 md:mt-2 mt-3 justify-end md:justify-start">
            <ActionButton onClick={() => {
              successToast("Link Copied");
              navigator.clipboard.writeText(window.location.href);
            }} icon={<Icons.share />} text="Share" />
            <ActionButton
              onClick={saveVideo}
              icon={
                <Image alt="platlist_add" src={'/svgs/playlist_add.svg'} width={25} height={25} />
              }
              text="Save"
            />
            <ActionButton icon={<Icons.elipsis className="h-6 w-6 fill-black stroke-black" />} />
          </div>
        </div>
      </div>
      <TagsAndDescription views={selectedVideo?.asset?.views} description={selectedVideo?.asset?.description} createdAt={selectedVideo?.asset?.createdAt} />

    </div>
  );
};