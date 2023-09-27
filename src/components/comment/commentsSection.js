import React, { Suspense, useState } from 'react';
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

export const CommentsSection = ({ videoId }) => {
  const searchParams = useSearchParams();

  const id = searchParams.get('id');

  const dispatch = useDispatch();
  const [comment, setComment] = useState('');
  const comments = useSelector((state) => state.comments.primaryComments);
  const onSuccess = () => setComment('');
  const onCommentSubmit = (e) => {
    e.preventDefault();

    try {
      dispatch(createComment({ videoId: id, comment, onSuccess }));
    } catch (error) {
      console.error(error);
    } finally {
      setComment('');
    }
  };

  return (
    <div className=" mt-8">
      <div className="justify-between font-bold text-lg mb-2 flex">
        <h2>{comments?.length} comments</h2>
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
        <CreateComment
          setComments={setComment}
          comment={comment}
          videoId={videoId}
          onSubmit={onCommentSubmit}
        />

        <VideoComments videoId={videoId} />
      </div>
    </div>
  );
};
