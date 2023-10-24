import React from 'react';
import { VideoComment } from './videoComment';
import Image from 'next/image';
export const RepliesList = ({ comments, parentId, handleFetchReplies }) => {
  return (
    <div className="">
      {comments.length > 0 ? (
        comments.map((comment) => (
          <VideoComment key={comment.id} noView={true} comment={comment} parentId={parentId} />
        ))
      ) : (
        <p className="mb-2">No comments found!</p>
      )}
      {comments.length > 0 && (
        <div className="w-full flex justify-center">
          <button className="" onClick={handleFetchReplies}>
            <Image src={'/svgs/add_circle.svg'} width={30} height={30} />
          </button>
        </div>
      )}
    </div>
  );
};
