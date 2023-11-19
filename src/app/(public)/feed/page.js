'use client'
import { useState, useEffect } from "react";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import { DeleteFeedModal, Feed } from "@/components";
import { useSession } from "next-auth/react";
import { FeedSkeleton } from "@/utils/skeletons";

const FeedPage = () => {
  const [posts, setPosts] = useState([]);
  const { data: user } = useSession();
  const [open, setOpen] = useState(false);
  const [selectedPostId, setSelectedPostId] = useState(null);
  const [loadingDelete, setLoadingDelete] = useState(false)

  const axios = useAxiosPrivate();

  useEffect(() => {
    getPosts();
  }, []);

  const getPosts = async () => {
    try {
      const response = await axios.get(`/posts`, {
        headers: {
          'Authorization': `Bearer ${user?.token}`,
        },
      });
      setPosts(response?.data);
    } catch (err) {
      console.error(err);
    }
  };

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

      getPosts();
    } catch (error) {
      console.error('Error deleting post:', error);
    } finally {
      setLoadingDelete(false)
      setOpen(false)
    }
  };

  return (
    <div className='flex flex-col gap-4 overflow-hidden'>
      {posts.length > 0 ?
        posts?.map(post => (
          <Feed
            key={post?.id}
            feed={post}
            user={user?.user}
            openModal={() => {
              openDeleteModal(post?.id)
              setSelectedPostId(post?.id)
            }

            }
          />
        )) : <FeedSkeleton time={4} />}
      <DeleteFeedModal open={open} loading={loadingDelete} setOpen={setOpen} onDelete={handleDeletePost} />
    </div>
  );
};

export default FeedPage;
