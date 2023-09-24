import React,{Suspense, useState} from 'react'
import { VideoComments,CreateComment } from '@/components';
import { createComment } from '@/features/comments/commentThunk';
import { useDispatch } from 'react-redux';
import { ClipLoader } from 'react-spinners';
import { useSelector } from 'react-redux';

export const CommentsSection = ({videoId=1}) => {

  const dispatch=useDispatch()
  const [comment, setComment] = useState('');
  const comments = useSelector((state) => state.comments.primaryComments);
  const onSuccess=()=> setComment('')
  const onCommentSubmit = (e) => {
    e.preventDefault();

    try {
    
      dispatch(createComment({ videoId:1, comment,onSuccess}));
    } catch (error) {
      console.error(error);
    }finally{
      setComment('')
    }
  };
  console.log(comment)


  return (
    <div className=" mt-8">
      <div className="justify-between font-bold text-lg mb-2 flex">
        <h2>{comments?.length} comments</h2>
        <h2>Sort by</h2>
      </div>
      <div className="bg-white p-4 rounded-md shadow-md">
        <CreateComment setComments={setComment} comment={comment} videoId={videoId} onSubmit={onCommentSubmit}/>
        <Suspense fallback={<ClipLoader/>}>
        <VideoComments videoId={videoId} />
        </Suspense>
      </div>
    </div>
  );
}

