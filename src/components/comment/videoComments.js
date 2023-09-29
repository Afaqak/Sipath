'use client';

import React, { useMemo, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPrimaryComments } from '@/features/comments/commentThunk';
import { VideoComment, RepliesList } from '@/components';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Skeleton } from '../ui/skeleton';
import debounce from 'lodash/debounce';
import { useSearchParams } from 'next/navigation';
export const VideoComments = ({ videoId }) => {
  const primaryComments = useSelector((state) => state.comments.primaryComments);
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
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

  console.log(primaryComments, 'primary comments');

  const debouncedFetchComments = useMemo(
    () =>
      debounce(async () => {
        try {
          setLoading(true);
          await delay;
          dispatch(
            fetchPrimaryComments({
              videoId: id,
              set,
              onSuccess(data) {
                if (data.length === 0) {
                  setHasLoadedMore(true);
                } else {
                  console.log(data, 'new page');
                  setHasLoadedMore(false);
                }
                setLoading(false);
              },
            })
          );
        } catch (err) {
          console.log(err);
        } finally {
          setLoading(false);
        }
      }, 300),
    [set, dispatch]
  );

  useEffect(() => {
    debouncedFetchComments();
  }, [debouncedFetchComments]);
  const LoadingSkeletons = () => (
    <div className="py-8 grid  gap-4">
      {[...Array(3)].map((_, idx) => (
        <div key={idx} className="bg-white rounded-md p-4 shadow-md">
          <div className="flex items-center space-x-4">
            <Skeleton className="h-12 w-12 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-[250px]" />
              <Skeleton className="h-4 w-[200px]" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const commentReplies = useSelector((state) => state.comments.commentReplies);
  console.log('commentReplies', commentReplies);
  console.log(commentReplies);
  const toggleReplyView = (commentId) => {
    console.log(commentId);
    setReplyView((prevState) => ({
      ...prevState,
      [commentId]: !prevState[commentId],
    }));
  };

  useEffect(() => {
    if (inView && primaryComments.length > 0 && !hasLoadedMore) {
      setHasLoadedMore(true);
      setSet((prevSet) => prevSet + 10);
    }
  }, [inView, primaryComments, hasLoadedMore]);

  return (
    <div className="py-1 md:mt-4">
      {primaryComments.length > 0 &&
        primaryComments.map((comment, index) => (
          <div key={comment.id} ref={index === primaryComments.length - 1 ? ref : null}>
            <VideoComment
              parentId={comment?.id}
              comment={comment}
              toggleReplyView={toggleReplyView}
              primaryComments={primaryComments}
            />
            <div className="border-l ml-6 pl-4">
              {commentReplies[comment?.id] && replyView[comment?.id] && (
                <motion.div>
                  <RepliesList
                    videoId={id}
                    comments={commentReplies[comment?.id]}
                    parentId={comment?.id}
                  />
                </motion.div>
              )}
            </div>
          </div>
        ))}
      {loading && <LoadingSkeletons />}
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
