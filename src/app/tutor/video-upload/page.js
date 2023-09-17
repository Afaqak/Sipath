'use client';

import Image from 'next/image';
import React, { useRef, useState } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { FileInput, VideoUploadType } from '@/components';
import { useForm } from 'react-hook-form';
import { motion, Reorder } from 'framer-motion';

import { useSelector } from 'react-redux';
const VideoUpload = () => {
  const [videoType, setVideoType] = useState('free');
  const [sections, setSections] = useState([
    {
      id: 'section-1',
      videos: [{ id: 0 }],
    },
  ]);

  console.log(sections);

  const handleAddVideoBody = (sectionId) => {
    const updatedSections = sections.map((section) => {
      if (section.id === sectionId) {
        const newVideo = { id: section.videos.length };
        return { ...section, videos: [...section.videos, newVideo] };
      }
      return section;
    });

    setSections(updatedSections);
  };

  const handleAddSection = (videoId) => {
    const sectionContainingVideo = sections.find((section) =>
      section.videos.some((video) => video.id === videoId)
    );

    if (!sectionContainingVideo) {
      return;
    }

    const newSection = {
      id: `section-${sections.length + 1}`,
      videos: [{ id: 0 }],
    };

    const updatedSections = sections.map((section, index) => {
      if (section === sectionContainingVideo) {
        console.log('here');
        return {
          ...sectionContainingVideo,
          videos: sectionContainingVideo.videos.filter((video) => video.id !== videoId),
        };
      }
      return section;
    });

    setSections([...updatedSections, newSection]);
  };
  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const sourceDroppableId = result.source.droppableId;
    const destinationDroppableId = result.destination.droppableId;
    console.log(sourceDroppableId, destinationDroppableId);

    if (sourceDroppableId !== destinationDroppableId) return;
    if (sourceDroppableId === destinationDroppableId) {
      const sectionIndex = sections.findIndex((section) => section.id === sourceDroppableId);
      if (sectionIndex === -1) return;

      const updatedSections = [...sections];
      const section = { ...updatedSections[sectionIndex] };

      const sourceIndex = result.source.index;
      const destinationIndex = result.destination.index;

      console.log(sourceIndex, destinationIndex);
      const [movedVideo] = section.videos.splice(sourceIndex, 1);
      section.videos.splice(destinationIndex, 0, movedVideo);

      updatedSections[sectionIndex] = section;
      setSections(updatedSections);
      // } else {
      //   // If the source and destination droppable IDs are different, it means the item is a section
      //   const sourceSectionIndex = sections.findIndex((section) => section.id === sourceDroppableId);
      //   const destinationSectionIndex = sections.findIndex(
      //     (section) => section.id === destinationDroppableId
      //   );

      //   if (sourceSectionIndex === -1 || destinationSectionIndex === -1) return;

      //   const updatedSections = [...sections];

      //   const [movedSection] = updatedSections.splice(sourceSectionIndex, 1);
      //   updatedSections.splice(destinationSectionIndex, 0, movedSection);

      //   setSections(updatedSections);
      // }
    }
  };
  return (
    <div className="relative w-[90%] lg:w-4/6 mx-auto mt-16">
      <div className="mb-5">
        <VideoUploadType type={videoType} setType={setVideoType} />
      </div>
      <div className="flex flex-col gap-4">
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="videoBodies" direction="vertical">
            {(provided) => (
              <div className="pb-16" {...provided.droppableProps} ref={provided.innerRef}>
                {sections.map(({ id, videos }, sectionIndex) => (
                  <div key={id} className="relative">
                    {id && <SectionTitle />}

                    <Droppable droppableId={`videos-${id}`} direction="vertical">
                      {(provided) => (
                        <div {...provided.droppableProps} ref={provided.innerRef}>
                          {videos.map(({ id: videoId }, videoIndex) => (
                            <Draggable
                              key={videoId}
                              draggableId={`video-${videoId}`}
                              index={videoIndex}
                            >
                              {(videoProvided) => (
                                <div
                                  className="relative"
                                  ref={videoProvided.innerRef}
                                  {...videoProvided.draggableProps}
                                  {...videoProvided.dragHandleProps}
                                >
                                  <div className="w-full h-full absolute top-0 -left-10 shadow rounded-md bg-white"></div>
                                  <VideoBody
                                    sections={sections}
                                    title={id}
                                    onClick={() => handleAddSection(videoId)}
                                  />
                                </div>
                              )}
                            </Draggable>
                          ))}
                          {provided.placeholder}
                        </div>
                      )}
                    </Droppable>
                    <button
                      onClick={() => handleAddVideoBody(id)}
                      className="text-white absolute -bottom-20 left-1/2 -translate-x-1/2 "
                    >
                      <Image src={'/svgs/add_video.svg'} alt="add_video" width={35} height={35} />
                    </button>
                  </div>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    </div>
  );
};
export default VideoUpload;

const VideoBody = ({ onClick, sections, title }) => {
  const token = useSelector((state) => state.userAuth?.token);
  console.log(token);
  const formValue = {
    title: '',
    description: '',
    subject: '',
  };

  const [thumbnail, setThumbnail] = useState(null);
  const [video, setVideo] = useState(null);
  const [duration, setDuration] = useState(0);
  const [formData, setFormData] = useState(formValue);
  const [loading, setLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const abortController = new AbortController();
  const abortSignal = abortController.signal;

  const handleFieldChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    console.log(formData, video, thumbnail);
    const formDataToSend = new FormData();
    formDataToSend.append('video', video);
    formDataToSend.append('thumbnail', thumbnail);
    formDataToSend.append('title', formData.title);
    formDataToSend.append('description', formData.description);
    formDataToSend.append('subject', formData.subject);
    formDataToSend.append('duration', duration.toString());
    formDataToSend.append('price', 12);

    console.log(token, 'token');
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
      signal: abortSignal,
      onUploadProgress: (progressEvent) => {
        const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
        console.log(`Upload Progress: ${progress}%`);
        setUploadProgress(progress);
      },
    };

    try {
      setLoading(true);
      // const response = await axios.post('/upload/video', formDataToSend, config);
      // if (response.status === 200) {
      //   console.log('Video uploaded successfully:', response.data);
      // } else {
      //   console.error('Error uploading video:', response.statusText);
      // }
    } catch (error) {
      console.error('Error uploading video:', error.message);
    } finally {
      setLoading(false);
    }
  };
  function cancelUpload() {
    abortController.abort();
    setLoading(false);
  }

  return (
    <div className={`relative mt-5 ${sections > 0 ? 'mb-28' : 'mb-10'} `}>
      <div
        className={`h-[2px] left-0 ${
          title ? '-bottom-5' : '-top-5'
        } absolute w-[80%] lg:w-[90%] bg-[#1850BC] `}
      >
        <div className="absolute -top-2 -right-14 flex gap-1">
          {' '}
          {/*to add a section header*/}
          <Image
            alt="circle"
            onClick={onClick}
            src={'/svgs/add_circle.svg'}
            width={20}
            height={20}
          />
          <Image alt="info" src={'/svgs/info.svg'} width={18} height={18} />
        </div>
      </div>
      <form
        onSubmit={onSubmit}
        className="p-4 flex flex-col relative bg-white mb-4 shadow-lg w-full rounded-md justify-between"
      >
        {loading && (
          <div className="absolute flex items-center justify-center bg-gray-100 bg-opacity-80 z-[1000] top-0 left-0 h-full w-full">
            <div className="bg-white p-4 flex flex-col gap-4 items-center justify-center rounded-md shadow-md">
              <motion.div className="rounded-md bg-gray-100 text-gray-600 font-semibold p-2">
                <motion.span
                  initial={{ scale: 0.5 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  {uploadProgress === 100 ? (
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5 }}
                    >
                      Uploaded
                    </motion.div>
                  ) : (
                    <motion.div>{`${uploadProgress}%`}</motion.div>
                  )}
                </motion.span>
              </motion.div>

              <div className="w-52 h-1 bg-white shadow-[inset_2px_1px_5px_rgba(0,0,0,0.2)] rounded-md relative">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${uploadProgress}%` }}
                  transition={{ duration: 0.5 }}
                  className="h-full bg-gray-500 rounded-md"
                  style={{ width: `${uploadProgress}%` }}
                ></motion.div>
              </div>

              <button
                onClick={cancelUpload}
                className="bg-red-500 text-white px-4 py-1 rounded-md hover:bg-red-600 transition-colors duration-300"
              >
                Cancel Upload
              </button>
            </div>
          </div>
        )}

        <div className="flex flex-col lg:flex-row justify-between gap-8">
          <div className="flex gap-8">
            <VideoInfoColumn onChange={handleFieldChange} />

            <QuizUploadColumn onChange={handleFieldChange} />
          </div>
          <VideoandThumbnail
            thumbnail={thumbnail}
            setDuration={setDuration}
            setVideo={setVideo}
            setThumbnail={setThumbnail}
          />
        </div>
        <div className="flex justify-end">
          <button type="submit" className="bg-black rounded-md px-8 mt-4 py-1 text-white">
            Publish
          </button>
        </div>
      </form>
    </div>
  );
};

const VideoInfoColumn = ({ onChange }) => {
  return (
    <div className="flex flex-col uppercase gap-2 text-[#616161] font-light">
      <div className="flex flex-col">
        <label className="text-sm">Video title</label>
        <input
          onChange={onChange}
          name="title"
          placeholder="Enter title..."
          className="shadow-[inset_1px_3px_7px_rgba(0,0,0,0.2)] rounded-md px-3 py-1 placeholder:text-sm border-none focus:outline-none"
          type="text"
        />
      </div>
      <div className="flex flex-col">
        <label className="text-sm">Video Description</label>
        <textarea
          onChange={onChange}
          name="description"
          rows={4}
          cols={4}
          typeof="text"
          placeholder="Enter description"
          className="shadow-[inset_1px_3px_7px_rgba(0,0,0,0.2)] rounded-md px-3 py-1 placeholder:text-sm border-none focus:outline-none resize-none "
        />
      </div>
    </div>
  );
};

const QuizUploadColumn = ({ onChange }) => {
  const [quizFile, setQuizFile] = useState(null);
  const [quizSolutionFile, setQuizSolutionFile] = useState(null);
  return (
    <div className="flex flex-col justify-between mb-4 lg:mb-0 lg:items-center uppercase gap-2 text-[#616161] font-light">
      <div className="flex flex-col">
        <label className="text-sm">Subject</label>
        <input
          onChange={onChange}
          name="subject"
          placeholder="Enter Subject"
          className="shadow-[inset_1px_3px_7px_rgba(0,0,0,0.2)] rounded-md px-3 py-1 placeholder:text-sm border-none focus:outline-none"
          type="text"
        />
      </div>
      <div className="flex flex-col">
        <label className="text-sm">Upload Quiz</label>
        <FileInput file={quizFile} setFile={setQuizFile} />
      </div>
      <div className="flex flex-col">
        <label className="text-sm">Upload Quiz Solution</label>
        <FileInput file={quizSolutionFile} setFile={setQuizSolutionFile} />
      </div>
    </div>
  );
};

const VideoandThumbnail = ({ thumbnail, setThumbnail, setVideo, setDuration }) => {
  const [videoUrl, setVideoUrl] = useState(null);
  const fileInputRef = useRef(null);

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleVideoSelected = (event) => {
    const file = event.target.files[0];
    setVideo(file);
    if (file) {
      const video = document.createElement('video');

      video.onloadedmetadata = () => {
        const duration = video.duration;
        setDuration(duration);
        setVideoUrl(video.src);
      };

      const reader = new FileReader();
      reader.onloadend = () => {
        video.src = URL.createObjectURL(file);
      };

      reader.readAsDataURL(file);
    }
  };
  return (
    <div className="flex flex-col gap-5 justify-between text-[#616161] font-light">
      <div
        onClick={handleButtonClick}
        className="lg:h-28 h-36 flex items-center justify-center cursor-pointer text-black font-semibold rounded-md w-full bg-[#D9D9D9]"
      >
        {videoUrl ? (
          <video controls className="w-full h-full rounded-md object-contain">
            <source src={videoUrl} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        ) : (
          <>
            <div className="flex gap-2">
              Upload Video{' '}
              <Image src={'/svgs/upload_video.svg'} width={15} height={15} alt="file" />
            </div>
          </>
        )}
        <input
          type="file"
          accept="video/*"
          className="hidden"
          ref={fileInputRef}
          onChange={handleVideoSelected}
        />
      </div>
      <div className="flex flex-col overflow-hidden">
        <label className="text-sm">UPLOAD VIDEO THUMBNAIL</label>
        <FileInput file={thumbnail} setFile={setThumbnail} />
      </div>
    </div>
  );
};

const SectionTitle = () => {
  return (
    <div className="relative mx-auto">
      <div className="w-full h-full absolute top-0 -left-10 shadow rounded-md bg-white"></div>
      <div className="p-4 flex flex-col relative bg-white mb-4 shadow-lg ">
        <div className="flex flex-row items-center gap-4">
          <label className="text-sm uppercase text-[#616161] font-light">SECTION title</label>
          <input
            name="title"
            placeholder="Enter title..."
            className="shadow-[inset_1px_3px_7px_rgba(0,0,0,0.2)] rounded-md px-3 py-1 placeholder:text-sm border-none focus:outline-none"
            type="text"
          />
        </div>
      </div>
    </div>
  );
};
