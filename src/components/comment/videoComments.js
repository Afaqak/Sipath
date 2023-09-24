'use client'
// VideoComments.js
import React, { useEffect ,useState} from 'react';
import Image from 'next/image';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPrimaryComments } from '@/features/comments/commentThunk';
import { CreateComment, VideoComment, RepliesList } from '@/components';
import { motion } from 'framer-motion';

export const VideoComments = ({ videoId }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchPrimaryComments({ videoId: 1 }));
  }, []);
  const commentReplies = useSelector((state) => state.comments.commentReplies);

  const comments = useSelector((state) => state.comments.primaryComments);
  const [replyView, setReplyView] = useState({});

  const toggleReplyView = (commentId) => {
    console.log(commentId)
    setReplyView((prevState) => ({
      ...prevState,
      [commentId]: !prevState[commentId],
    }));
  };
  console.log(replyView,"Emp")
  console.log(comments);

  return (
    <div className="py-1 md:mt-4">
      {comments &&
        comments.map((comment) => (
          <div key={comment.id}>
            <VideoComment parentId={comment?.id} comment={comment} toggleReplyView={toggleReplyView}/>
            <div className='border-l ml-6 pl-4'>
              {(commentReplies[comment?.id] && replyView[comment?.id]) && (
                <motion.div
                >
                  <RepliesList comments={commentReplies[comment?.id]} parentId={comment?.id} />
                </motion.div>
              )}
            </div>
          </div>
        ))}
    </div>
  );
};
