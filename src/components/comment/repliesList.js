import React from 'react';
import { VideoComment } from './videoComment';

export const RepliesList = ({ comments, parentId }) => {
  return (
    <div className="">
      {comments.length > 0 ? (
        comments.map((comment) => (
          <VideoComment key={comment.id} noView={true} comment={comment} parentId={parentId} />
        ))
      ) : (
        <p className="mb-2">No comments found!</p>
      )}
    </div>
  );
};
