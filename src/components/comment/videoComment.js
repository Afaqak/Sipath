'use client';
import React, { useState, useCallback, useRef } from 'react';
import { Skeleton } from '../ui/skeleton';
import { debounce } from 'lodash';
import { CreateComment, Icons } from '@/components';
import { useDispatch, useSelector } from 'react-redux';
import { createReplyToComment, fetchCommentReplies } from '@/features/comments/commentThunk';
import { ClipLoader } from 'react-spinners';
import UserAvatar from '../common/userAvatar';
import { useSearchParams } from 'next/navigation';
import useAxiosPrivate from '@/hooks/useAxiosPrivate';

const LoadingSkeletons = () => (
  <div className="py-8 grid  gap-4">
    {[...Array(4)].map((_, idx) => (
      <div key={idx} className="bg-white rounded-md p-4 shadow-md">
        <div className="flex items-center space-x-4">
          <Skeleton className="h-12 w-12 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[250px]" />
            <Skeleton className="h-4 w-[200px]" />
          </div>
        </div>
      </div>
    ))}
  </div>
);

export const VideoComment = ({ comment, parentId, noView, toggleReplyView }) => {
  const axios = useAxiosPrivate();
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  const commentRef = useRef(null);

  const [isReplying, setIsReplying] = useState(false);

  const dispatch = useDispatch();
  const [loadingReplies, setLoadingReplies] = useState(false);
  const commentReplies = useSelector((state) => state.comments.commentReplies);

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const createdAt = new Date(timestamp);

    const timeDiff = now - createdAt;
    const seconds = Math.floor(timeDiff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const weeks = Math.floor(days / 7);
    const months = Math.floor(days / 30);

    if (months > 0) {
      return `${months} month${months > 1 ? 's' : ''} ago`;
    } else if (weeks > 0) {
      return `${weeks} week${weeks > 1 ? 's' : ''} ago`;
    } else if (days > 0) {
      return `${days} day${days > 1 ? 's' : ''} ago`;
    } else if (hours > 0) {
      return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    } else if (minutes > 0) {
      return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    } else {
      return `${seconds} second${seconds > 1 ? 's' : ''} ago`;
    }
  };

  const debouncedOnReplySubmit = useCallback(
    debounce(() => {
      console.log('submitting the reply');
      try {
        setIsReplying(false);
        console.log(commentRef.current?.value, 'com');
        dispatch(
          createReplyToComment({
            videoId: id,
            commentId: parentId,
            comment: commentRef.current?.value,
            axios,
          })
        );
      } catch (error) {
        console.error(error);
      } finally {
        commentRef.current.value = '';
      }
    }, 300),
    [dispatch, parentId]
  );

  const handleOnReplySubmit = (e) => {
    e.preventDefault();
    debouncedOnReplySubmit();
  };

  // const onCommentSubmit = (e) => {
  //   e.preventDefault();
  //   console.log(commentRef.current, 'comment');

  //   try {
  //     if (!commentRef.current.value) return;
  //     dispatch(createComment({ videoId: id, comment: commentRef.current?.value, onSuccess }));
  //   } catch (error) {
  //     console.error(error);
  //   } finally {
  //   }
  // };

  const onSuccess = (data) => {
    setLoadingReplies(false);
    console.log(data, 'data after fetch');
  };

  const handleFetchReplies = async () => {
    try {
      if (!commentReplies[comment?.id]) {
        setLoadingReplies(true);
        dispatch(fetchCommentReplies({ videoId: id, commentId: parentId, onSuccess, axios }));
        toggleReplyView(parentId);
      } else {
        toggleReplyView(parentId);
      }
    } catch (error) {
      console.error(error);
      setLoadingReplies(false);
    }
  };
  const handleIsReplying = () => setIsReplying(!isReplying);
  return (
    <div className="flex flex-col mb-4">
      <div className="flex gap-4">
        <UserAvatar
          user={{ name: comment?.user?.display_name || comment?.user?.first_name }}
          className="h-8 w-8"
        />

        <div className="w-full">
          <div className="flex gap-4 items-center mb-1">
            <span className="font-medium text-sm ">{comment?.user?.display_name}</span>{' '}
            <p className="text-[0.75rem] text-gray-500">{formatTimeAgo(comment?.createdAt)}</p>
          </div>
          <div className="flex gap-4 items-center">
            <p className="text-sm md:text-base py-2 px-3 bg-gray-100 shadow-md w-fit">
              {comment.comment}
            </p>
            <div className="flex flex-col gap-2 self-start">
              <svg
                onClick={handleIsReplying}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-4 h-4 cursor-pointer"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3"
                />
              </svg>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-4 h-4 cursor-pointer"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 3v1.5M3 21v-6m0 0l2.77-.693a9 9 0 016.208.682l.108.054a9 9 0 006.086.71l3.114-.732a48.524 48.524 0 01-.005-10.499l-3.11.732a9 9 0 01-6.085-.711l-.108-.054a9 9 0 00-6.208-.682L3 4.5M3 15V4.5"
                />
              </svg>
            </div>
          </div>
          <div className="flex justify-between text-gray-500 mt-2">
            <div className="flex gap-2 items-center cursor-pointer">
              <Icons.love />
              <span className="text-sm">2</span>
            </div>
          </div>
          {isReplying && (
            <div className="w-full mt-2">
              <CreateComment
                commentRef={commentRef}
                onSubmit={handleOnReplySubmit}
                reply={isReplying}
              />
              <div className="flex w-full gap-8 mt-2 justify-end items-end">
                <button
                  type="button"
                  onClick={handleIsReplying}
                  className="py-1 px-2 hover:bg-gray-200 hover:rounded-2xl"
                >
                  cancel
                </button>
                <button
                  onClick={handleOnReplySubmit}
                  className="py-1 px-2 hover:bg-gray-200 hover:rounded-2xl"
                >
                  reply
                </button>
              </div>
            </div>
          )}
          {!noView && (
            <button
              onClick={handleFetchReplies}
              className="text-blue-500 font-medium mt-2"
              type="button"
            >
              View Replies
            </button>
          )}

          {loadingReplies ? <LoadingSkeletons /> : null}
        </div>
      </div>
    </div>
  );
};
