'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import { CreateComment, RepliesList } from '@/components';
import { useDispatch, useSelector } from 'react-redux';
import { createReplyToComment, fetchCommentReplies } from '@/features/comments/commentThunk';
import { ClipLoader } from 'react-spinners';
export const VideoComment = ({ comment, parentId, noView ,toggleReplyView}) => {
  const [isReplying, setIsReplying] = useState(false);
  const [comments, setComments] = useState('');
  const dispatch = useDispatch();
  const [loadingReplies, setLoadingReplies] = useState(false)
  const commented = useSelector((state) => state.comments);
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
  
  console.log(commented);
  const onReplySubmit = async (e) => {
    e.preventDefault();
    console.log(comments, 'running');
    try {
      setIsReplying(false)
      dispatch(createReplyToComment({ videoId: 1, commentId: parentId, comments }));
    } catch (error) {
      console.error(error);
    }
  };

  const onSuccess=()=>{
    setLoadingReplies(false)
  }

  const handleFetchReplies = async () => {
    try {
      if(!commentReplies[comment?.id]){
      setLoadingReplies(true);
      dispatch(fetchCommentReplies({ videoId: 1, commentId: parentId ,onSuccess}));
      toggleReplyView(parentId)
    }else{
    toggleReplyView(parentId)
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
        <Image
          src="/demo-4.jpg"
          alt="demo image"
          className="rounded-full w-[2.4rem] h-[2.36rem] object-cover"
          width={100}
          height={50}
        />

        <div className="w-full">
          <div className="flex gap-4 items-center mb-1">
            <span className="font-medium text-sm ">author</span>{' '}
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
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-4 h-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                />
              </svg>
              <span className="text-sm">2</span>
            </div>
          </div>
          {isReplying && (
            <div className="w-full mt-2">
              <CreateComment
                comment={comments}
                comments={comment}
                setComments={setComments}
                onSubmit={onReplySubmit}
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
                  onClick={onReplySubmit}
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

        {loadingReplies ? (
          <div className="flex items-center mt-2">
            <ClipLoader
              sizeUnit={'px'}
              size={15}
              color={'#123abc'} 
            />
            <p className="ml-2 text-gray-500">Loading Replies...</p>
          </div>
        ) : null}

         
        </div>
      </div>
    </div>
  );
};
