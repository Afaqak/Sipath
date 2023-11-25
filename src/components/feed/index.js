'use client';
import { useEffect,useState, useRef  } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import UserAvatar from '@/components/common/userAvatar';
import { ProfileHoverCard,  DeleteModal, Icons,CreateComment } from '@/components';
import { VideoEditModal } from '../video/editVideoModal';
import { useFormattedTimeAgo } from '@/hooks/useFormattedTimeAgo';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useSession } from 'next-auth/react';


import { useRouter } from 'next/navigation';
import useAxiosPrivate from '@/hooks/useAxiosPrivate';
import { warningToast } from '@/utils/toasts';
import { LoadingCommentsSkeleton } from '@/utils/skeletons';
import { useDispatch ,useSelector} from 'react-redux';
import { addComment, addMoreComments, addMoreReplies, addReply, fetchCommentsAsync, fetchRepliesAsync, selectCommentsByPostId } from '@/features/feedComments/feedCommentSlice';




export const VideoItemFeed = ({ video, isEdit, setVideos, loading, setDeletedVideo }) => {
  const [open, setOpen] = useState(false);
  const [videoDelete, setVideoDelete] = useState(false);
  const [chatOpen, setChatOpen] = useState(false)
  const {data:user}=useSession()

  return (
    <div className=' flex flex-col gap-2 '>
      <div

        className={`max-h-[13rem] min-h-[12rem] pb-4 flex gap-4  bg-white box-shadow-main rounded-md border p-4 min-w-full md:w-[20rem] lg:w-[21.8rem] ${isEdit && 'border-2 border-subcolor'
          } relative block w-full`}
      >
        {video?.live && (
          <span className="absolute top-6 z-[1000] right-6 bg-[#FB3C22] flex gap-1 items-center py-[0.20rem] rounded-xl text-sm text-white px-2 font-medium">
            <Icons.live className="w-5 h-5" />
            Live
          </span>
        )}

        {video?.price && video?.price > 0 && (
          <span className="absolute top-2 z-[1000] left-0 bg-subcolor text-[0.7rem] py-[0.15rem]  rounded-r-md text-white px-3 font-medium">
            {video?.price}$
          </span>
        )}
        <Link href={`/videos/watch?id=${video?.id}`} className="relative cursor-pointer block">
          <Icons.play />
          {video?.thumbnail &&
            <Image
              src={video?.thumbnail}
              alt={'thumbnail'}
              width={300}
              height={200}
              className="rounded-md object-contain border w-[19rem] h-[10rem]"
            />
          }
        </Link>
        <div className="mt-3 flex gap-2 w-full">

          <div className="w-full flex flex-col gap-4 justify-between group">
            <div className="w-full flex flex-col">
              <Link
                href={`/videos/watch?id=${video?.id}`}
                className="text-[1.10rem] block font-[550] mb-[0.20rem]  "
              >
                <span className="line-clamp-2 hover:underline">

                  {video?.title}
                </span>
              </Link>
              <div className='flex gap-2 items-center'>
                <ProfileHoverCard user={{
                  display_name: video && video['user.display_name'],
                  profile_image: video && video['user.profile_image'],
                  rating: video && video['user.rating'],
                  isTutor: video && video['user.isTutor'],
                  id: video && video['user.id']
                }}>
                  <UserAvatar className="h-6 w-6" user={{ image: video && video['user.profile_image'] }} />
                </ProfileHoverCard>

                <span className='text-[0.8rem] font-thin -mt-1 uppercase'>{video && video['user.display_name']}</span>
              </div>
              <span className="line-clamp-3 text-sm">
                {video?.description}
              </span>
              {isEdit && (
                <div className=''>
                  <DropdownMenu className="cursor-pointer">
                    <DropdownMenuTrigger>
                      <Icons.elipsis className="h-7 transform rotate-90  text-gray-500 w-7" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align='end'>
                      <DropdownMenuItem onClick={() => setOpen(true)} className="flex gap-2">
                        Edit <Icons.edit className="h-4 w-4 stroke-[#616161]" />
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="flex gap-2" onClick={() => setVideoDelete(true)}>
                        Delete<Icons.trash className="h-4 w-4 " />
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              )}

            </div>
            <div className="flex justify-end items-center text-sm gap-2 text-gray-700">
              {/* <Icons.chat onClick={()=>setChatOpen(!chatOpen)} className='cursor-pointer w-5 h-5' /> */}
              <div className="flex flex-col items-center">

                <div className='flex gap-1'>
                  {
                    video?.rating < 1 ? '0' : video?.rating.slice(0, -1)
                  }
                  <span>
                    <Icons.rating />
                  </span>
                </div>
                <span>{video && video?.views} views</span>
              </div>
            </div>
          </div>
        </div>

        <VideoEditModal
          video={video}
          setVideos={setVideos}
          isEdit={true}
          isOpen={open}
          setIsOpen={setOpen}
        />
        <DeleteModal
          isOpen={videoDelete}
          loading={loading}
          onDeleteSubmit={() => setDeletedVideo(video?.id, () => setVideoDelete(false))}
          setIsOpen={setVideoDelete}
          text={video?.title}
        />
      </div>
     
    </div>
  );
};









export const CommentSectionFeed = ({ itemId, type }) => {
  const dispatch=useDispatch()
  const { data: user } = useSession()
  const axios = useAxiosPrivate()
  const comments = useSelector((state) => selectCommentsByPostId(state, itemId));
  const [commentReplies, setCommentReplies] = useState({})
  const [replyView, setReplyView] = useState({});
  const [file, setFile] = useState(null);
  const [text, setText] = useState('');
  const router = useRouter()
  const [limit,setLimit]=useState(0)
  const [commentLimit, setCommentLimit] = useState(0);


  const toggleReplyView = (commentId) => {
    setReplyView((prevState) => ({
      ...prevState,
      [commentId]: !prevState[commentId],
    }));
  };



  useEffect(() => {
    const fetchPrimaryComments = async (limit) => {
      try {
        dispatch(fetchCommentsAsync({postId:itemId,token:user?.token}))
      
      } catch (err) {
        console.log(err)
      }
    }
    fetchPrimaryComments()

  }, [])





  const loadMoreComments = async () => {
     
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/posts/${itemId}/comments?limit=10&set=${commentLimit + 10}`,
        {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        }
      );

      setCommentLimit((prevLimit) => prevLimit + 10);
      dispatch(addMoreComments({ postId: itemId, moreComments: response.data?.comments }));
    } catch (error) {
      console.error(error);
    }
  };



  const loadMoreReplies = async (commentId) => {
    try {
      

      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/posts/${itemId}/comments/${commentId}?limit=10&set=${limit+10}&order=asc`
      );

      setLimit(limit+10)
 
      dispatch(addMoreReplies({ postId:itemId,commentId, moreReplies: response.data?.comments }));
    } catch (error) {
      console.error(error);
    }
  };



  const onCommentSubmit = async (e) => {
    e.preventDefault();
    const imgRegex = /<img[^>]*>/g;
    const textWithoutImages = text.replace(imgRegex, '');
    try {
      if (!user?.token) {
        return warningToast("Login to Comment", () => router.push('/sign-in'))
      }
      if (!text) return;
      const formdata = new FormData();
      formdata.append('comment', textWithoutImages);
      formdata.append('image', file);

      const response = await axios.post(`/posts/${itemId}/comments`, formdata, {
        headers: {
          Authorization: `Bearer ${user?.token}`
        }
      })

      dispatch(addComment({postId:itemId,comment:response?.data?.comment}))

    } catch (error) {
      console.error(error);
    } finally {
    }
  };




  return (
    <div className='flex flex-col gap-4'>
      <CreateComment setText={setText} setFile={setFile} handleSubmit={onCommentSubmit} />
      {comments?.length > 0 &&
        comments?.map((comment, index) => {
     
          return (
            <div key={index}>
              <FeedComment
                itemId={itemId}
                user={user}
                parentId={comment?.id}
                comment={comment}
                toggleReplyView={toggleReplyView}
                primaryComments={comments}
                commentReplies={commentReplies}
                setCommentReplies={setCommentReplies}
              />
              <div className="border-l ml-6 pl-4">
                {comment  && replyView[comment?.id] && (
                  
                  <div>
                    <RepliesList
                      itemId={itemId}
                      handleFetchReplies={() =>loadMoreReplies(comment?.id)}
                      comments={comment?.replies}
                      parentId={comment?.id}
                    />
                  </div>
                )}
              </div>
            </div>
          )
        })}
      {/* {loading && <LoadingSkeletons />} */}
      <div className="w-full flex justify-center mt-16">
       
        <button onClick={loadMoreComments} className="">
          <Image src={'/svgs/add_circle.svg'} width={30} height={30} />
        </button>
      </div>
    </div>
  )
}




const FeedComment = ({ comment, itemId, noView, toggleReplyView, parentId }) => {
  const formattedTimeAgo = useFormattedTimeAgo(comment?.createdAt);
  const axios = useAxiosPrivate();
  const [isReplying, setIsReplying] = useState(false);
  const [file, setFile] = useState(null);
  const [text, setText] = useState('');
  const [loadingReplies, setLoadingReplies] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();
  const comments = useSelector((state) => state.feedComments);
  const { data: user } = useSession();

  const onReplySubmit = async (e) => {
    e.preventDefault();

    const imgRegex = /<img[^>]*>/g;
    const textWithoutImages = text.replace(imgRegex, '');

    try {
      const formdata = new FormData();
      formdata.append(
        'comment',
        `<div class="flex gap-1"><span class="font-bold">${user?.user?.id === comment?.author_id ? user?.user?.display_name : comment?.user?.display_name}</span> ${textWithoutImages}</div>`
      );
      formdata.append('image', file);

      const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/posts/${itemId}/comments/${parentId}`, formdata, {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      });

      dispatch(addReply({ postId: itemId, commentId: response?.data?.comment?.reply_to, reply: response?.data?.comment }));
    } catch (error) {
      console.error(error);
    }
  };

  const handleFetchReplies = async () => {
    try {
      setLoadingReplies(true);

      if (!comments[comment?.id]) {
        dispatch(fetchRepliesAsync({ postId: itemId, commentId: comment?.id, token: user?.token }));
        toggleReplyView(comment?.id);
      } else {
        toggleReplyView(comment?.id);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingReplies(false);
    }
  };

  const handleIsReplying = () => {
    if (!user?.token) {
      return router.push('/sign-in');
    }
    setIsReplying(!isReplying);
  };

  return (
    <div className="flex flex-col mb-4">
      <div className="flex gap-4">
        <Link className="block" href={`/profile/${comment?.author_id}`}>
          <UserAvatar
            user={{
              image: +comment?.author_id === +user?.user?.id ? user?.user?.profile_image : comment.user?.profile_image,
              name: comment?.user?.display_name || comment?.user?.first_name,
            }}
            className="h-8 w-8"
          />
        </Link>

        <div className="w-full">
          <div className="flex gap-4 items-center mb-1">
            <span className="font-medium text-sm ">{comment?.user?.display_name}</span>{' '}
            <p className="text-[0.75rem] text-gray-500">{formattedTimeAgo}</p>
          </div>
          <div className="flex gap-4 items-center">
            <div className="flex flex-col gap-1">
              {comment?.image && <Image src={comment?.image} alt="comment-image" height={300} width={300} />}
              <div
                style={{
                  whiteSpace: 'pre-wrap',
                }}
                dangerouslySetInnerHTML={{ __html: comment.comment }}
                className="text-sm md:text-base py-2 px-3 bg-gray-100 shadow-md w-fit break-words"
              ></div>
            </div>
            <div className="flex flex-col gap-2 self-start">
              <Icons.reply onClick={handleIsReplying} />
              <Icons.report />
            </div>
          </div>
          <div className="flex justify-between text-gray-500 mt-2">
            <div className="flex gap-2 items-center cursor-pointer">
              <Icons.love />
              <span className="text-sm">2</span>
            </div>
          </div>
          {isReplying && (
            <div className="w-full mt-2">
              <CreateComment
                setFile={setFile}
                setText={setText}
                handleSubmit={onReplySubmit}
                reply={isReplying}
              />
              <div className="flex w-full gap-8 mt-2 justify-end items-end">
                <button
                  type="button"
                  onClick={handleIsReplying}
                  className="py-1 px-2 hover:bg-gray-200 hover:rounded-2xl"
                >
                  cancel
                </button>
                <button onClick={onReplySubmit} className="py-1 px-2 hover:bg-gray-200 hover:rounded-2xl">
                  reply
                </button>
              </div>
            </div>
          )}

          {!noView && (
            <button onClick={handleFetchReplies} className="text-blue-500 font-medium mt-2" type="button">
              View Replies
            </button>
          )}
          {loadingReplies ? <LoadingCommentsSkeleton times={2} /> : null}
        </div>
      </div>
    </div>
  );
};

export default FeedComment;




export const RepliesList = ({ comments, itemId, parentId, handleFetchReplies }) => {
  console.log(comments)
  return (
    <div className="">
      {comments?.length > 0 ? (
        comments?.map((comment) => (
          <>
      
            <FeedComment

              key={comment.id} itemId={itemId} noView={true} comment={comment} parentId={parentId} />
          </>
        ))
      ) : (
        <p className="mb-2">No comments found!</p>
      )}
      {comments?.length > 0 && (
        <div className="w-full flex justify-center">
          <button className="" onClick={handleFetchReplies}>
            <Image src={'/svgs/add_circle.svg'} width={30} height={30} />
          </button>
        </div>
      )}
    </div>
  );
};
