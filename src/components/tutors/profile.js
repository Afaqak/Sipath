'use client';
import { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import UserAvatar from '../common/userAvatar';
import { FileInput, Icons, Stars } from '@/components';
import { useOutsideClick } from '@/hooks/useOutsideClick';
import { motion, AnimatePresence } from 'framer-motion';
import useAxiosPrivate from '@/hooks/useAxiosPrivate';
import axios from '../../utils/index'
import { errorToast, successToast } from '@/utils/toasts';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogDescription,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useSession } from 'next-auth/react';
import { useSelector } from 'react-redux';

import { selectCategories } from '@/features/categories/categorySlice';
export const Profile = ({ type, user, tutor, isActon = true, session }) => {
  const [isOpen, setIsOpen] = useState(false)
  const privateAxios = useAxiosPrivate();
  const [rating, setRating] = useState(null);
  // const [categories, setCategories] = useState([])
  const categories=useSelector(selectCategories)
  const [loading, setLoading] = useState(false);
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

  useOutsideClick(actionRef, closeActions);
  const isFollowing = user?.followers?.some(
    (follower) => follower?.follower === session?.user?.id && follower.following === user?.id
  );

  // useEffect(() => {
  //   const fetchCategories = async () => {
  //     try {
  //       const response = await axios.get('/categories')
  //       setCategories(response?.data)

  //     } catch (err) {
  //       console.log(err)
  //     }
  //   }
  //   fetchCategories()

  // }, [])
  // console.log(categories, "{categories}")
  return (
    <div className="mt-10 w-full justify-around relative shadow-md rounded-md p-4 grid grid-cols-4 gap-6">
      <div className="relative flex items-center justify-center col-span-1">
        <UserAvatar
          user={{ image: user?.profile_image, name: user?.display_name || '' }}
          className="w-36 h-36"
        />
        {type === 'userprofile' && (
          <button
            className={`font-bold  text-white rounded-full w-32 cursor-pointer capitalize py-1 flex justify-center items-center ${isFollowing ? 'bg-main' : 'bg-[#FBA422]'
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
                  <span className="font-semibold text-[0.85rem]">{(tutor?.hourly_rate ||session?.tutor?.hourly_rate )}$/hr</span> Hourly rate
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
      <ProfilePictureUpdate isOpen={isOpen} session={session} setIsOpen={setIsOpen} />
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
}



function ProfilePictureUpdate({ isOpen, setIsOpen, session }) {
  const [loading, setLoading] = useState(false)
  const [image, setImage] = useState(null);
  const privateAxios = useAxiosPrivate()
  const { data, update } = useSession()
  const closeDialog = () => {
    setIsOpen(false);
  };
  async function handleImageSubmit() {

    const formDataToSend = new FormData()
    formDataToSend.append('profile_image', image)

    try {
      setLoading(true)
      if (image) {
        const userResponse = await privateAxios.patch('/users/profile', formDataToSend, {
          headers: {
            'Authorization': `Bearer ${session?.token}`,
            'Content-Type': 'multipart/form-data',
          },
        });


        console.log(userResponse.data, "{user}")
        successToast("Updated Profile Pic!")
        const newSession = {
          user: {
            user: userResponse?.data?.user,
            tutor: data?.tutor
          },
        };
        await update(newSession);
        closeDialog()
      }
    } catch (err) {
      console.log(err)
    } finally {
      setLoading(false)
    }
  }

  // console.log("session check",session)
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen} className="profile-modal">
      <DialogContent className="sm:max-w-[425px] shadow-md bg-white">
        <DialogHeader className="text-xl font-semibold py-4 border-b">Update Profile Picture</DialogHeader>
        <DialogDescription className="py-4">
          {!image && (
            <div className="text-center mb-4">
              <UserAvatar className="w-28 h-28 mb-2" user={{ image: session?.user?.profile_image }} />
            </div>
          )}
          {image && (
            <div className="text-center mb-4">
              <UserAvatar className="w-28 h-28 mb-2" user={{ image: URL.createObjectURL(image) }} />
            </div>
          )}
          <FileInput file={image} setFile={setImage} />
        </DialogDescription>
        <DialogFooter className="flex justify-end p-4">
          <Button disabled={loading} variant="outline" onClick={closeDialog}>Cancel</Button>
          <Button disabled={loading} className=" px-4 py-2 flex gap-2 rounded" onClick={handleImageSubmit}>
            {loading && <span className='w-4 h-4 animate-spin'><Icons.Loader2 stroke="white" /></span>}
            Update</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
