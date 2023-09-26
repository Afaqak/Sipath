'use client';

import React, { useMemo, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPrimaryComments } from '@/features/comments/commentThunk';
import { VideoComment, RepliesList } from '@/components';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ClipLoader } from 'react-spinners';
import debounce from 'lodash/debounce';
import { delay } from 'lodash';

//infinite scrolling
export const VideoComments = ({ videoId }) => {
  const dispatch = useDispatch();
  const [set, setSet] = useState(0);
  const [hasLoadedMore, setHasLoadedMore] = useState(false);
  const [loading, setLoading] = useState(false);
  const [replyView, setReplyView] = useState({});
  const { ref, inView } = useInView({ threshold: 1 });
  console.log(inView, 'inview');
  const delay = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, 1000);
  });
  const debouncedFetchComments = useMemo(
    () =>
      debounce(async () => {
        setLoading(true);
        await delay;
        dispatch(
          fetchPrimaryComments({
            videoId: 2,
            set,
            onSuccess(data) {
              if (data.length === 0) {
                setHasLoadedMore(true);
              } else {
                setHasLoadedMore(false);
              }
              setLoading(false);
            },
          })
        );
      }, 300),
    [set, dispatch]
  );

  useEffect(() => {
    debouncedFetchComments();
  }, [debouncedFetchComments]);

  const comments = useSelector((state) => state.comments.primaryComments);
  const memoizedComments = useMemo(() => comments, [comments]);

  const commentReplies = useSelector((state) => state.comments.commentReplies);

  const toggleReplyView = (commentId) => {
    console.log(commentId);
    setReplyView((prevState) => ({
      ...prevState,
      [commentId]: !prevState[commentId],
    }));
  };

  useEffect(() => {
    if (inView && comments.length > 0 && !hasLoadedMore) {
      setHasLoadedMore(true);
      setSet((prevSet) => prevSet + 10);
    }
  }, [inView, comments, hasLoadedMore]);

  return (
    <div className="py-1 md:mt-4">
      {memoizedComments &&
        memoizedComments.map((comment, index) => (
          <div key={comment.id} ref={index === comments.length - 1 ? ref : null}>
            <VideoComment
              parentId={comment?.id}
              comment={comment}
              toggleReplyView={toggleReplyView}
            />
            <div className="border-l ml-6 pl-4">
              {commentReplies[comment?.id] && replyView[comment?.id] && (
                <motion.div>
                  <RepliesList comments={commentReplies[comment?.id]} parentId={comment?.id} />
                </motion.div>
              )}
            </div>
          </div>
        ))}
      {loading && (
        <div className="flex justify-center mt-4">
          <ClipLoader />
        </div>
      )}
    </div>
  );
};

//load comments

// 'use client';
// import React, { useEffect, useState } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { fetchPrimaryComments } from '@/features/comments/commentThunk';
// import { VideoComment, RepliesList } from '@/components';
// import { motion } from 'framer-motion';
// import { Button } from '../ui/button';

// export const VideoComments = ({ videoId }) => {
//   const dispatch = useDispatch();
//   const [commentsToShow, setCommentsToShow] = useState(10);
//   const commentReplies = useSelector((state) => state.comments.commentReplies);
//   const comments = useSelector((state) => state.comments.primaryComments);
//   const [replyView, setReplyView] = useState({});
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     try {
//       dispatch(fetchPrimaryComments({ videoId: 1, limit: commentsToShow }));
//     } catch (err) {
//       console.log(err);
//     } finally {
//       setLoading(false);
//     }
//   }, [commentsToShow]);

//   const toggleReplyView = (commentId) => {
//     console.log(commentId);
//     setReplyView((prevState) => ({
//       ...prevState,
//       [commentId]: !prevState[commentId],
//     }));
//   };

//   const loadMoreComments = () => {
//     setLoading(true);
//     setCommentsToShow(commentsToShow + 10);
//   };

//   return (
//     <div className="py-1 md:mt-4">
//       {comments &&
//         comments.map((comment, index) => (
//           <div key={comment.id}>
//             <VideoComment
//               parentId={comment?.id}
//               comment={comment}
//               toggleReplyView={toggleReplyView}
//             />
//             <div className="border-l ml-6 pl-4">
//               {commentReplies[comment?.id] && replyView[comment?.id] && (
//                 <motion.div>
//                   <RepliesList comments={commentReplies[comment?.id]} parentId={comment?.id} />
//                 </motion.div>
//               )}
//             </div>
//           </div>
//         ))}
//       {comments.length > 0 && (
//         <div className="w-full flex justify-end">
//           <Button
//             isLoading={loading}
//             className="bg-black flex gap-2 items-center"
//             onClick={loadMoreComments}
//           >
//             Load More
//           </Button>
//         </div>
//       )}
//     </div>
//   );
// };
