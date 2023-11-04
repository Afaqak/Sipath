'use client';
import {
  VideoInfo,
  PlaylistSection,
  CommentsSection,
  Icons
} from '@/components';
import ContentPLayer from '../../../components/podcast/reactPlayer';
import Image from 'next/image';
import { useEffect, useState, useCallback } from 'react';
import useAxiosPrivate from '@/hooks/useAxiosPrivate';
import { useParams, useRouter, usePathname, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';

const PlaylistVideo = ({ session }) => {
  const params = useParams();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [sections, setSections] = useState([]);
  const [buttonStates, setButtonStates] = useState({});
  const [enrollments, setEnrollments] = useState([])
  const [sectionLoading, setSectionLoading] = useState(false)
  const [videosBySection, setVideosBySection] = useState({});
  const [videoId] = useState({});
  const axios = useAxiosPrivate();
  console.log(videosBySection)

  const createQueryString = useCallback(
    (name, value) => {
      const params = new URLSearchParams(searchParams);
      params.set(name, value);

      return params.toString();
    },
    [videoId]
  );

  const toggleButton = (sectionId) => {
    setButtonStates((prevState) => ({
      ...prevState,
      [sectionId]: !prevState[sectionId],
    }));
  };

  const handleDisplayVideos = async (sectionId) => {
    try {

      if (!videosBySection[sectionId]) {
        const response = await axios.get(`/courses/${params?.course}/sections/${sectionId}`, {
          headers: {
            Authorization: `Bearer ${session?.token}`,
          },
        });
        const updatedVideosBySection = { ...videosBySection };
        updatedVideosBySection[sectionId] = response.data?.videos;
        setVideosBySection(updatedVideosBySection);
        toggleButton(sectionId);
      } else {
        toggleButton(sectionId);
      }
    } catch (err) {
      console.log(err);
    } finally {

    }
  };

  useEffect(() => {

    const fetchEnrollments = async () => {
      try {
        const enrollmentsResponse = await axios.get('/courses/enrollments', {
          headers: {
            Authorization: `Bearer ${session?.token}`,
          },
        });

        const enrollments = enrollmentsResponse.data?.enrollments;
        setEnrollments(enrollments)
        console.log(enrollments, 'Enrollments');

        fetchSections();
      } catch (err) {
        console.log(err);
      }
    }


    const fetchSections = async () => {
      setSectionLoading(true)
      try {
        const sectionsResponse = await axios.get(`/courses/${params?.course}/sections`, {
          headers: {
            Authorization: `Bearer ${session?.token}`,
          },
        });

        setSections(sectionsResponse.data.sections);
        console.log(sectionsResponse.data?.sections, "{before}");

        if (sectionsResponse.data?.sections.length > 0) {
          const firstSectionId = sectionsResponse?.data?.sections[0]?.id;
          console.log(firstSectionId, "{firstSID}");

          const firstSectionResponse = await axios.get(
            `/courses/${params?.course}/sections/${firstSectionId}`,
            {
              headers: {
                Authorization: `Bearer ${session?.token}`,
              },
            }
          );
          console.log(firstSectionResponse.data?.videos, "{all videos}")
          const updatedVideosBySection = { ...videosBySection };
          updatedVideosBySection[firstSectionId] = firstSectionResponse.data.videos;
          setVideosBySection(updatedVideosBySection);
          toggleButton(firstSectionId);
          router.push(pathname + '?' + createQueryString('id', firstSectionResponse.data.videos[0]?.id));
        }
      } catch (err) {
        console.log(err)
      } finally {
        setSectionLoading(false)
      }
    };

    fetchEnrollments()

  }, []);



  return (
    <>
      <div className="">
        <div className='px-8 w-full flex justify-end mt-4'>
        <Button onClick={()=>router.push(`/tutor/courses/${params?.course}`)} className="">Set Enrollment</Button>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-8">
          <div className="live-message col-span-5 relative lg:my-8 px-4 lg:px-0 lg:pl-8">
            <ContentPLayer id={videoId?.id} noPremium={true} token={session?.token} />
            <VideoInfo video={videoId} token={session?.token} />
            {/* Render the Comments component for large screens */}
            <div className="hidden lg:block">
              {' '}
              <CommentsSection />
            </div>
          </div>

          <div className="mt-8 relative lg:px-8 px-4 overflow-y-scroll col-span-3 overflow-hidden live-message">
            <div>

              {
                sections.length > 0 ?
                  sections.map((section, index) => (
                    <PlaylistSection
                      onClick={() => handleDisplayVideos(section?.id)}
                      index={index}
                      token={session?.token}
                      key={section.id}
                      enrollments={enrollments}
                      setEnrollments={setEnrollments}
                      isButtonToggled={buttonStates[section.id]}
                      toggleButton={() => toggleButton(section.id)}
                      setVideoId={(id) => {
                        router.push(pathname + '?' + createQueryString('id', id));
                      }}
                      videos={videosBySection[section?.id]}
                      sectionTitle={section?.name}
                      sectionDuration={section?.subject}
                    />
                  )) :
                  <div className='min-h-[60vh] flex items-center justify-center'>
                    <div className='animate-spin'>
                      <Icons.Loader2 stroke="black" width="36" height="36" className="stroke-black w-6 h-6" />
                    </div>
                  </div>
              }
            </div>

            <div className="lg:hidden my-8">
              <CommentsSection />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PlaylistVideo;

