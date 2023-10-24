'use client';
import React, { useState, useCallback, useRef } from 'react';
import { Skeleton } from '../ui/skeleton';
import { debounce } from 'lodash';
import { CreateComment, Icons, formatTimeAgo } from '@/components';
import { useDispatch, useSelector } from 'react-redux';
import { createReplyToComment, fetchCommentReplies } from '@/features/comments/commentThunk';
import UserAvatar from '../common/userAvatar';
import { useRouter, useSearchParams } from 'next/navigation';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import Image from 'next/image';
import { selectCommentReplies } from '@/utils/selectors';

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
  const searchParams = useSearchParams();
  const [text, setText] = useState('');
  const id = searchParams.get('id');
  const commentRef = useRef(null);
  const { data: user } = useSession();
  const [isReplying, setIsReplying] = useState(false);
  const [file, setFile] = useState(null);
  const dispatch = useDispatch();
  const [loadingReplies, setLoadingReplies] = useState(false);
  const commentReplies = useSelector(selectCommentReplies);
  console.log(commentReplies, '${com replies}');
  console.log(text);
  const onReplySubmit = (e) => {
    e.preventDefault();
    console.log('submitting the reply');
    setIsReplying(false);
    console.log(text, 'comment me');
    const imgRegex = /<img[^>]*>/g;
    const textWithoutImages = text.replace(imgRegex, '');
    console.log(textWithoutImages, 'twi', text);
    try {
      const formdata = new FormData();
      formdata.append(
        'comment',
        `<div class="flex gap-1"><span class="font-bold">${comment?.user?.display_name}</span> ${textWithoutImages}</div}`
      );
      formdata.append('image', file);

      dispatch(
        createReplyToComment({
          videoId: id,
          commentId: parentId,
          data: formdata,
          token: user?.token,
        })
      );
    } catch (error) {
      console.error(error);
    }
  };

  const onSuccess = (data) => {
    setLoadingReplies(false);
    console.log(data, 'data after fetch');
  };

  const handleFetchReplies = async () => {
    try {
      if (!commentReplies[comment?.id]) {
        setLoadingReplies(true);
        dispatch(
          fetchCommentReplies({ videoId: id, commentId: parentId, onSuccess, token: user?.token })
        );
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
        <Link className="block" href={`/profile/${comment?.author_id}`}>
          <UserAvatar
            user={{
              image: comment.user?.profile_image,
              name: comment?.user?.display_name || comment?.user?.first_name,
            }}
            className="h-8 w-8"
          />
        </Link>

        <div className="w-full">
          <div className="flex gap-4 items-center mb-1">
            <span className="font-medium text-sm ">{comment?.user?.display_name}</span>{' '}
            <p className="text-[0.75rem] text-gray-500">{formatTimeAgo(comment?.createdAt)}</p>
          </div>
          <div className="flex gap-4 items-center">
            <div className="flex flex-col gap-1">
              {comment?.image && (
                <Image src={comment?.image} alt="comment-image" height={300} width={300} />
              )}
              <div
                style={{
                  whiteSpace: 'pre-wrap',
                }}
                dangerouslySetInnerHTML={{ __html: comment.comment }}
                className="text-sm md:text-base py-2 px-3 bg-gray-100 shadow-md w-fit break-words"
              ></div>
            </div>
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
                setFile={setFile}
                setText={setText}
                handleSubmit={onReplySubmit}
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

          {loadingReplies ? <LoadingSkeletons /> : null}
        </div>
      </div>
    </div>
  );
};
