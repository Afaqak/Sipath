'use client';

import React, { useState } from 'react';
import { CreateComment, VideoComments, Feed } from '@/components';


export const VideoFeed = ({ comments }) => {
  const [showComments, setShowComments] = useState(false);

  return (
    <div className=" bg-white shadow-md mx-auto mt-10 rounded-md">
      <Feed
        avatar={comments[0].avatar}
        title={comments[0].title}
        sender={comments[0].sender}
        setShowComments={setShowComments}
        showComments={showComments}
      />
      {showComments && (
        <>
          <div className="w-[95%] h-[1px] bg-gray-200 mx-auto"></div>
          <CreateComment />
          {/* <Comments comments={comments} /> */}
        </>
      )}
    </div>
  );
};
