'use client';
import { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import UserAvatar from '../common/userAvatar';
import { Icons, Stars } from '@/components';
import { useOutsideClick } from '@/hooks/useOutsideClick';
import { motion, AnimatePresence } from 'framer-motion';
import useAxiosPrivate from '@/hooks/useAxiosPrivate';
import { useRouter } from 'next/navigation';
import { errorToast, successToast } from '@/utils/toasts';

export const Profile = ({ type, user, isActon = true, session, setUser }) => {
  const axios = useAxiosPrivate();
  const [rating, setRating] = useState(false);

  const [loading, setLoading] = useState(false);
  const router = useRouter();
  console.log(user, 'user');

  const [showActions, setShowActions] = useState(false);
  const actionRef = useRef();
  const closeActions = () => {
    setShowActions(false);
  };

  const handleFollowUser = async () => {
    try {
      const isFollowing = user?.followers?.some(
        (follower) => follower.follower === session?.user?.id && follower.following === user?.id
      );
      console.log(isFollowing, '{handle follow user}', user);

      if (isFollowing) {
        setLoading(true);

        const response = await axios.delete(
          '/users/unfollow',

          {
            headers: {
              Authorization: `Bearer ${session?.token}`,
            },
            data: {
              user_id: user?.id,
            },
          }
        );
        window.location.reload();
        errorToast('Unfollowed the User!');
        console.log(response.data);
      } else {
        setLoading(true);
        const response = await axios.post(
          '/users/follow',
          {
            user_id: user?.id,
          },
          {
            headers: {
              Authorization: `Bearer ${session?.token}`,
            },
          }
        );
        window.location.reload();
        successToast('Followed the User!');
        console.log(response.data);
        router.refresh();
      }
    } catch (err) {
      errorToast('Error Occured!');
    } finally {
      setLoading(false);
    }
  };

  const setAssetRating = async (newRating) => {
    try {
      const response = await axios.post(
        `/rate/${user?.id}?type=user`,
        {
          rating: newRating,
        },
        {
          headers: {
            Authorization: `Bearer ${session?.token}`,
          },
        }
      );

      setUser(response.data.asset);
      successToast('User Rated!');
      console.log(response, '{rated user}');
    } catch (err) {
      errorToast("Error! Can't rate the User");
      console.error(err);
    }
  };

  const handleRatingChange = (newRating) => {
    setRating(newRating);
    setAssetRating(newRating);
  };

  useOutsideClick(actionRef, closeActions);
  const isFollowing = user?.followers?.some(
    (follower) => follower?.follower === session?.user?.id && follower.following === user?.id
  );
  return (
    <div className="mt-10 w-full justify-around relative shadow-md rounded-md p-4 grid grid-cols-4 gap-6">
      <div className="relative flex items-center justify-center col-span-1">
        <UserAvatar
          user={{ image: user?.profile_image, name: user?.display_name || '' }}
          className="w-36 h-36"
        />
        {type === 'userprofile' && (
          <button
            className={`font-bold  text-white rounded-full w-32 cursor-pointer capitalize py-1 flex justify-center items-center ${
              isFollowing ? 'bg-main' : 'bg-[#FBA422]'
            } `}
            disabled={loading}
            onClick={handleFollowUser}
            style={{
              position: 'absolute',
              bottom: '-5px',
              left: '50%',
              transform: 'translateX(-50%)',
            }}
          >
            {isFollowing ? (
              <span className="flex gap-2 items-center">
                <img className="h-6 w-6" src="/svgs/check_circle.svg" />
                Followed
              </span>
            ) : (
              'Follow'
            )}
          </button>
        )}
      </div>

      <div className="col-span-3 w-full">
        <h1 className="mb-2 uppercase font-medium">{user?.display_name}</h1>
        <div className="flex md:flex-row flex-col gap-12">
          <div className="flex gap-12">
            <div className="">
              <ul className="text-sm flex flex-col gap-2 whitespace-nowrap text-[#616161]">
                <li className="text-[0.75rem]">
                  <span className="font-semibold text-[0.85rem]">{user?.follower_count}</span>{' '}
                  Followers
                </li>
                <li className="text-[0.75rem]">
                  <span className="font-semibold text-[0.85rem]">521</span> Following
                </li>
                <li className="text-[0.75rem]">
                  <span className="font-semibold text-[0.85rem]">24$/hr</span> Hourly rate
                </li>
                {!type === 'myprofile' && (
                  <Stars
                    rating={rating}
                    setRating={handleRatingChange}
                    initialRating={user?.rating}
                  />
                )}
                <div className="flex font-bold gap-2">
                  {user?.rating} <Image src={'/svgs/star.svg'} alt="star" width={20} height={20} />
                </div>
              </ul>
            </div>
            <div className="text-[#616161] font-light">
              <h1>EXPERTISE</h1>
              <ul className="text-sm whitespace-nowrap list-disc list-inside font-semibold text-[0.7rem]">
                <li>Maths</li>
                <li>Physics</li>
                <li>Chemistry</li>
              </ul>
            </div>
          </div>
          <div className="text-[#616161] font-light col-span-2">
            <div className="">
              <h1>BIO</h1>
              <p className={`text-sm w-full`}>{user?.bio}</p>
            </div>
          </div>
        </div>
      </div>
      {isActon && (
        <div
          onClick={() => setShowActions(!showActions)}
          className="cursor-pointer absolute top-5 right-5"
        >
          <Icons.elipsis className="h-7 transform rotate-90 text-gray-500 w-7" />
          <AnimatePresence>
            {showActions && (
              <motion.div
                ref={actionRef}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.2 }}
                className="absolute top-6 right-2 bg-white shadow-md w-64 mx-auto rounded-md p-2 space-y-2"
              >
                <ActionButtons />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
};

const actionButtonsData = [
  {
    text: 'New Post',
    href: '/tutor/video-upload',
    imageSrc: '/svgs/blueB.svg',
    alt: 'post',
    bgColor: 'bg-blue-500',
  },
  {
    text: 'New Video',
    href: '/tutor/video-upload',
    imageSrc: '/svgs/videogreen.svg',
    alt: 'video',
    bgColor: 'bg-subcolor',
  },
  {
    text: 'Chat',
    href: '/tutor/video-upload',
    imageSrc: '/svgs/messageblack.svg',
    alt: 'message',
    bgColor: 'bg-gray-500',
  },
  {
    text: 'New Quiz',
    href: '/tutor/new-quiz',
    imageSrc: '/svgs/editblue.svg',
    alt: 'message',
    bgColor: 'bg-gray-500',
  },
  {
    text: 'Add Book',
    href: '/tutor/add-book',
    imageSrc: '/svgs/book.svg',
    alt: 'message',
    bgColor: 'bg-gray-500',
  },
  {
    text: 'New Podcast',
    href: '/tutor/new-podcast',
    imageSrc: '/svgs/podcasts.svg',
    alt: 'message',
    bgColor: 'bg-gray-500',
  },
];

const ActionButtons = () => {
  return (
    <div className="grid grid-cols-2 gap-1 flex-row text-sm">
      {actionButtonsData.map((button, index) => (
        <Link
          className={`border-2 border-${button.bgColor} w-full px-3 py-1 whitespace-nowrap justify-center items-center font-bold flex gap-2 text-[0.7rem] text-${button.bgColor} bg-transparent mb-1 rounded`}
          href={button.href}
          key={index}
        >
          <Image
            src={button.imageSrc}
            className="w-4 h-4"
            width={25}
            height={25}
            alt={button.alt}
          />
          <span className="hidden md:block">{button.text}</span>
        </Link>
      ))}
    </div>
  );
};
