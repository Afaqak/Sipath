import React, { Suspense, useState, useRef } from 'react';
import { VideoComments, CreateComment } from '@/components';
import { createComment } from '@/features/comments/commentThunk';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'next/navigation';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import useAxiosPrivate from '@/hooks/useAxiosPrivate';

export const CommentsSection = ({ videoId }) => {
  const axios = useAxiosPrivate();
  const searchParams = useSearchParams();
  const commentRef = useRef(null);
  const id = searchParams.get('id');
  const primaryComments = useSelector((state) => state.comments.primaryComments);

  const dispatch = useDispatch();

  const onSuccess = () => {
    commentRef.current.value = '';
  };
  const onCommentSubmit = (e) => {
    e.preventDefault();
    console.log(commentRef.current, 'comment');

    try {
      if (!commentRef.current.value) return;
      dispatch(
        createComment({ videoId: id, comment: commentRef.current?.value, onSuccess, axios })
      );
    } catch (error) {
      console.error(error);
    } finally {
    }
  };
  return (
    <div className=" mt-8">
      <div className="justify-between font-bold text-lg mb-2 flex">
        <h2>{primaryComments?.length} comments</h2>
        <DropdownMenu>
          <DropdownMenuTrigger className="focus:outline-none outline-none">
            Sort By
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>Newest</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Oldest</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="bg-white p-4 rounded-md shadow-md">
        <CreateComment commentRef={commentRef} videoId={videoId} onSubmit={onCommentSubmit} />

        <VideoComments />
      </div>
    </div>
  );
};
