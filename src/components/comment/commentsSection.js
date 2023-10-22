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

import { useSession } from 'next-auth/react';
import { selectPrimaryComments } from '@/utils/selectors';

export const CommentsSection = () => {
  const [file, setFile] = useState(null);
  const { data: user } = useSession();
  const searchParams = useSearchParams();
  const commentRef = useRef(null);
  const id = searchParams.get('id');
  const primaryComments = useSelector(selectPrimaryComments);
  const dispatch = useDispatch();

  const onSuccess = () => {
    commentRef.current.value = '';
    setFile(null);
  };
  const onCommentSubmit = (e) => {
    e.preventDefault();
    console.log(commentRef.current.value, 'comment');
    const imgRegex = /<img[^>]*>/g;
    const textWithoutImages = commentRef.current.value.replace(imgRegex, '');

    try {
      if (!commentRef.current.value) return;
      const formdata = new FormData();
      formdata.append('comment', textWithoutImages);
      formdata.append('image', file);
      console.log('{here}', file);
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
          <DropdownMenuContent>
            <DropdownMenuItem>Newest</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Oldest</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="bg-white p-4 rounded-md shadow-md">
        <CreateComment commentRef={commentRef} setFile={setFile} handleSubmit={onCommentSubmit} />

        <VideoComments />
      </div>
    </div>
  );
};
