'use client';
import { VideoInfo, CommentsSection, Icons } from '@/components';
import ContentPlayer from '@/components/common/reactPlayer';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'next/navigation';
import useAxiosPrivate from '@/hooks/useAxiosPrivate';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { useFormattedTimeAgo } from '@/hooks/useFormattedTimeAgo';

const WatchVideo = ({video}) => {
  const [selectedVideo, setSelectedVideo] = useState(video);
  const [isClient,setIsClient]=useState(true)
  const axios = useAxiosPrivate();
  const params = useParams();

  const { data: session } = useSession()
  const [followedUser, setFollowedUser] = useState(false)

  const checkFollowUser = async (id) => {
    try {
      const response = await axios.get(
        `/users/follow/status/${id}`,
  
        {
          headers: {
            Authorization: `Bearer ${session?.token}`,
          },
        }
      );
      console.log(response.data)
      if (response?.data?.is_following) {
        setFollowedUser(true)
      }
      else {
        setFollowedUser(false)
      }

    } catch (error) {
      console.log(error)
    }

  }

  useEffect(()=>{
    setIsClient(false)
  },[])


  useEffect(() => {
    checkFollowUser(video?.author_id)
  }, [video?.author_id]);

  if(isClient) return null

  return (
    <div className="">
      <div className="grid grid-cols-1 lg:grid-cols-8">
        <div className="live-message col-span-5 relative lg:my-8 px-4 lg:px-0 lg:pl-8">
          <ContentPlayer noPremium={true} token={session?.token} selectedVideo={selectedVideo} />
          <VideoInfo followedUser={followedUser} setFollowedUser={setFollowedUser} type={'solovideo'} selectedVideo={selectedVideo} setSelectedVideo={setSelectedVideo} token={session?.token} />
          <div className="bg-white p-4 hidden lg:block mb-4 mt-4 rounded-md shadow-md">
            <CommentsSection />
          </div>
        </div>

        <ListSection />
      </div>
    </div>
  );
};

export default WatchVideo;

const ListSection = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(false);
  const params = useSearchParams();
  const axios = useAxiosPrivate()

  useEffect(() => {
    const fetchVideos = async () => {
      setLoading(true);
      try {
        const response = await axios.get('/assets/videos?type=all');
        setVideos(response.data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    fetchVideos();
  }, []);

  return (
    <>
      <div className="mt-8 relative lg:px-8 px-4 overflow-y-scroll col-span-3 overflow-hidden live-message">


        {videos.map((video, index) => {
          return <NextVideo video={video} key={index} />;
        })}

        <div className="lg:hidden my-8"><CommentsSection /></div>
      </div>
    </>
  );
};

let NextVideo = ({ video }) => {
  const formattedTimeAgo = useFormattedTimeAgo(video?.createdAt)
  const params = useSearchParams()
  const id = params.get('id');
  return (
    <Link className='block' href={`/videos/watch/${video?.id}`}>
      <div className={`p-3 flex gap-4 h-36 max-h-40 bg-white rounded-md shadow-md mb-4 ${+video?.id === +id && "bg-stone-100"}`}>
        <div>
          {video?.thumbnail &&
            <Image
              src={video?.thumbnail}
              width={200}
              height={200}
              className="object-cover h-full rounded-md"
              alt="demo-3"
            />
          }
        </div>
        <div className="flex flex-col justify-evenly text-sm">
          <h1 className="font-semibold">{video?.title}</h1>
          <div>{video['user.display_name'] && video['user.display_name']}</div>
          <h2 className="font-extrabold gap-1 flex items-center">
            {video?.rating} <Image src="/svgs/star.png" className="" width={24} height={24} alt="star" />
          </h2>
          <div className="font-semibold text-[#616161] text-[0.70rem] whitespace-nowrap">
            <span>{video?.views} Views</span> . <span>{video && formattedTimeAgo}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};
