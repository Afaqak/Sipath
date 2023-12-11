'use client';

import React, { useMemo, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCommentReplies, fetchPrimaryComments } from '@/features/comments/commentThunk';
import { VideoComment, RepliesList, LoadingSkeletons } from '@/components';
import { Skeleton } from '../ui/skeleton';

import {useParams} from 'next/navigation';
import useAxios from '@/hooks/useAxios';
import { selectCommentReplies, selectPrimaryComments } from '@/utils/selectors';
import { resetComments, setComments, setReplyComments } from '@/features/comments/commentSlice';
import Image from 'next/image';

export const VideoComments = () => {
  const axios = useAxios();
  const primaryComments = useSelector(selectPrimaryComments);
  const params=useParams()
  const id=params?.id
  const dispatch = useDispatch();
  const [limit, setLimit] = useState(10);
  const [loading, setLoading] = useState(false);
 
  const [repliesLimit, setRepliesLimit] = useState(10);
  const commentReplies = useSelector(selectCommentReplies);
  const [replyView, setReplyView] = useState({});

 
  useEffect(() => {
    dispatch(resetComments())
    dispatch(
      fetchPrimaryComments({
        videoId: id,
        axios,
      })
    );
  }, [id]);


  const toggleReplyView = (commentId) => {
    setReplyView((prevState) => ({
      ...prevState,
      [commentId]: !prevState[commentId],
    }));
  };

  const loadMore = async () => {
    const newLimit = limit + 10;

    try {
      const response = await axios.get(
        `/assets/video/${id}/comments?limit=${newLimit}&set=0&order=desc`
      );

      dispatch(setComments(response.data.comments));
      setLimit(newLimit);
    } catch (err) {
      console.error(err);
    }
  };

  const handleFetchReplies = async (commentId) => {
    const newLimit = repliesLimit + 10;
    
    try {
      const response = await axios.get(
        `/assets/video/${id}/comments/${commentId}?limit=${newLimit}`
      );
     
      dispatch(setReplyComments({ commentId, replies: response.data?.comments }));
      setRepliesLimit(newLimit);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="py-1 md:mt-4">
      {primaryComments.length > 0 &&
        primaryComments.map((comment, index) => (
          <div key={index}>
            <VideoComment
              parentId={comment?.id}
              comment={comment}
          
              toggleReplyView={toggleReplyView}
              primaryComments={primaryComments}
            />
            <div className="border-l ml-6 pl-4">
              {commentReplies[comment?.id] && replyView[comment?.id] && (
                <div>
                  <RepliesList
                    videoId={id}
                    handleFetchReplies={() => handleFetchReplies(comment?.id)}
                    comments={commentReplies[comment?.id]}
                    parentId={comment?.id}
                  />
                </div>
              )}
            </div>
          </div>
        ))}
      {loading && <LoadingSkeletons times={3} />}
      <div className="w-full flex justify-center mt-16">
        <button className="" onClick={loadMore}>
          <Image src={'/svgs/add_circle.svg'} width={30} height={30} />
        </button>
      </div>
    </div>
  );
};

