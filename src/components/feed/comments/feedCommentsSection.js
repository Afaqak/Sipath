
import { useState,useEffect } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"
import { useDispatch,useSelector } from "react-redux"
import { FeedRepliesList } from "@/components/feed/comments/feedRepliesList"
import useAxiosPrivate from "@/hooks/useAxiosPrivate"
import { fetchCommentsAsync ,addComment,addMoreComments,selectCommentsByPostId} from "@/features/feedComments/feedCommentSlice"
import { warningToastNoAction ,warningToast} from "@/utils/toasts"
import { FeedComment } from "@/components/feed/comments/feedComment"
import { CustomEditor } from "@/components/common/customEditor"



export const CommentSectionFeed = ({ itemId, type }) => {
    const dispatch = useDispatch()
    const { data: user } = useSession()
    const axios = useAxiosPrivate()
    const comments = useSelector((state) => selectCommentsByPostId(state, itemId));
    const [commentReplies, setCommentReplies] = useState({})
    const [replyView, setReplyView] = useState({});
    const router = useRouter()
    const [limit, setLimit] = useState(0)
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
          dispatch(fetchCommentsAsync({ postId: itemId, token: user?.token }))
  
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
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/posts/${itemId}/comments/${commentId}?limit=10&set=${limit + 10}&order=asc`
        );
  
        setLimit(limit + 10)
  
        dispatch(addMoreReplies({ postId: itemId, commentId, moreReplies: response.data?.comments }));
      } catch (error) {
        console.error(error);
      }
    };
  
  
  
    const onCommentSubmit = async ({ text, file, setData }) => {
  
      try {
        if (!user?.token) {
          return warningToast("Login to Comment", () => router.push('/sign-in'))
        }
  
  
        if (!text && !file) {
          return warningToastNoAction("You must specify either text or image to comment!");
        }
  
        const formdata = new FormData();
        formdata.append('comment', text);
        formdata.append('image', file);
        console.log(file)
  
        const response = await axios.post(`/posts/${itemId}/comments`, formdata, {
          headers: {
            Authorization: `Bearer ${user?.token}`,
            'Content-Type': 'multipart/form-data',
          }
        })
  
        if (setData && typeof setData === 'function') {
          setData()
        }
        dispatch(addComment({ postId: itemId, comment: response?.data?.comment }))
  
      } catch (error) {
        console.error(error);
      } finally {
      }
    };
  
  
  
  
    return (
      <div className='flex flex-col gap-4'>
        <CustomEditor onCommentSubmit={onCommentSubmit} />
        {/* <CreateComment setText={setText} setFile={setFile} handleSubmit={onCommentSubmit} /> */}
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
                  {comment && replyView[comment?.id] && (
  
                    <div>
                      <FeedRepliesList
                        itemId={itemId}
                        handleFetchReplies={() => loadMoreReplies(comment?.id)}
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