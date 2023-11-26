'use client';
import React, { useState, useCallback, useRef } from 'react';
import { CreateComment, CustomEditor, Icons } from '@/components';
import { useDispatch, useSelector } from 'react-redux';
import { createReplyToComment, fetchCommentReplies } from '@/features/comments/commentThunk';
import UserAvatar from '../common/userAvatar';
import { useRouter, useSearchParams } from 'next/navigation';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import Image from 'next/image';
import { selectCommentReplies } from '@/utils/selectors';
import { useFormattedTimeAgo } from '@/hooks/useFormattedTimeAgo';
import { LoadingCommentsSkeleton } from '@/utils/skeletons';
import { warningToastNoAction } from '@/utils/toasts';



export const VideoComment = ({ comment, parentId, noView, toggleReplyView }) => {
  const searchParams = useSearchParams();

  const id = searchParams.get('id');
  const { data: user } = useSession();
  const [isReplying, setIsReplying] = useState(false);
  const formattedTimeAgo = useFormattedTimeAgo(comment?.createdAt)
  const dispatch = useDispatch();
  const [loadingReplies, setLoadingReplies] = useState(false);
  const commentReplies = useSelector(selectCommentReplies);
  const router = useRouter()
  const onReplySubmit = ({ text, file }) => {

    setIsReplying(false);

    try {
      const formdata = new FormData();
      if (!file && !text) {
        return warningToastNoAction("You must specify either text or image to comment!")
      }
      formdata.append('image', file);
      console.log(formdata.get('image'),'replying')
      formdata.append(
        'comment',
        `<div class="flex gap-1"><span class="font-bold">${user?.user?.id === comment?.author_id ? user?.user?.display_name : comment?.user?.display_name}</span> ${text}</div}`
      );
      
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

  const handleIsReplying = () => {
    if (!user?.token) {
      return router.push('/sign-in')
    }
    setIsReplying(!isReplying)
  };
  return (
    <div className="flex flex-col mb-4">
      <div className="flex gap-4">
        <Link className="block" href={`/profile/${comment?.author_id}`}>
          <UserAvatar
            user={{
              image: comment?.author_id === user?.user?.id ? user?.user?.profile_image : comment.user?.profile_image,
              name: comment?.author_id === user?.user?.id ? user?.user?.display_name?.slice(0, 2) : comment?.user?.display_name?.slice(0, 2),
            }}
            className="h-8 w-8"
          />
        </Link>

        <div className="w-full">
          <div className="flex gap-4 items-center mb-1">
            <span className="font-medium text-sm ">{comment?.author_id === user?.user?.id ? user?.user?.display_name : comment?.user?.display_name}</span>{' '}
            <p className="text-[0.75rem] text-gray-500">{comment?.createdAt && formattedTimeAgo}</p>
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
              <Icons.reply onClick={handleIsReplying} />
              <Icons.report />

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
              <CustomEditor
                reply={isReplying}
                onCommentSubmit={onReplySubmit}
                closeReplying={()=>setIsReplying(false)}
              />

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

          {loadingReplies ? <LoadingCommentsSkeleton /> : null}
        </div>
      </div>
    </div>
  );
};
