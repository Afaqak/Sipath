'use client';
import { v4 as uuidv4 } from 'uuid';
import Image from 'next/image';
import React, { useRef, useState } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { FileInput, VideoUploadType } from '@/components';
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';
import axios from '../../../utils/index';
import { Icons } from '@/components';

const VideoUpload = () => {
  const token = useSelector((state) => state.userAuth?.token);
  const [videoType, setVideoType] = useState('free');
  const [courseTopic, setCourseTopic] = useState('');
  const [courseId, setCourseId] = useState(null);
  const [sectionIds, setSectionIds] = useState([]);
  const abortController = new AbortController();
  const abortSignal = abortController.signal;
  function cancelUpload() {
    abortController.abort();
  }
  const initialState = {
    id: 'section-1',
    title: '',
    videos: [
      {
        id: uuidv4(),
        formData: {
          title: '',
          description: '',
          subject: '',
        },
        thumbnail: null,
        video: null,
        duration: 0,
        loading: false,
        uploadProgress: 0,
      },
    ],
  };
  const [sections, setSections] = useState([initialState]);

  const handleTitleUpdate = (sectionIndex, title) => {
    const updatedSections = [...sections];
    updatedSections[sectionIndex].title = title;
    setSections(updatedSections);
    console.log(sections[sectionIndex].title);
  };

  const handleUpdateFormData = (sectionIndex, videoIndex, e) => {
    const { name, value } = e.target;
    const updatedSections = [...sections];
    const videoFormData = { ...updatedSections[sectionIndex].videos[videoIndex].formData };
    videoFormData[name] = value;
    updatedSections[sectionIndex].videos[videoIndex].formData = videoFormData;
    setSections(updatedSections);
    console.log(sections);
  };

  const handleUpdateThumbnail = (sectionIndex, videoIndex, thumbnail) => {
    const updatedSections = [...sections];
    updatedSections[sectionIndex].videos[videoIndex].thumbnail = thumbnail;
    console.log(sections[sectionIndex]);
    setSections(updatedSections);
  };

  const handleUpdateVideo = (sectionIndex, videoIndex, video) => {
    const updatedSections = [...sections];
    updatedSections[sectionIndex].videos[videoIndex].video = video;
    setSections(updatedSections);
  };

  const handleUpdateDuration = (sectionIndex, videoIndex, duration) => {
    const updatedSections = [...sections];
    updatedSections[sectionIndex].videos[videoIndex].duration = duration;
    setSections(updatedSections);
  };

  const handleUpdateLoading = (sectionIndex, videoIndex, loading) => {
    const updatedSections = [...sections];
    updatedSections[sectionIndex].videos[videoIndex].loading = loading;
    setSections(updatedSections);
  };

  const handleUpdateUploadProgress = (sectionIndex, videoIndex, progress) => {
    const updatedSections = [...sections];
    updatedSections[sectionIndex].videos[videoIndex].uploadProgress = progress;
    setSections(updatedSections);
  };

  const handleAddVideoBody = (sectionId) => {
    const updatedSections = sections.map((section) => {
      if (section.id === sectionId) {
        const newVideo = {
          ...initialState.videos[0],
          id: uuidv4(),
        };
        return { ...section, videos: [...section.videos, newVideo] };
      }
      return section;
    });
    console.log(updatedSections, 'updated');

    setSections(updatedSections);
  };
  console.log();
  const handleAddSection = (videoId) => {
    const sectionContainingVideo = sections.find((section) =>
      section.videos.some((video) => video.id === videoId)
    );

    if (!sectionContainingVideo) {
      return;
    }

    const newSection = {
      id: `section-${sections.length + 1}`,
      title: '',
      videos: [
        {
          ...initialState.videos[0],
          id: uuidv4(),
        },
      ],
    };

    const updatedSections = sections.map((section, index) => {
      if (section === sectionContainingVideo) {
        return {
          ...sectionContainingVideo,
          videos: sectionContainingVideo.videos.filter((video) => video.id !== videoId),
        };
      }
      return section;
    });

    setSections([...updatedSections, newSection]);
  };
  console.log(sections);
  const generateUniqueVideoId = (videosInSection) => {
    let newId =
      videosInSection.length > 0 ? Math.max(...videosInSection.map((video) => video.id)) + 1 : 0;

    while (videosInSection.some((video) => video.id === newId)) {
      newId++;
    }
    return newId;
  };

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const sourceDroppableId = result.source.droppableId;
    const destinationDroppableId = result.destination.droppableId;
    const sourceIndex = result.source.index;
    const destinationIndex = result.destination.index;

    const updatedSections = [...sections];

    if (sourceDroppableId === destinationDroppableId && result.type === 'group') {
      const sectionIndex = sections.findIndex((section) => section.id === result.draggableId);
      if (sectionIndex === -1) return;

      const updatedSections = [...sections];

      const [movedSection] = updatedSections.splice(sourceIndex, 1);
      updatedSections.splice(destinationIndex, 0, movedSection);

      setSections(updatedSections);
      return;
    }

    if (sourceDroppableId !== destinationDroppableId) {
      const sourceSectionIndex = updatedSections.findIndex(
        (section) => section.id === sourceDroppableId
      );
      const destinationSectionIndex = updatedSections.findIndex(
        (section) => section.id === destinationDroppableId
      );

      if (sourceSectionIndex === -1 || destinationSectionIndex === -1) return;

      const [movedVideo] = updatedSections[sourceSectionIndex].videos.splice(sourceIndex, 1);

      updatedSections[destinationSectionIndex].videos.splice(destinationIndex, 0, movedVideo);

      if (updatedSections[sourceSectionIndex].videos.length === 0) {
        updatedSections.splice(sourceSectionIndex, 1);
      }
      setSections(updatedSections);
      return;
    } else {
      const sectionIndex = updatedSections.findIndex((section) => section.id === sourceDroppableId);
      if (sectionIndex === -1) return;

      const [movedVideo] = updatedSections[sectionIndex].videos.splice(sourceIndex, 1);

      updatedSections[sectionIndex].videos.splice(destinationIndex, 0, movedVideo);
    }

    setSections(updatedSections);
  };

  const handleCourseUpload = async (sectionIndex) => {
    let cId = courseId;
    let sId = sectionIds.slice();

    if (!courseId) {
      const { data } = await axios.post(
        '/courses',
        { name: courseTopic },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setCourseId(data?.course?.id);
      cId = data?.course?.id;
    }

    if (cId) {
      const { data } = await axios.post(
        `/courses/${cId}/section`,
        {
          name: sections[sectionIndex].title,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      sId[sectionIndex] = data?.section?.id;
      setSectionIds(sId);
    }

    const updatedSections = [...sections];

    try {
      const videosToUpload = [...updatedSections[sectionIndex].videos];

      async function uploadVideo(video) {
        const indexOfVid = sections[sectionIndex].videos.findIndex((v) => v === video);

        const formDataToSend = new FormData();
        formDataToSend.append('video', video.video);
        formDataToSend.append('thumbnail', video.thumbnail);
        formDataToSend.append('title', video.formData.title);
        formDataToSend.append('description', video.formData.description);
        formDataToSend.append('subject', video.formData.subject);
        formDataToSend.append('duration', video.duration.toString());
        formDataToSend.append('price', 12);

        video.loading = true;

        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
          signal: abortSignal,
          onUploadProgress: (progressEvent) => {
            const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);

            video.uploadProgress = progress;
            const updatedSectionsClone = [...updatedSections];
            updatedSectionsClone[sectionIndex] = {
              ...updatedSectionsClone[sectionIndex],
              videos: [...updatedSectionsClone[sectionIndex].videos],
            };
            setSections(updatedSectionsClone);
          },
        };

        try {
          const response = await axios.post('/upload/video', formDataToSend, config);
          if (response.status === 200) {
            console.log('Video uploaded successfully:', response.data);

            video.loading = false;
            video.uploadProgress = 0;

            updatedSections[sectionIndex].videos.splice(indexOfVid, 1);
            setSections([...updatedSections]);

            const videoId = response.data?.video?.id;
            console.log(videoId, 'video_id');
            const addVideoResponse = await axios.post(
              `/courses/${cId}/section/${sId[sectionIndex]}/addVideo`,
              { video_id: videoId },
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );

            if (addVideoResponse.status === 200) {
              console.log('Video added to section successfully:', addVideoResponse.data);
            } else {
              console.error('Error adding video to section:', addVideoResponse.statusText);
            }
          } else {
            console.error('Error uploading video:', response.statusText);
            video.loading = false;
          }
        } catch (error) {
          console.error('Error uploading video:', error.message);
          video.loading = false;
        }
      }

      for (const [index, video] of videosToUpload.entries()) {
        await uploadVideo(video, index);
      }
    } catch (error) {
      console.error('Error uploading videos:', error.message);
    }
  };

  return (
    <div className="relative w-[90%] lg:w-4/6 mx-auto mt-16">
      <div className="mb-5 flex justify-between items-center">
        <VideoUploadType type={videoType} setType={setVideoType} />
        <CourseTopic
          courseId={courseId}
          courseTopic={courseTopic}
          setCourseTopic={setCourseTopic}
        />
      </div>
      <div className="flex flex-col gap-4">
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable type="group" droppableId="videoBodies" direction="vertical">
            {(provided) => (
              <div className="pb-16" {...provided.droppableProps} ref={provided.innerRef}>
                {sections.map(({ id, videos }, sectionIndex) => (
                  <Draggable key={id} draggableId={id} index={sectionIndex}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        key={id}
                        className={`relative ${sectionIndex > 0 ? 'mt-24' : '0'}`}
                      >
                        {id && (
                          <SectionTitle
                            onTitleUpdate={(title) => handleTitleUpdate(sectionIndex, title)}
                          />
                        )}
                        <Droppable droppableId={id} direction="vertical">
                          {(provided) => (
                            <div
                              className="flex flex-col "
                              {...provided.droppableProps}
                              ref={provided.innerRef}
                            >
                              {videos?.map((video, videoIndex) => (
                                <Draggable
                                  key={`${id}-${video.id}`}
                                  draggableId={`${id}-${video.id}`}
                                  index={videoIndex}
                                >
                                  {(videoProvided) => (
                                    <div
                                      ref={videoProvided.innerRef}
                                      {...videoProvided.draggableProps}
                                      {...videoProvided.dragHandleProps}
                                      className="relative"
                                    >
                                      <VideoBody
                                        thumbnail={
                                          sections[sectionIndex].videos[videoIndex].thumbnail
                                        }
                                        video={sections[sectionIndex].videos[videoIndex].video}
                                        duration={
                                          sections[sectionIndex].videos[videoIndex].duration
                                        }
                                        formData={
                                          sections[sectionIndex].videos[videoIndex].formData
                                        }
                                        loading={sections[sectionIndex].videos[videoIndex].loading}
                                        uploadProgress={
                                          sections[sectionIndex].videos[videoIndex].uploadProgress
                                        }
                                        cancelUpload={cancelUpload}
                                        onUpdateFormData={(e) =>
                                          handleUpdateFormData(sectionIndex, videoIndex, e)
                                        }
                                        onUpdateThumbnail={(thumbnail) =>
                                          handleUpdateThumbnail(sectionIndex, videoIndex, thumbnail)
                                        }
                                        onUpdateVideo={(video) =>
                                          handleUpdateVideo(sectionIndex, videoIndex, video)
                                        }
                                        onUpdateDuration={(duration) =>
                                          handleUpdateDuration(sectionIndex, videoIndex, duration)
                                        }
                                        onUpdateLoading={(loading) =>
                                          handleUpdateLoading(sectionIndex, videoIndex, loading)
                                        }
                                        onUpdateUploadProgress={(progress) =>
                                          handleUpdateUploadProgress(
                                            sectionIndex,
                                            videoIndex,
                                            progress
                                          )
                                        }
                                        sections={sections}
                                        title={id}
                                        onClick={() => handleAddSection(video.id)}
                                      />
                                    </div>
                                  )}
                                </Draggable>
                              ))}
                              {provided.placeholder}
                            </div>
                          )}
                        </Droppable>
                        <div className="flex justify-end">
                          <button
                            onClick={() => handleCourseUpload(sectionIndex)}
                            className="bg-black rounded-md px-8 mt-4 py-1 text-white"
                          >
                            Publish All
                          </button>
                        </div>
                        <button
                          onClick={() => handleAddVideoBody(id)}
                          className="text-white mt-5 w-full  self-center flex justify-center items-center"
                        >
                          <Image
                            src={'/svgs/add_video.svg'}
                            alt="add_video"
                            width={35}
                            height={35}
                          />
                        </button>
                      </div>
                    )}
                  </Draggable>
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

const VideoBody = ({
  onClick,
  sections,
  title,
  onUpdateFormData,
  onUpdateThumbnail,
  onUpdateVideo,
  onUpdateDuration,
  cancelUpload,
  thumbnail,
  loading,
  uploadProgress,
  formData,
}) => {
  const handleFieldChange = (e) => {
    onUpdateFormData(e);
  };

  const handleThumbnail = (thumb) => {
    onUpdateThumbnail(thumb);
  };

  return (
    <motion.div className="relative">
      <div className="w-full h-full absolute top-0 -left-10 shadow rounded-md bg-white"></div>
      <div
        className={`
        w-[80%] lg:w-[90%] bg-[#1850BC] `}
      >
        <div className="absolute -top-2 -right-14 flex gap-1">
          {' '}
          <Icons.addTitle className="w-6 h-6" onClick={onClick} />
          <Icons.info className="w-[1.45rem] h-[1.42rem]" onClick={onClick} />
        </div>
      </div>
      <form className="p-4 flex flex-col relative bg-white mb-4 shadow-lg w-full rounded-md justify-between">
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

              <div className="w-52 h-1 bg-white shadow-[inset_2px_1px_6px_rgba(0,0,0,0.2)] rounded-md relative">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${uploadProgress}%` }}
                  transition={{ duration: 0.5 }}
                  className="h-full bg-gray-500 rounded-md"
                  style={{ width: `${uploadProgress}%` }}
                ></motion.div>
              </div>

              <button
                type="button"
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
            setDuration={onUpdateDuration}
            setVideo={onUpdateVideo}
            setThumbnail={handleThumbnail}
          />
        </div>
      </form>
    </motion.div>
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
          className="shadow-[inset_2px_1px_6px_rgba(0,0,0,0.2)] rounded-md px-3 py-1 placeholder:text-sm border-none focus:outline-none"
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
          className="shadow-[inset_2px_1px_6px_rgba(0,0,0,0.2)] rounded-md px-3 py-1 placeholder:text-sm border-none focus:outline-none resize-none "
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
          className="shadow-[inset_2px_1px_6px_rgba(0,0,0,0.2)] rounded-md px-3 py-1 placeholder:text-sm border-none focus:outline-none"
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

const SectionTitle = ({ onTitleUpdate }) => {
  return (
    <div className="relative mx-auto mb-6">
      <div className="w-full h-full absolute top-0 -left-10 shadow rounded-md bg-white"></div>
      <div className="p-4 flex flex-col relative bg-white mb-4 shadow-lg ">
        <div className="flex flex-row items-center gap-4 text-[#616161] font-light">
          <label className="text-sm uppercase text-[#616161] font-light">SECTION TITLE</label>
          <input
            onChange={(e) => onTitleUpdate(e.target.value)}
            name="title"
            placeholder="ENTER TITLE"
            className="shadow-[inset_2px_1px_6px_rgba(0,0,0,0.2)] rounded-md px-3 py-1 placeholder:text-sm border-none focus:outline-none"
            type="text"
          />
        </div>
      </div>
    </div>
  );
};

const CourseTopic = ({ courseId, setCourseTopic, courseTopic }) => {
  console.log(courseId, 'courseid');
  return (
    <div className="flex flex-row items-center gap-4 text-[#616161] font-light">
      <label className="text-sm uppercase text-[#616161] font-light">COURSE TITLE</label>
      <input
        disabled={courseId ? true : false}
        onChange={(e) => setCourseTopic(e.target.value)}
        name="courseTopics"
        value={courseTopic}
        placeholder="ENTER TITLE"
        className="shadow-[inset_2px_1px_6px_rgba(0,0,0,0.2)] bg-white rounded-md px-3 py-1 placeholder:text-sm border-none focus:outline-none"
        type="text"
      />
    </div>
  );
};
