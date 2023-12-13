import React, { useEffect, useState } from 'react';
import useAxios from '@/hooks/useAxios';
import { Button } from '@/components/ui/button';
import { useDispatch, useSelector } from 'react-redux';
import { errorToast, successToast } from '@/utils/toasts';
import { useRouter } from 'next/navigation';
import { setBooks } from '@/features/book/bookSlice';
import {
  VideoItemFeed,
  DeleteFeedModal,
  BookSkeleton,
  VideoItem,
  Icons,
  Book,
  Feed,
} from '@/components';
import Link from 'next/link';
import UserAvatar from '@/components/common/userAvatar';
import { ProfileHoverCard, DeleteModal } from '@/components';
import { VideoEditModal } from '../modals/editVideoModal';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useFormattedTimeAgo } from '@/hooks/useFormattedTimeAgo';

export const MyFeed = ({ session }) => {
  const [feeds, setFeeds] = useState([]);
  const axios = useAxios();
  const [open, setOpen] = useState(false);
  const [selectedPostId, setSelectedPostId] = useState(null);

  const fetchUserFeed = async () => {
    try {
      const response = await axios.get(`/users/feed?limit=10`, {
        headers: {
          Authorization: `Bearer ${session?.token}`,
        },
      });

      setFeeds(response.data?.user_feed);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchUserFeed();
  }, []);

  const openDeleteModal = (id) => {
    setOpen(true);
  };

  const handleDeletePost = async () => {
    try {
      await axios.delete(`/posts/${selectedPostId}`, {
        headers: {
          Authorization: `Bearer ${session?.token}`,
        },
      });

      fetchUserFeed();
    } catch (error) {
      console.error('Error deleting post:', error);
    } finally {
      setOpen(false);
    }
  };

  return (
    <div className="mx-auto grid grid-cols-1 place-content-center  my-6 flex-col gap-6">
      {feeds.map((feedItem, index) => {
        return (
          <React.Fragment key={feedItem?.id || index}>
            {feedItem.type === 'post' ? (
              <div className="">
                <Feed
                  style="md:w-[70%] w-[90%] lg:w-[50%]"
                  key={feedItem?.id}
                  type={'post'}
                  feed={{
                    user: {
                      display_name: feedItem && feedItem['user.display_name'],
                      profile_image: feedItem && feedItem['user.profile_image'],
                      rating: feedItem && feedItem['user.rating'],
                      isTutor: feedItem && feedItem['user.isTutor'],
                      id: feedItem['user.id'] && feedItem['user.id'],
                    },
                    ...feedItem,
                  }}
                  user={session?.user}
                  openModal={() => {
                    openDeleteModal(feedItem?.id);
                    setSelectedPostId(feedItem?.id);
                  }}
                />
              </div>
            ) : (
              <div className="md:w-[70%] mx-auto">
                <VideoItemFeed key={feeds[index]?.id} video={feeds[index]} />
              </div>
            )}
          </React.Fragment>
        );
      })}
      <DeleteFeedModal open={open} setOpen={setOpen} onDelete={handleDeletePost} />
    </div>
  );
};



const normalizeUserData = (video) => {
  const user = video?.user || video?.['user'];

  return {
    display_name: user?.display_name || user?.['display_name'],
    profile_image: user?.profile_image || user?.['profile_image'],
    rating: user?.rating || user?.['rating'],
    isTutor: user?.isTutor || user?.['isTutor'],
    id: user?.id || user?.['id'],
  };
};

export const MyVideos = ({ token = '', url }) => {
  const axios = useAxios();
  const [videos, setVideos] = useState([]);
  const [isEdit, setIsEdit] = useState(false);

  const fetchTutorVideos = async () => {
    try {
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setVideos(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchTutorVideos();
  }, []);

  const handleSetUpdateVideos = (updatedVideo) => {
    fetchTutorVideos();
  };
  const setDeletedVideo = async (id, setOpen) => {
    try {
      const response = await axios.delete(`/assets/videos/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        successToast('Video deleted!');
        fetchTutorVideos();
      }
    } catch (err) {
      errorToast('Error deleting the video!');
    }
  };
  return (
    <div className=" py-8">
      <div className="flex justify-end w-full">
        {videos && videos?.length > 0 && (
          <button
            type="button"
            onClick={() => setIsEdit(!isEdit)}
            className={`w-10 h-4 rounded-2xl bg-white flex shadow-[inset_1px_3px_7px_rgba(0,0,0,0.2)] items-center transition duration-300 focus:outline-none text-subcolor`}
          >
            <div
              className={`w-6 h-6 relative rounded-full flex items-center justify-center  transition duration-300 transform p-1 ${isEdit ? 'translate-x-full  bg-subcolor3' : ' -translate-x-2 bg-subcolor'
                }`}
            >
              {isEdit ? (
                <Icons.cross className=" stroke-white h-2 w-2" />
              ) : (
                <Icons.editPencil className=" stroke-white h-3 w-3" />
              )}
            </div>
          </button>
        )}
      </div>
      <>
        {videos && videos.length > 0 ? (
          <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-6 mt-4">
            {videos.map((video, index) => (
              <VideoItem
                video={video}
                setDeletedVideo={setDeletedVideo}
                setVideos={handleSetUpdateVideos}
                isEdit={isEdit}
                key={index}
              />
            ))
            }
          </div>
        ) : (
          <div className='py-16 text-center font-semibold'>No Videos right now!</div>
        )}
      </>


    </div>
  );
};

export const Mybooks = ({ url, user, token, isProfile }) => {
  const axios = useAxios();
  const dispatch = useDispatch();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const books = useSelector((state) => state.books?.books);
  const fetchBooks = async () => {
    try {
      setLoading(false);
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      dispatch(setBooks([]));
      dispatch(setBooks(response.data));
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <div>
      <div className="flex w-full justify-end">
        <Button
          onClick={() => router.push('/user/new-book')}
          variant="outline"
          type="button"
          className={`rounded-2xl mt-4 text-white bg-subcolor flex gap-2 items-center justify-center shadow-[inset_1px_3px_7px_rgba(0,0,0,0.2)]`}
        >
          <span>+</span> Add Book
        </Button>
      </div>

      {loading ? (
        <BookSkeleton times={6} />
      ) : (
        <>
          {books && books.length > 0 ? (
            <div className="grid mt-6 gap-4 grid-cols-1 lg:grid-cols-2">
              {books.map((book, index) => (
                <Book token={token} isProfile={isProfile} book={book} user={user} key={index} />
              ))}
            </div>
          ) : (
            <p className="h-[30vh] font-semibold flex items-center justify-center">Currently no books are available</p>
          )}
        </>
      )}
    </div>
  );
};




export const MySavedVideos = ({ session }) => {
  const [savedVideos, setSavedVideos] = useState([])
  const axios = useAxios()
  const fetchSavedVideos = async () => {
    try {
      const response = await axios.get('/users/saved-videos', {
        headers: {
          Authorization: `Bearer ${session?.token}`,
        },
      });
      setSavedVideos(response.data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchSavedVideos();
  }, []);
  const removeVideo = async (id, setDone) => {
    try {
      const response = await axios.delete(`/users/saved-videos`, {
        headers: {
          Authorization: `Bearer ${session?.token}`
        },
        data: {
          video_id: id
        }
      })


      setSavedVideos(prev => prev.filter(video => video?.video?.id !== id))


      if (setDone && typeof setDone === 'function') {
        setDone()
      }
      errorToast('Video deleted!')
    } catch (err) {

    }
  }


  return (

    <div className="">
      {
        savedVideos && savedVideos.length > 0 ?

          <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-6 mt-4 py-6">
            {savedVideos.map((video, index) => (

              <VideoItemSaved
                video={video?.video}
                setDeletedVideo={removeVideo}
                // setVideos={setSavedVideos}
                // isEdit={isEdit}
                key={index}
              />
            ))
            }
          </div>

          :
          <div className='py-16 text-center font-semibold'>No Saved Videos right now!</div>

      }
    </div>)
}
















export const VideoItemSaved = ({ video, isEdit, setVideos, loading, setDeletedVideo }) => {

  const [open, setOpen] = useState(false);
  const [videoDelete, setVideoDelete] = useState(false);
  const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC';
  const formattedTimeAgo = useFormattedTimeAgo(video?.createdAt, userTimeZone);

  return (
    <div

      className={`max-h-[20rem] min-w-full md:w-[20rem] max-w-[20rem] ${isEdit && 'border-2 border-subcolor'
        } relative block w-full p-4 bg-white box-shadow-main  rounded-md border`}
    >
      {video?.live && (
        <span className="absolute top-6 z-[1000] right-6 bg-[#FB3C22] flex gap-1 items-center py-[0.20rem] rounded-xl text-sm text-white px-2 font-medium">
          <Icons.live className="w-5 h-5" />
          Live
        </span>
      )}

      {video?.price && video?.price > 0 && (
        <span className="absolute top-2 z-[1000] left-0 bg-subcolor text-[0.7rem] py-[0.15rem]  rounded-r-md text-white px-3 font-medium">
          {video?.price}$
        </span>
      )}
      <Link href={video?.price > 0 ? `/premium/watch/${video?.id}` : `/videos/watch/${video?.id}`} className="relative cursor-pointer block">
        <Icons.play />
        {
          video?.thumbnail &&

          <img

            src={video?.thumbnail || '/place-holder-post.jpeg'}
            alt={'thumbnail'}
            className="rounded-md object-cover w-full h-[11.2rem]"
          />
        }
      </Link>
      <div className="mt-3 flex gap-2 w-full">
        <div>
          <ProfileHoverCard user={{
            display_name: video?.user?.display_name,
            profile_image: video?.user?.profile_image,
            rating: video?.user?.rating,
            isTutor: video.user?.isTutor,
            id: video?.user?.id
          }}>
            <UserAvatar user={{
              image: video?.user?.profile_image,
              name: (video?.user?.display_name && video?.user?.display_name.length > 0) ? video?.user?.display_name.slice(0, 2) : ""
            }} />

          </ProfileHoverCard>
        </div>
        <div className="w-full group">
          <div className="w-full flex justify-between items-start">
            <Link
              href={video?.price > 0 ? `/premium/watch/${video?.id}` : `/videos/watch/${video?.id}`}
              className="text-[1.10rem] block font-[550] mb-[0.20rem]  "
            >
              <span className="line-clamp-2 hover:underline">

                {video?.title}
              </span>
            </Link>

            <div className=''>
              <DropdownMenu className="cursor-pointer">
                <DropdownMenuTrigger>
                  <Icons.elipsis className="h-7 transform rotate-90  text-gray-500 w-7" />
                </DropdownMenuTrigger>
                <DropdownMenuContent align='end'>
                  <DropdownMenuItem className="flex gap-2" onClick={() => setVideoDelete(true)}>
                    Remove<Icons.trash className="h-4 w-4 " />
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

          </div>
          <div className="flex items-center text-sm gap-2 text-gray-700">
            <span>{video && video['user.display_name'] && video['user.display_name']}</span>
          </div>
          <div className="flex items-center text-sm gap-2 text-gray-700">
            <span>{video && video?.views} views</span>
            <span>&bull;</span>
            <span>{video && formattedTimeAgo}</span>
            <span>&bull;</span>
            <div className="flex items-center">
              {
                video?.rating < 1 ? '0' : video?.rating?.slice(0, -1)
              }

              <span>
                <Icons.rating />
              </span>
            </div>
          </div>
        </div>
      </div>
      <VideoEditModal
        video={video}
        setVideos={setVideos}
        isEdit={true}
        isOpen={open}
        setIsOpen={setOpen}
      />
      <DeleteModal
        isOpen={videoDelete}
        loading={loading}
        onDeleteSubmit={() => setDeletedVideo(video?.id, () => setVideoDelete(false))}
        setIsOpen={setVideoDelete}
        text={video?.title}
      />
    </div>
  );
};

