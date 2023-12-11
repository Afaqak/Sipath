'use client'
import React, { useState, useEffect } from "react";
import useAxios from "@/hooks/useAxios";
import { DeleteFeedModal, Feed, Icons, VideoItemFeed } from "@/components";
import { useSession } from "next-auth/react";
import Image from "next/image";

const FeedPage = () => {
  const [feeds, setFeeds] = useState([]);
  const { data: user, status } = useSession();
  const [open, setOpen] = useState(false);
  const [selectedPostId, setSelectedPostId] = useState(null);
  const [loading, setLoading] = useState(false)
  const [loadingDelete, setLoadingDelete] = useState(false)
  const [limit, setLimit] = useState(6)

  const axios = useAxios();

  const fetchUserFeed = async (limitSend = 6) => {

    try {
      setLoading(true)
      const request = await fetch(`${process?.env.NEXT_PUBLIC_BACKEND_URL}/users/feed?limit=${limitSend}`, {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      });
    const response = await request.json()
      setFeeds(response.user_feed);
    } catch (err) {
      console.log(err);
    }
    finally {
      setLoading(false)
    }
  };
  useEffect(() => {
    if (status === 'loading') return
    fetchUserFeed()
  }, [status]);


  const openDeleteModal = (id) => {
    setOpen(true);
  };

  const handleDeletePost = async () => {
    try {
      setLoadingDelete(true)
      await axios.delete(`/posts/${selectedPostId}`, {
        headers: {
          'Authorization': `Bearer ${user?.token}`,
        },
      });

      fetchUserFeed()
    } catch (error) {
      console.error('Error deleting post:', error);
    } finally {
      setLoadingDelete(false)
      setOpen(false)
    }
  };

  const loadMore = () => {
    let limitSend = limit + 6
    setLoading(true)
    fetchUserFeed(limitSend)
    setLimit(limitSend);
  };



  return (
    <>
      <h1 className="w-[90%] mx-auto text-3xl font-bold border-b pb-2">Feed</h1>

      <div className="mx-auto grid grid-cols-1 place-content-center  my-6 flex-col gap-4">


        {feeds?.length > 0 && feeds?.map((feedItem, index) => {

          return (
            <React.Fragment key={feedItem?.id || index}>
              {feedItem.type === 'post' ? (
                <div className="">
                  <Feed
                    style="md:w-[70%] w-[90%] lg:w-[50%]"
                    key={feedItem?.id}
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
                    user={user?.user}
                    openModal={() => {
                      openDeleteModal(feedItem?.id);
                      setSelectedPostId(feedItem?.id);
                    }}
                  />
                </div>
              ) : (
                <div key={index} className="w-[60%] mx-auto">
                  <VideoItemFeed key={feeds[index]?.id} video={feeds[index]} />

                </div>
              )}
             
            </React.Fragment>
          );
        })}

        <DeleteFeedModal open={open} loading={loadingDelete} setOpen={setOpen} onDelete={handleDeletePost} />
      </div>
      <div className="flex justify-center mx-auto w-full">
        {feeds?.length > 0 && loading ?
          <span className='animate-spin'>
            <Icons.Loader2 stroke='black' height='40' width='40' /></span> :
          feeds?.length > 0 &&
          <div className="flex justify-center flex-col items-center">
            <button onClick={loadMore} className="bg-gray-100 px-4 py-2 rounded-md text-black font-semibold">
              Load More
            </button>
            <Image src="/svgs/expand_more.svg" alt="expand_more" width={15} height={15} />

          </div>
        }
      </div>
    </>
  );
};

export default FeedPage;

