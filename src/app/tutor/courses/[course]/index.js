'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import useAxiosPrivate from '@/hooks/useAxiosPrivate';
import { useRouter } from 'next/navigation';
import { DeleteModal, LoadingSkeletons, Icons, formatTimeAgo } from '@/components';
import { errorToast, successToast } from '@/utils/toasts';
import { Button } from '@/components/ui/button';
import UserAvatar from '@/components/common/userAvatar';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { VideoEditModal } from '@/components/video/editVideoModal';
import { useSession } from 'next-auth/react';
import { useParams } from 'next/navigation';

const CoursePage = ({ session }) => {
  const axios = useAxiosPrivate();
  const params = useParams();
  const router = useRouter();
  const { data: user } = useSession();
  const [sections, setSections] = useState([]);
  const [videosBySection, setVideosBySection] = useState({});
  const [buttonStates, setButtonStates] = useState({});
  const [loadingStates, setLoadingStates] = useState([]);
  const [course, setCourse] = useState({});
  console.log(videosBySection);
  useEffect(() => {
    const fetchSections = async () => {
      const response = await axios.get(`/courses/${params?.course}/sections`, {
        headers: {
          Authorization: `Bearer ${session?.token}`,
        },
      });
      console.log(response.data);
      setSections(response.data.sections);
      setCourse(response.data.course);
      setLoadingStates(new Array(response.data.sections.length).fill(false));
      setButtonStates(new Array(response.data.sections.length).fill(false));
    };
    fetchSections();
  }, []);
  console.log(loadingStates, 'lS');
  console.log(sections, 'sections');

  const toggleButton = (sectionId) => {
    setButtonStates((prevState) => ({
      ...prevState,
      [sectionId]: !prevState[sectionId],
    }));
  };

  const handleDisplayVideos = async (sectionId) => {
    try {
      if (!videosBySection[sectionId]) {
        toggleButton(sectionId);
        setLoadingStates((prevLoadingSections) => {
          const updatedLoadingSections = [...prevLoadingSections];
          updatedLoadingSections[sectionId] = true;
          return updatedLoadingSections;
        });

        const response = await axios.get(`/courses/${params?.course}/sections/${sectionId}`, {
          headers: {
            Authorization: `Bearer ${session?.token}`,
          },
        });
        console.log(response.data);
        const updatedVideosBySection = { ...videosBySection };
        updatedVideosBySection[sectionId] = response.data.videos;
        setVideosBySection(updatedVideosBySection);
      } else {
        toggleButton(sectionId);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setTimeout(() => {
        setLoadingStates((prevLoadingSections) => {
          const updatedLoadingSections = [...prevLoadingSections];
          updatedLoadingSections[sectionId] = false;
          return updatedLoadingSections;
        });
      }, 1000);
    }
  };

  return (
    <div className="py-8 overflow-visible relative w-[90%] md:w-[85%] mx-auto">
      <div className="flex justify-between mb-8 items-center">
        <div className="flex gap-2">
          <h1 className="text-4xl capitalize font-semibold">{course?.name}</h1>
        </div>
        {
          <div className="flex gap-2">
            {user?.tutor?.tutor_id === course?.tutor_id && (
              <Button
                onClick={() => router.push(`/tutor/courses/${params?.course}/edit`)}
                variant="outline"
                className="flex gap-2 transform active:-translate-y-1 border-black items-center"
              >
                <Icons.edit className="w-4 h-4 stroke-[#616161]" />
                Edit Course
              </Button>
            )}
            <Button
              onClick={() => router.push(`/courses/${params?.course}?id=${sections[0]?.videos[0]}`)}
              variant="outline"
              className="flex gap-2 transform active:-translate-y-1 border-subcolor2 items-center"
            >
              <Icons.edit className="w-4 h-4 stroke-[#616161]" />
              View Course
            </Button>
          </div>
        }
      </div>
      <div className="rounded-md">
        {course.thumbnail && (
          <Image
            src={course?.thumbnail}
            width={500}
            height={500}
            className="mb-4 rounded-md"
            alt="course-thumbnail"
          />
        )}
      </div>
      {sections &&
        sections.map((section, sectionIndex) => (
          <div className="" key={section.id}>
            <header
              onClick={() => handleDisplayVideos(section?.id)}
              className={`cursor-pointer flex flex-col lg:flex-row justify-between border bg-white p-4 shadow-md ${
                buttonStates[section?.id] ? 'mb-2 ' : ''
              }`}
            >
              <div className="mb-2 flex justify-between w-full items-center lg:mb-0">
                <div className="flex gap-4 ">
                  <Icons.expantArrow
                    className={`w-[20px] h-[20px] transform transition-all duration-300 ease-in-out ${
                      buttonStates[section?.id] ? ' rotate-180' : 'rotate-0'
                    }`}
                  />
                  <h2 className="font-semibold text-[1.04rem] ">
                    {`Section ${sectionIndex + 1} : ${section?.name}`}
                  </h2>
                </div>
                <p className="text-sm text-gray-600">Duration: 10:00</p>
              </div>
            </header>

            {buttonStates[section?.id] ? (
              loadingStates[section?.id] ? (
                <div className={` ${buttonStates[section?.id] ? 'mb-2 ' : ''}`}>
                  <LoadingSkeletons times={3} />
                </div>
              ) : (
                <div
                  className={`grid md:grid-cols-2 lg:grid-cols-3 gap-4 ${
                    buttonStates[section?.id] ? 'mb-2 ' : ''
                  }`}
                >
                  {videosBySection[section?.id] &&
                    videosBySection[section?.id]?.map((video, videoIndex) => {
                      return (
                        <VideoItem
                          setVideosBySection={setVideosBySection}
                          sectionId={section?.id}
                          courseId={params?.course}
                          key={video?.id}
                          video={video}
                          videosBySection={videosBySection}
                        />
                      );
                    })}
                </div>
              )
            ) : null}
          </div>
        ))}
    </div>
  );
};

export default CoursePage;

export const VideoItem = ({ video, sectionId, courseId, setVideosBySection, videosBySection }) => {
  const [open, setOpen] = useState(false);
  const [deletOpen, setDeleteOpen] = useState(false);
  const axios = useAxiosPrivate();
  const { data: user } = useSession();
  const [toggleMenu, setToggleMenu] = useState(false);
  const onDeleteSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.delete(
        `/courses/${courseId}/sections/${sectionId}/videos/${video?.id}`
      );
      errorToast('Video Deleted Successfully');
      console.log(response, 'response delete video');
      if (response.status === 200) {
        const response = await axios.get(`/courses/${courseId}/sections/${sectionId}`);
        console.log(response.data);
        const updatedVideosBySection = { ...videosBySection };
        updatedVideosBySection[sectionId] = response.data.videos;
        setVideosBySection(updatedVideosBySection);
      }
    } catch (err) {
      console.log(err);
    }
  };
  console.log(video, 'video');
  return (
    <div className="h-[20rem] relative block w-full p-4 bg-white shadow-md rounded-md">
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
        {video?.thumbnail ? (
          <Image
            src={video?.thumbnail}
            alt={'thumbnail'}
            width={300}
            height={200}
            className="rounded-md object-cover w-full h-[11.2rem]"
          />
        ) : (
          <div className="rounded-md object-cover w-full h-[11.2rem]"></div>
        )}
      </Link>
      <div className="mt-3 flex gap-2 w-full">
        <UserAvatar user={{ image: user?.profile_image }} />
        <div className="w-full group">
          <div className="w-full flex justify-between items-start">
            <Link
              href={`/videos/watch?id=${video?.id}`}
              className="text-[1.10rem] block font-[550] mb-[0.20rem]  "
            >
              <span className="line-clamp-2">
                {/* {video?.title} */}
                {video?.title}
              </span>
            </Link>
            <div className="relative">
              <div className="cursor-pointer">
                <Icons.elipsis
                  onClick={() => setToggleMenu(!toggleMenu)}
                  className="h-[1.25rem] text-gray-500 w-[1.25rem] "
                />
              </div>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: toggleMenu ? 1 : 0, y: toggleMenu ? 0 : 10 }}
                transition={{ type: 'spring', stiffness: 100 }}
                className="bg-white rounded-md shadow-md w-28 absolute border top-8 right-0"
              >
                <motion.ul className="flex flex-col divide-y cursor-pointer text-sm">
                  <motion.li>
                    <p
                      className="flex items-center gap-6 py-1 px-2 hover:bg-[#d1d1d1]"
                      onClick={() => setOpen(true)}
                    >
                      <Icons.edit className="h-4 w-4 stroke-[#616161]" />
                      Edit
                    </p>
                  </motion.li>
                  <motion.li
                    onClick={() => setDeleteOpen(true)}
                    className="flex items-center gap-6 py-1 px-2 hover:bg-[#d1d1d1]"
                  >
                    <Icons.trash className="h-4 w-4 " />
                    Delete
                  </motion.li>
                </motion.ul>
              </motion.div>
            </div>
          </div>
          <div className="flex items-center text-sm gap-2 text-gray-700">
            <span>authors</span>
          </div>
          <div className="flex items-center text-sm gap-2 text-gray-700">
            <span>{video?.views} views</span>
            <span>&bull;</span>
            <span>{formatTimeAgo(video.createdAt)}</span>
            <span>&bull;</span>
            <div className="flex items-center">
              {video?.rating}{' '}
              <span>
                <Icons.rating />
              </span>
            </div>
          </div>
        </div>
      </div>
      <DeleteModal
        text={video?.title}
        onDeleteSubmit={onDeleteSubmit}
        isOpen={deletOpen}
        setIsOpen={setDeleteOpen}
      />
      <VideoEditModal
        videosBySection={videosBySection}
        setVideosBySection={setVideosBySection}
        courseId={courseId}
        sectionId={sectionId}
        video={video}
        isEdit={true}
        isOpen={open}
        setIsOpen={setOpen}
      />
    </div>
  );
};
