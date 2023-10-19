'use client';
import {
  ContentPlayer,
  VideoInfo,
  CreateComment,
  VideoComments,
  PlaylistSection,
} from '@/components';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import useAxiosPrivate from '@/hooks/useAxiosPrivate';
import { useParams } from 'next/navigation';
const PlaylistVideo = ({ session }) => {
  const params = useParams();
  const [sections, setSections] = useState([]);
  const [buttonStates, setButtonStates] = useState({});
  const [videosBySection, setVideosBySection] = useState({});
  const [videoId, setVideoId] = useState(0);
  const { data: user } = useSession();
  const axios = useAxiosPrivate();
  const toggleButton = (sectionId) => {
    setButtonStates((prevState) => ({
      ...prevState,
      [sectionId]: !prevState[sectionId],
    }));
  };
  console.log(videoId);
  const handleDisplayVideos = async (sectionId) => {
    try {
      console.log('try');
      if (!videosBySection[sectionId]) {
        console.log(sectionId, 'sid');
        toggleButton(sectionId);
        console.log(buttonStates);
        const response = await axios.get(`/courses/${params?.course}/sections/${sectionId}`, {
          headers: {
            Authorization: `Bearer ${session?.token}`,
          },
        });
        console.log(response.data, 'resoibse');
        const updatedVideosBySection = { ...videosBySection };
        updatedVideosBySection[sectionId] = response.data.videos;
        setVideosBySection(updatedVideosBySection);
      } else {
        toggleButton(sectionId);
      }
    } catch (err) {
      console.log(err);
    } finally {
      // setTimeout(() => {
      //   setLoadingStates((prevLoadingSections) => {
      //     const updatedLoadingSections = [...prevLoadingSections];
      //     updatedLoadingSections[sectionId] = false;
      //     return updatedLoadingSections;
      //   });
      // }, 1000);
    }
  };
  useEffect(() => {
    const fetchSections = async () => {
      const response = await axios.get(`/courses/${params?.course}/sections`, {
        headers: {
          Authorization: `Bearer ${session?.token}`,
        },
      });

      setSections(response.data.sections);
      setButtonStates(new Array(response.data.sections.length).fill(false));

      if (response.data.sections.length > 0) {
        const firstSectionId = response.data.sections[0].id;
        toggleButton(firstSectionId);

        await handleDisplayVideos(firstSectionId);
        setButtonStates((prevButtonStates) => {
          const updatedButtonStates = { ...prevButtonStates };
          updatedButtonStates[firstSectionId] = true;
          return updatedButtonStates;
        });
        console.log(buttonStates);
      }
    };

    fetchSections();
  }, []);

  return (
    <div className="">
      <div className="grid grid-cols-1 lg:grid-cols-8">
        <div className="live-message col-span-5 relative lg:my-8 px-4 lg:px-0 lg:pl-8">
          <ContentPlayer noPremium={true} />
          <VideoInfo />
          {/* Render the Comments component for large screens */}
          <div className="hidden lg:block">{/* <VideoComments /> */}</div>
        </div>

        <div className="mt-8 relative lg:px-8 px-4 overflow-y-scroll col-span-3 overflow-hidden live-message">
          <div>
            {sections.map((section, index) => (
              <PlaylistSection
                onClick={() => handleDisplayVideos(section?.id)}
                index={index}
                key={section.id}
                setVideoId={(id) => setVideoId(id)}
                videos={videosBySection[section?.id]}
                sectionTitle={section?.name}
                sectionDuration={section?.subject}
              />
            ))}
          </div>

          <div className="lg:hidden my-8">{/* <VideoComments /> */}</div>
        </div>
      </div>
    </div>
  );
};

export default PlaylistVideo;

let NextVideo = ({ img }) => {
  return (
    <div className="bg-white ">
      <div className="p-3 flex gap-4 bg-white rounded-md shadow-md mb-4">
        <div>
          <Image
            src={img}
            width={200}
            height={200}
            className="object-cover h-32 rounded-md"
            alt="demo-3"
          />
        </div>
        <div className="flex flex-col justify-evenly text-sm">
          <h1 className="font-semibold">Video title goes here</h1>
          <div>owner name </div>
          <h2 className="font-extrabold gap-1 flex items-center">
            4.7 <Image src="/svgs/star.png" alt="star" width={24} height={24} />
          </h2>
          <div className="font-semibold text-[#616161] text-[0.70rem] whitespace-nowrap">
            <span>24K Views</span> . <span>2 months</span>
          </div>
        </div>
      </div>
    </div>
  );
};
