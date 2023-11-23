'use client';
import { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import UserAvatar from '../common/userAvatar';
import { Icons, Stars } from '@/components';
import useAxiosPrivate from '@/hooks/useAxiosPrivate';
import axios from '../../utils/index'
import { errorToast} from '@/utils/toasts';
import { ActionButtons,ProfilePictureUpdate } from '@/components/profile';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export const Profile = ({ type, user, tutor, isActon = true, session }) => {
  const [isOpen, setIsOpen] = useState(false)
  const privateAxios = useAxiosPrivate();
  const [rating, setRating] = useState(null);
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(false);

  const handleFollowUser = async () => {

    try {
      const isFollowing = user?.followers?.some(
        (follower) => follower.follower === session?.user?.id && follower.following === user?.id
      );

      if (isFollowing) {
        setLoading(true);

        await privateAxios.delete(
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

      } else {
        setLoading(true);
        await privateAxios.post(
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
      }
    } catch (err) {
      errorToast('Error Occured!');
    } finally {
      setLoading(false);
    }
  };

  const setAssetRating = async (newRating) => {

    try {
      await privateAxios.post(
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

      window.location.reload()


    } catch (err) {
      errorToast("Error! Can't rate the User");
      console.error(err);
    }
  };

  const handleRatingChange = (newRating) => {

    setRating(newRating);
    setAssetRating(newRating);
  };

  const isFollowing = user?.followers?.some(
    (follower) => follower?.follower === session?.user?.id && follower.following === user?.id
  );

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('/categories')
        setCategories(response?.data)

      } catch (err) {
        console.log(err)
      }
    }
    fetchCategories()

  }, [])

  return (
    <div className="mt-10 w-full  relative justify-around shadow-md rounded-md p-4 grid grid-cols-2 lg:grid-cols-4 gap-6">
      <div className="relative flex items-center justify-center col-span-1">
        <UserAvatar
          user={{ image: user?.profile_image, name: user?.display_name || '' }}
          className="w-36 h-36"
        />
        {type === 'userprofile' && (
          <button
            className={`font-bold  bottom-0  text-white rounded-full w-32 cursor-pointer capitalize py-1 flex justify-center items-center ${isFollowing ? 'bg-main' : 'bg-[#FBA422]'
              } `}
            disabled={loading}
            onClick={handleFollowUser}
            style={{
              position: 'absolute',
        
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
        {type === 'myprofile' &&
          <div onClick={() => setIsOpen(true)} className='bg-white h-6 cursor-pointer w-6 rounded-full absolute top-3 right-14 flex items-center justify-center'>
            <Icons.edit className=" stroke-subcolor h-4 w-4" />
          </div>
        }
      </div>

      <div className="col-span-3 w-full">
        <h1 className="mb-2 uppercase font-medium">{user?.display_name}</h1>
        <div className="flex md:flex-row flex-col gap-12">
          <div className="flex gap-12">
            <div className="">
              <ul className="text-sm flex flex-col gap-2 whitespace-nowrap text-[#616161]">
                {type === 'userprofile' &&
                  <li className="text-[0.75rem]">
                    <Stars initialRating={user?.rating} setRating={handleRatingChange} rating={rating} />
                  </li>
                }
                <li className="text-[0.75rem]">
                  <span className="font-semibold text-[0.85rem]">{user?.follower_count}</span>{' '}
                  Followers
                </li>
                <li className="text-[0.75rem]">
                  <span className="font-semibold text-[0.85rem]">521</span> Following
                </li>
                {user?.isTutor &&
                  <li className="text-[0.75rem]">
                    <span className="font-semibold text-[0.85rem]">{(tutor?.hourly_rate || session?.tutor?.hourly_rate)}$/hr</span> Hourly rate
                  </li>
                }
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
            {
              user?.isTutor &&
              <div>
                <label className="text-sm font-thin">Expertise</label>
                <ul className=" list-disc">
                  {
                    (tutor || session?.tutor) && (tutor?.expertise || session?.tutor?.expertise).map((exp) => (
                      <div key={exp}>
                        {categories[exp - 1]?.category}
                      </div>
                    ))
                  }
                </ul>
              </div>
            }
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
        <div className='absolute top-5 right-8'>
          <DropdownMenu className="cursor-pointer">
            <DropdownMenuTrigger>
              <Icons.elipsis className="h-7 transform rotate-90  text-gray-500 w-7" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <ActionButtons user={user}/>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )}
      <ProfilePictureUpdate isOpen={isOpen} session={session} setIsOpen={setIsOpen} />
    </div>
  );
};



