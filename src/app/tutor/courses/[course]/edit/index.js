'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import useAxiosPrivate from '@/hooks/useAxiosPrivate';
import { DeleteModal, LoadingSkeletons, Video, Icons, formatTimeAgo } from '@/components';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import UserAvatar from '@/components/common/userAvatar';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { VideoEditModal } from '@/components/video/editVideoModal';
import { errorToast, successToast } from '@/utils/toasts';
import { useRouter, useParams } from 'next/navigation';

const EditPage = ({ session }) => {
  const axios = useAxiosPrivate();
  const params = useParams();
  const [sections, setSections] = useState([]);
  const [sectionOpen, setSectionOpen] = useState(false);
  const [videosBySection, setVideosBySection] = useState({});
  const [buttonStates, setButtonStates] = useState({});
  const [open, setOpen] = useState(false);
  const [openAddVideo, setOpenAddVideo] = useState(false);
  const router = useRouter();
  const [sectionName, setSectionName] = useState('');
  const [loadingStates, setLoadingStates] = useState([]);
  console.log(videosBySection);
  useEffect(() => {
    const fetchSections = async () => {
      const response = await axios.get(`/courses/${params?.course}/sections`, {
        headers: {
          Authorization: `Bearer ${session?.token}`,
        },
      });
      setSections(response.data.sections);
      setLoadingStates(new Array(response.data.sections.length).fill(false));
      setButtonStates(new Array(response.data.sections.length).fill(false));
    };
    fetchSections();
  }, []);

  const toggleButton = (sectionId) => {
    setButtonStates((prevState) => ({
      ...prevState,
      [sectionId]: !prevState[sectionId],
    }));
  };

  const handleAddSection = async () => {
    try {
      if (!sectionName) return;
      const response = await axios.post(
        `/courses/${params?.course}/section`,
        {
          name: sectionName,
        },
        {
          headers: {
            Authorization: `Bearer ${session?.token}`,
          },
        }
      );
      console.log(response.data);
      if (response.status === 200) {
        successToast('Section Added Successfully!', '#1850BC');
        const response = await axios.get(`/courses/${params?.course}/sections`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(response.data, 'after sec added');
        setSectionName('');
        setSections(response.data.sections);
      }
    } catch (err) {
      errorToast('An error occured!');
    } finally {
      setSectionOpen(false);
    }
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

  const onDeleteCourse = async () => {
    try {
      const response = await axios.delete(`/courses/${params.course}`, {
        headers: {
          Authorization: `Bearer ${session?.token}`,
        },
      });
      if (response.status === 200) {
        errorToast('Course Deleted', '#1850BC');
        setOpen(false);
        router.push('/tutor');
      }
      console.log(response.data);
    } catch (err) {
      console.log(err);
      errorToast('An error occured!', '#fb3c22');
    }
  };

  console.log(videosBySection, buttonStates);

  return (
    <div className="py-8 overflow-visible relative w-[90%] md:w-[85%] mx-auto">
      <div className="flex justify-between mb-8 items-center">
        <h1 className="text-4xl capitalize font-semibold">{params?.course}</h1>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => router.back()}
            className="flex gap-2 transform active:-translate-y-1 text-main border-main items-center"
          >
            <Icons.edit className="w-4 h-4 stroke-main" />
            Finish Editing
          </Button>
          <Button
            onClick={() => setOpen(true)}
            variant="outline"
            className="flex gap-2 transform active:-translate-y-1 text-subcolor2 border-subcolor2 items-center"
          >
            <Icons.trash className="w-4 h-4 stroke-subcolor2" />
            Delete Course
          </Button>
          <Button
            onClick={() => setSectionOpen(true)}
            variant="outline"
            className="flex gap-2 transform active:-translate-y-1 text-subcolor border-subcolor items-center"
          >
            <Image width={16} height={16} alt="add more" src={'/svgs/add_video.svg'} />
            New Section
          </Button>
        </div>
      </div>
      {sections.map((section, sectionIndex) => (
        <div className="" key={section.id}>
          <EditPageHeader
            openAddVideo={openAddVideo}
            setOpenAddVideo={setOpenAddVideo}
            section={section}
            videosBySection={videosBySection}
            sectionIndex={sectionIndex}
            token={session?.token}
            setVideosBySection={setVideosBySection}
            handleDisplayVideos={handleDisplayVideos}
            buttonStates={buttonStates}
            setSections={setSections}
            courseId={params.course}
          />

          {buttonStates[section?.id] ? (
            loadingStates[section?.id] ? (
              <div className={` ${buttonStates[section?.id] ? 'mb-2 ' : ''}`}>
                <LoadingSkeletons times={3} />
              </div>
            ) : (
              <div
                className={`grid md:grid-cols-2 gap-4 lg:grid-cols-3  ${
                  buttonStates[section?.id] ? 'mb-2 ' : ''
                }`}
              >
                {videosBySection[section?.id] &&
                  videosBySection[section?.id]?.map((video, videoIndex) => {
                    return (
                      <VideoItem
                        setVideosBySection={setVideosBySection}
                        sectionId={section?.id}
                        courseId={params.course}
                        token={session?.token}
                        key={video.id}
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
      <DeleteModal
        isOpen={open}
        setIsOpen={setOpen}
        message={'Do you reall want to delete this course?'}
        onDeleteSubmit={onDeleteCourse}
      />
      <SectionAddModal
        isOpen={sectionOpen}
        setIsOpen={setSectionOpen}
        sectionName={sectionName}
        setSectionName={setSectionName}
        handleAddSection={handleAddSection}
      />
    </div>
  );
};

export default EditPage;

function EditPageHeader({
  section,
  setSections,
  sectionIndex,
  handleDisplayVideos,
  setVideosBySection,
  buttonStates,
  courseId,
  videosBySection,
  openAddVideo,
  setOpenAddVideo,
  token,
}) {
  const [editMode, setEditMode] = useState(false);
  const axios = useAxiosPrivate();
  const [sectionName, setSectionName] = useState('');

  const onDeleteSection = async () => {
    try {
      const response = await axios.delete(`/courses/${courseId}/sections/${section?.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        const response = await axios.get(`/courses/${courseId}/sections`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setSections(response.data?.sections);
      }
      errorToast('Section Deleted');
      console.log(response.data);
    } catch (err) {
      console.log(err);
      errorToast('An error occured!');
    } finally {
      setEditMode(false);
    }
  };

  const onUpdateSection = async () => {
    try {
      if (!sectionName) return;
      const response = await axios.patch(
        `/courses/${courseId}/sections/${section?.id}`,
        {
          name: sectionName,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        const response = await axios.get(`/courses/${courseId}/sections`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setSections(response.data?.sections);
      }
      successToast('Section Updated!', '#1850BC');
      console.log(response.data);
      section.name = response.data?.section?.name;
    } catch (err) {
      console.log(err);
      errorToast('An error occured!', '#fb3c22');
    } finally {
      setEditMode(false);
    }
  };
  const [open, setOpen] = useState(false);

  return (
    <header
      className={`cursor-pointer flex flex-col lg:flex-row justify-between border bg-white h-[10vh] px-4 shadow-md ${
        buttonStates[section?.id] ? 'mb-2 ' : ''
      }`}
    >
      <div className="mb-2 flex justify-between w-full items-center lg:mb-0">
        <div className="flex gap-4  ">
          <Icons.expantArrow
            onClick={() => handleDisplayVideos(section?.id)}
            className={`w-[20px] h-[20px] transform transition-all duration-300 ease-in-out ${
              buttonStates[section?.id] ? ' rotate-180' : 'rotate-0'
            }`}
          />
          {editMode ? (
            <input
              type="text"
              value={sectionName}
              onChange={(e) => setSectionName(e.target.value)}
              className="shadow-[inset_2px_1px_6px_rgba(0,0,0,0.2)] rounded-md px-4 py-1 placeholder:text-sm border-none focus:outline-none"
            />
          ) : (
            <h2
              onClick={() => handleDisplayVideos(section?.id)}
              className="font-semibold text-[1.04rem] "
            >{`Section ${sectionIndex + 1} : ${section.name}`}</h2>
          )}
        </div>
        <motion.ul className="flex divide-x cursor-pointer text-sm">
          <motion.li>
            <p
              className="flex items-center gap-3 px-2 py-2 hover-bg-[#d1d1d1]"
              onClick={(e) => (editMode ? onUpdateSection(e) : setEditMode(!editMode))}
            >
              <Icons.edit className="h-4 w-4 stroke-[#616161]" />
              {editMode ? 'Finish Editing' : 'Edit'}
            </p>
          </motion.li>
          <motion.li
            onClick={() => setOpen(true)}
            className="flex items-center gap-3 px-2 py-2 hover-bg-[#d1d1d1]"
          >
            <Icons.trash className="h-4 w-4 " />
            Delete
          </motion.li>
          <motion.li
            onClick={() => setOpenAddVideo(true)}
            className="flex items-center gap-3 px-2 py-2 hover-bg-[#d1d1d1]"
          >
            <Icons.addVideo className="h-4 w-4  fill-main" />
            Add Video
          </motion.li>
        </motion.ul>
      </div>
      <VideoEditModal
        videosBySection={videosBySection}
        setVideosBySection={setVideosBySection}
        courseId={courseId}
        sectionId={section?.id}
        isOpen={openAddVideo}
        setIsOpen={setOpenAddVideo}
      />
      <DeleteModal
        isOpen={open}
        setIsOpen={setOpen}
        message={`Do you really want to delete ${section?.name} ?`}
        onDeleteSubmit={onDeleteSection}
      />
    </header>
  );
}

export const VideoItem = ({
  video,
  sectionId,
  token,
  courseId,
  setVideosBySection,
  videosBySection,
}) => {
  const [open, setOpen] = useState(false);
  const [openVideoDelete, setVideoDelete] = useState(false);
  const [toggleMenu, setToggleMenu] = useState(false);
  const axios = useAxiosPrivate();

  console.log(video, 'video');

  const onDeleteSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.delete(
        `/courses/${courseId}/sections/${sectionId}/videos/${video?.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      errorToast('Video Deleted Successfully');
      console.log(response, 'response delete video');
      if (response.status === 200) {
        const response = await axios.get(`/courses/${courseId}/sections/${sectionId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(response.data);
        const updatedVideosBySection = { ...videosBySection };
        updatedVideosBySection[sectionId] = response.data.videos;

        setVideosBySection(updatedVideosBySection);
      }
    } catch (err) {
      console.log(err);
    }
  };

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
        <Image
          src={video?.thumbnail}
          alt={'thumbnail'}
          width={300}
          height={200}
          className="rounded-md object-cover w-full h-[11.2rem]"
        />
      </Link>
      <div className="mt-3 flex gap-2 w-full">
        <UserAvatar />
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
                    onClick={() => setVideoDelete(true)}
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
        isOpen={openVideoDelete}
        setIsOpen={setVideoDelete}
        message={`Do you really want to delete ${video?.title} ?`}
        onDeleteSubmit={onDeleteSubmit}
      />
      <VideoEditModal
        isEdit={true}
        videosBySection={videosBySection}
        setVideosBySection={setVideosBySection}
        courseId={courseId}
        sectionId={sectionId}
        video={video}
        isOpen={open}
        setIsOpen={setOpen}
      />
    </div>
  );
};

const SectionAddModal = ({ isOpen, setIsOpen, setSectionName, sectionName, handleAddSection }) => {
  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(!isOpen);
  }

  return (
    <Dialog open={isOpen} onOpenChange={openModal}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Section</DialogTitle>
        </DialogHeader>

        <DialogDescription>
          <input
            type="text"
            value={sectionName}
            className="shadow-[inset_2px_1px_6px_rgba(0,0,0,0.2)] focus:outline-none rounded-md w-full px-4 py-1 placeholder:text-sm border-none focus:outline-non"
            onChange={(e) => setSectionName(e.target.value)}
            placeholder="Section Name"
          />
        </DialogDescription>

        <DialogFooter>
          <Button
            onClick={handleAddSection}
            variant="outline"
            className="flex gap-2 transform active:-translate-y-1 text-subcolor border-subcolor items-center"
          >
            <Image width={16} height={16} alt="add more" src={'/svgs/add_video.svg'} />
            New Section
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
