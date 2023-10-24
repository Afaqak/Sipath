'use client';
import { VideoInfo, CommentsSection } from '@/components';
import ContentPlayer from '../../../components/podcast/reactPlayer';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { resetComments, setComments } from '@/features/comments/commentSlice';
import useAxiosPrivate from '@/hooks/useAxiosPrivate';
import { useDispatch } from 'react-redux';

const WatchVideo = ({ session }) => {
  const [primaryComments] = useState([]);
  const [video, setVideo] = useState({});
  const dispatch = useDispatch();
  const axios = useAxiosPrivate();
  const searchParams = useSearchParams();
  const id = searchParams.get('id');

  useEffect(() => {
    console.count('times');
    dispatch(resetComments());
    async function getComments() {
      const response = await axios.get(`/assets/video/${id}/comments?limit=10&set=0&order=desc`);
      console.log(response.data, 'from video');

      dispatch(setComments(response.data.comments));
    }
    getComments();
  }, []);

  useEffect(() => {
    const getVideo = async function () {
      const response = await axios.get(`/assets/video/${id}`, {
        headers: {
          Authorization: `Bearer ${session.token}`,
        },
      });
      setVideo(response.data);
      console.log(response.data, '{video}');
    };
    getVideo();
  }, []);

  return (
    <div className="">
      <div className="grid grid-cols-1 lg:grid-cols-8">
        <div className="live-message col-span-5 relative lg:my-8 px-4 lg:px-0 lg:pl-8">
          <ContentPlayer noPremium={true} id={id} token={session?.token} />
          <VideoInfo type={'solovideo'} video={video} setVideo={setVideo} token={session?.token} />
          <div className="bg-white p-4 hidden lg:block mb-4 mt-4 rounded-md shadow-md">
            <CommentsSection primaryComments={primaryComments} />
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
  const id = params.get('id');
  useEffect(() => {
    const fetchVideos = async () => {
      setLoading(true);
      try {
        const response = await axios.get('/assets/videos');
        setVideos(response.data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    fetchVideos();
  }, []);

  console.log(videos, '{videos}');
  return (
    <div className="mt-8 relative lg:px-8 px-4 overflow-y-scroll col-span-3 overflow-hidden live-message">
      {videos.map((video, index) => {
        return <NextVideo video={video} key={index} />;
      })}

      <div className="lg:hidden my-8">{/* <CommentsSection /> */}</div>
    </div>
  );
};

let NextVideo = ({ video }) => {
  return (
    <div>
      <div className="p-3 flex gap-4 bg-white rounded-md shadow-md mb-4">
        <div>
          <Image
            src={video?.thumbnail}
            width={200}
            height={200}
            className="object-cover h-32 rounded-md"
            alt="demo-3"
          />
        </div>
        <div className="flex flex-col justify-evenly text-sm">
          <h1 className="font-semibold">{video?.title}</h1>
          <div>{video['user.display_name'] && video['user.display_name']}</div>
          <h2 className="font-extrabold gap-1 flex items-center">
            4.7 <Image src="/svgs/star.png" className="" width={24} height={24} alt="star" />
          </h2>
          <div className="font-semibold text-[#616161] text-[0.70rem] whitespace-nowrap">
            <span>24K Views</span> . <span>2 months</span>
          </div>
        </div>
      </div>
    </div>
  );
};
