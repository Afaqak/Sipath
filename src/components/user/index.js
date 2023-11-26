import React,{ useEffect, useState } from "react";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import { errorToast,successToast } from "@/utils/toasts";
import { useRouter } from "next/navigation";
import { setBooks } from "@/features/book/bookSlice";
import { VideoItemFeed,DeleteFeedModal,BookSkeleton,VideoItem, Icons, Book,Feed} from "@/components";


export const MyFeed = ({ session }) => {

    const [feeds, setFeeds] = useState([]);
    const axios = useAxiosPrivate();
    const [open, setOpen] = useState(false);
    const [selectedPostId, setSelectedPostId] = useState(null);

    const fetchUserFeed = async () => {
      try {
        const response = await axios.get(`/users/feed?limit=10`, {
          headers: {
            Authorization: `Bearer ${session?.token}`,
          },
        });
  
        setFeeds(response.data?.user_feed);
      } catch (err) {
        console.log(err);
      }
    };

    useEffect(() => {
      fetchUserFeed();
    }, []);
  
    const openDeleteModal = (id) => {
      setOpen(true);
    };
  
    const handleDeletePost = async () => {
      try {
  
        await axios.delete(`/posts/${selectedPostId}`, {
          headers: {
            'Authorization': `Bearer ${session?.token}`,
          },
        });
  
        fetchUserFeed()
      } catch (error) {
        console.error('Error deleting post:', error);
      } finally {
        setOpen(false);
      }
    };
  
  
    return (
        <div className="mx-auto grid grid-cols-1 place-content-center  my-6 flex-col gap-6">
          {feeds.map((feedItem, index) => {
            return (
              <React.Fragment key={feedItem?.id || index}>
                {feedItem.type === 'post' ? (
                <div className="">
                <Feed
                  style="md:w-[70%] w-[90%] lg:w-[50%]"
                  key={feedItem?.id}
                  type={'post'}
                  feed={{
                    user: {
                      display_name: feedItem && feedItem['user.display_name'],
                      profile_image: feedItem && feedItem['user.profile_image'],
                      rating: feedItem && feedItem['user.rating'],
                      isTutor: feedItem && feedItem['user.isTutor'],
                      id: feedItem['user.id'] && feedItem['user.id'],
                    },
                    ...feedItem,
                  }}
                  user={session?.user}
                  openModal={() => {
                    openDeleteModal(feedItem?.id);
                    setSelectedPostId(feedItem?.id);
                  }}
                />
                </div>
                ) : (
                  <div className="w-[70%] mx-auto">
                  <VideoItemFeed key={feeds[index]?.id} video={feeds[index]} />
                   
                  </div>
                )}
              </React.Fragment>
            );
          })}
          <DeleteFeedModal open={open} setOpen={setOpen} onDelete={handleDeletePost} />
        </div>
    
    );
  };
  
  
  
  export const MyVideos = ({ token='',url }) => {
    const axios = useAxiosPrivate();
    const [videos, setVideos] = useState([]);
    const [isEdit, setIsEdit] = useState(false);



  
    const fetchTutorVideos = async () => {
        try {
          const response = await axios.get(url, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setVideos(response.data);
        } catch (err) {
          console.log(err);
        }
      };

      useEffect(()=>{
        fetchTutorVideos()
      },[])

    const handleSetUpdateVideos = (updatedVideo) => {
        fetchTutorVideos()
    };
    const setDeletedVideo = async (id,setOpen) => {
      try {
 
        const response = await axios.delete(`/assets/videos/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.status === 200) {
          successToast('Video deleted!');
          fetchTutorVideos()
     
        }
      } catch (err) {
        errorToast('Error deleting the video!');
      }
      
    };
    return (
      <div className=" py-8">
        <div className="flex justify-end w-full">
          {videos && videos?.length > 0 && (
            <button
              type="button"
              onClick={() => setIsEdit(!isEdit)}
              className={`w-10 h-4 rounded-2xl bg-white flex shadow-[inset_1px_3px_7px_rgba(0,0,0,0.2)] items-center transition duration-300 focus:outline-none text-subcolor`}
            >
              <div
                className={`w-6 h-6 relative rounded-full flex items-center justify-center  transition duration-300 transform p-1 ${isEdit ? 'translate-x-full  bg-subcolor3' : ' -translate-x-2 bg-subcolor'
                  }`}
              >
                {isEdit ? (
                  <Icons.cross className=" stroke-white h-2 w-2" />
                ) : (
                  <Icons.editPencil className=" stroke-white h-3 w-3" />
                )}
              </div>
            </button>
          )}
        </div>
        <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-6 mt-4">
          {videos.map((video, index) => (
            <VideoItem
              video={video}
              setDeletedVideo={setDeletedVideo}
              setVideos={handleSetUpdateVideos}
              isEdit={isEdit}
              key={index}
            />
          ))}
        </div>
      </div>
    );
  };
  
  export const Mybooks = ({url,user ,token,isProfile}) => {
    const axios = useAxiosPrivate();
    const dispatch = useDispatch();
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const books = useSelector((state) => state.books?.books);
    const fetchBooks = async () => {
      try {
        setLoading(false);
        const response = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }); 


        dispatch(setBooks([]))
        dispatch(setBooks(response.data));
      } catch (err) {
        console.log(err);
      }
    };
    useEffect(() => {
      fetchBooks();
    }, []);

  
  
  
    return (
      <div>
        <div className="flex w-full justify-end">
          <Button
            onClick={() => router.push('tutor/add-book')}
            variant="outline"
            type="button"
            className={`rounded-2xl mt-4 text-white bg-subcolor flex gap-2 items-center justify-center shadow-[inset_1px_3px_7px_rgba(0,0,0,0.2)] `}
          >
            <span>+</span> Add Book
          </Button>
        </div>
        {loading ? (
          <BookSkeleton times={6} />
        ) : (
          <div className="grid mt-6 gap-4 grid-cols-1 lg:grid-cols-2">
            {books &&
              books?.map((book, index) => (
                <Book 
                token={token}
                isProfile={isProfile} 
                book={book}
                user={user}
                 key={index} />
              ))}
          </div>
        )}
      </div>
    );
  };
  