'use client';
import React, { Suspense, useState, useRef } from 'react';
import { VideoComments, CreateComment, CustomEditor } from '@/components';
import { createComment } from '@/features/comments/commentThunk';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { useSession } from 'next-auth/react';
import { selectPrimaryComments } from '@/utils/selectors';
import { warningToast, warningToastNoAction } from '@/utils/toasts';

export const CommentsSection = () => {
  const { data: user } = useSession();
  const searchParams = useSearchParams();

  const id = searchParams.get('id');
  const primaryComments = useSelector(selectPrimaryComments);
  const dispatch = useDispatch();
  const router = useRouter()


  const onCommentSubmit = (file, text, setData) => {
    try {
      if (!user?.token) {
        return warningToast("Login to Comment", () => router.push('/sign-in'));
      }



      const filteredText = text.replace(/<img\b[^>]*>/gi, '');

      const formdata = new FormData();
      formdata.append('comment', filteredText);
      formdata.append('image', file);

      console.log(filteredText, file);

      const onSuccess = () => {

        if (setData && typeof setData === 'function') {
          setData()
        }
      };
      dispatch(
        createComment({
          videoId: id,
          data: formdata,
          onSuccess,
          token: user?.token,
        })
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
          <DropdownMenuContent align='right'>
            <DropdownMenuItem>Newest</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Oldest</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="bg-white p-4 rounded-md shadow-md">
        {/* <CreateComment setText={setText} setFile={setFile} handleSubmit={onCommentSubmit} /> */}
        <CreateComment handleSubmit={onCommentSubmit} />
        <VideoComments />
      </div>
    </div>
  );
};
