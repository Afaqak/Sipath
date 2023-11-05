'use client';
import { v4 as uuidv4 } from 'uuid';
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { FileInput, VideoUploadType,SubjectDropDown } from '@/components';
import axios from '../../../utils/index'
import { motion } from 'framer-motion';
import useAxiosPrivate from '@/hooks/useAxiosPrivate';
import { Button } from '@/components/ui/button';
import { errorToast, successToast } from '@/utils/toasts';
import { useSession } from 'next-auth/react';

const VideoUpload = () => {
  const { data: user } = useSession();

  const privateAxios = useAxiosPrivate();
  const [videoType, setVideoType] = useState('free');
  const [courseTopic, setCourseTopic] = useState('');
  const [courseId, setCourseId] = useState(null);
  const [sectionIds, setSectionIds] = useState([]);
  const abortController = new AbortController();
  const [selectedTab, setSelectedTab] = useState('individual');
  const [courseThumbnail, setCourseThumbnail] = useState(null);
  const [price, setPrice] = useState(0);
  const abortSignal = abortController.signal;
  const [categories, setCategories] = useState([])

  useEffect(() => {
    async function fetchCategories() {
      const response = await axios.get('/categories')
      setCategories(response?.data)
    }
    fetchCategories()
  }, [])

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
        },
        subject: 0,
        thumbnail: null,
        video: null,
        duration: 0,
        loading: false,
        uploadProgress: 0,
        quiz: null,
        quiz_solution: null,
      },
    ],
  };


  const [sections, setSections] = useState([initialState]);
 
  const handleTitleUpdate = (sectionIndex, title) => {
    const updatedSections = [...sections];
    updatedSections[sectionIndex].title = title;
    setSections(updatedSections);
   
  };

  const handleUpdateFormData = (sectionIndex, videoIndex, e) => {
    e.preventDefault();
    
    const { name, value } = e.target;
    const updatedSections = [...sections];
    const videoFormData = { ...updatedSections[sectionIndex].videos[videoIndex].formData };
    videoFormData[name] = value;
    updatedSections[sectionIndex].videos[videoIndex].formData = videoFormData;
    setSections(updatedSections);
    
  };

  const handleUpdateThumbnail = (sectionIndex, videoIndex, thumbnail) => {
    const updatedSections = [...sections];
    updatedSections[sectionIndex].videos[videoIndex].thumbnail = thumbnail;
    
    setSections(updatedSections);
  };

  const handleUpdateVideo = (sectionIndex, videoIndex, video) => {
    const updatedSections = [...sections];
    updatedSections[sectionIndex].videos[videoIndex].video = video;
    setSections(updatedSections);
  };

  const handleQuizUpload = (sectionIndex, videoIndex, quiz) => {
    const updatedSections = [...sections];
    updatedSections[sectionIndex].videos[videoIndex].quiz = quiz;
    setSections(updatedSections);
  };
  const handleQuizSolution = (sectionIndex, videoIndex, quizSolution) => {
    const updatedSections = [...sections];
    updatedSections[sectionIndex].videos[videoIndex].quiz_solution = quizSolution;
    setSections(updatedSections);
  };

  const handleUpdateDuration = (sectionIndex, videoIndex, duration) => {
    const updatedSections = [...sections];

    updatedSections[sectionIndex].videos[videoIndex].duration = duration;
    setSections(updatedSections);
  };
  const handleUpdateSubject = (sectionIndex, videoIndex, subject) => {
 
    const updatedSections = [...sections];
    updatedSections[sectionIndex].videos[videoIndex].subject = subject;
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

  const resetState = () => {
    const initialState = {
      id: 'section-1',
      title: '',
      videos: [
        {
          id: uuidv4(),
          formData: {
            title: '',
            description: '',
          },
          subject: 0,
          thumbnail: null,
          video: null,
          duration: 0,
          loading: false,
          uploadProgress: 0,
          quiz: null,
          quiz_solution: null,
          
        },
      ],
    };
    setCourseId(0)
    setCourseTopic('')
    setCourseThumbnail(null)
    setSectionIds([])
    setPrice(0)
    setSections([initialState]);
  };

  const handleCourseUpload = async (sectionIndex) => {
    let cId = courseId;
    let sId = sectionIds.slice();
  

    if (!courseId) {
      if (!courseTopic || !courseThumbnail) {
        errorToast('Please fill in all required fields', '#fb3c22');

        return;
      }
      const courseForm = new FormData();
      courseForm.append('name', courseTopic);
      courseForm.append('thumbnail', courseThumbnail);
      if (price && price > 0) {
        courseForm.append('price', price);
      }
      const { data } = await privateAxios.post('/courses', courseForm, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${user?.token}`,
        },
      });

      successToast('Course added!', '#1850BC');

      setCourseId(data?.course?.id);
      cId = data?.course?.id;
    }

    if (cId && !sId[sectionIndex]) {
      if (!sections[sectionIndex].title) {
        errorToast('Please enter a section title', '#fb3c22');

        return;
      }

      const { data } = await privateAxios.post(
        `/courses/${cId}/section`,
        {
          name: sections[sectionIndex].title,
        },
        {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        }
      );
      sId[sectionIndex] = data?.section?.id;

      successToast(`Section Added!`, '#1850BC');

      setSectionIds(sId);
    }

    const updatedSections = [...sections];

    try {
      const videosToUpload = [...updatedSections[sectionIndex].videos];

      async function uploadVideo(video) {
        const indexOfVid = sections[sectionIndex].videos.findIndex((v) => v === video);
        if (
          !video.video ||
          !video.formData.title ||
          !video.formData.description ||
          !video.subject ||
          !video.duration ||
          !video.thumbnail
        ) {
          errorToast('Please fill in all required fields for the video', '#fb3c22');

          return;
        }

        const formDataToSend = new FormData();
        formDataToSend.append('video', video.video);
        formDataToSend.append('thumbnail', video.thumbnail);
        formDataToSend.append('title', video.formData.title);
        formDataToSend.append('description', video.formData.description);
        formDataToSend.append('subject', video.subject);
        formDataToSend.append('duration', video.duration.toString());
        // formData.append('quiz', video?.quiz)
        // formData.append('quiz_solution', video?.quiz_solution);
        video.loading = true;

        const config = {
          headers: {
            Authorization: `Bearer ${user?.token}`,
            'Content-Type': 'multipart/form-data',
          },
          signal: abortSignal,
          onUploadProgress: (progressEvent) => {
            if (video.loading) {
              const { loaded, total } = progressEvent;
              const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
              const updatedSectionsClone = [...updatedSections];
              const videoIndex = updatedSectionsClone[sectionIndex].videos.findIndex(
                (v) => v === video
              );
              if (videoIndex !== -1) {
                updatedSectionsClone[sectionIndex] = {
                  ...updatedSectionsClone[sectionIndex],
                  videos: [...updatedSectionsClone[sectionIndex].videos],
                };
                updatedSectionsClone[sectionIndex].videos[videoIndex].uploadProgress = progress;
                setSections(updatedSectionsClone);
              }
            }
          },
        };

        try {
          const response = await privateAxios.post('/upload/video', formDataToSend, config);
          if (response.status === 200) {
           
            updatedSections[sectionIndex].videos.splice(indexOfVid, 1);
            setSections([...updatedSections]);

            const videoId = response.data?.video?.id;
       
            const addVideoResponse = await privateAxios.post(
              `/courses/${cId}/section/${sId[sectionIndex]}/videos`,
              { video_id: videoId },
              {
                headers: {
                  Authorization: `Bearer ${user?.token}`,
                },
              }
            );

            if (addVideoResponse.status === 200) {
             
              successToast('Video Added to Section!', '#1850BC');
            } else {
              
            }
          } else {
            console.error('Error uploading video:', response.statusText);
            video.loading = false;
          }
        } catch (error) {
          console.error('Error uploading video:', error);
          video.loading = false;
        } finally {
          video.loading = false
          video.progress = 0
          setSections([...updatedSections]);

        }
      }

      for (const [index, video] of videosToUpload.entries()) {
        await uploadVideo(video, index);
      }
    } catch (error) {
      console.error('Error uploading videos:', error);
    }
  };

  const onIndividualVideoSubmit = async (sectionIndex) => {
    const updatedSections = [...sections];

    try {
      const videosToUpload = [...updatedSections[sectionIndex].videos];

      async function uploadVideo(video) {
        if (
          !video.video ||
          !video.formData.title ||
          !video.formData.description ||
          !video.subject ||
          !video.duration ||
          !video.thumbnail
        ) {
                   errorToast('Please fill in all required fields for the video', '#fb3c22');

          return;
        }
     
        const indexOfVid = sections[sectionIndex].videos.findIndex((v) => v === video);
        const formDataToSend = new FormData();
        formDataToSend.append('video', video.video);
        formDataToSend.append('thumbnail', video.thumbnail);
        formDataToSend.append('title', video.formData.title);
        formDataToSend.append('description', video.formData.description);
        formDataToSend.append('subject', video.subject);
        formDataToSend.append('duration', video.duration)


          ;

        if (videoType === 'premium' && price > 0) {
          formDataToSend.append('price', price);
        }
        video.loading = true;

        const config = {
          headers: {
            Authorization: `Bearer ${user?.token}`,
            'Content-Type': 'multipart/form-data',
          },
          signal: abortSignal,
          onUploadProgress: (progressEvent) => {
            if (video.loading) {
              const { loaded, total } = progressEvent;
           
              const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          
              const updatedSectionsClone = [...updatedSections];

              const videoIndex = updatedSectionsClone[sectionIndex].videos.findIndex(
                (v) => v === video
              );
              if (videoIndex !== -1) {
                updatedSectionsClone[sectionIndex] = {
                  ...updatedSectionsClone[sectionIndex],
                  videos: [...updatedSectionsClone[sectionIndex].videos],
                };
                updatedSectionsClone[sectionIndex].videos[videoIndex].uploadProgress = progress;
                setSections(updatedSectionsClone);
              }
            }
          },
        };


        try {
          const response = await privateAxios.post('/upload/video', formDataToSend, config);
          if (response.status === 200) {
            
            successToast('Video uploaded successfully!');
            updatedSections[sectionIndex].videos.splice(indexOfVid, 1);
            setSections([...updatedSections]);
            const videoId = response.data?.video?.id;
        
          } else {
            console.error('Error uploading video:', response);


          }
        } catch (error) {
          console.error('Error uploading video:', error);
          errorToast('Error uploading video!');

        } finally {
          video.loading = false;
          video.progress = 0
          setSections([...updatedSections]);

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
      <div className="flex w-full gap-2 justify-end mb-4">
        <Button
          type="button"
          onClick={() => setSelectedTab('individual')}
          className="text-base"
          variant={selectedTab === 'individual' ? 'default' : 'outline'}
        >
          Individual
        </Button>
        <Button
          type="button"
          className="text-base"
          onClick={() => setSelectedTab('premium')}
          variant={selectedTab === 'premium' ? 'default' : 'outline'}
        >
          Course
        </Button>
        <Button
          type="button"
          onClick={resetState}
          className="bg-red-500 rounded-md text-base py-1 text-white"
        >
          Reset
        </Button>
      </div>

      <div className="mb-5 flex flex-col justify-between gap-4">
        <VideoUploadType type={videoType} setType={setVideoType} setPrice={setPrice} />
        {selectedTab === 'premium' && (
          <CourseTopic
            coursethumbnail={courseThumbnail}
            setCourseThumbnail={setCourseThumbnail}
            courseId={courseId}
            courseTopic={courseTopic}
            setCourseTopic={setCourseTopic}
          />
        )}
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
                        {id && selectedTab === 'premium' && (
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
                                        subject={
                                          sections[sectionIndex].videos[videoIndex].subject
                                        }
                                        formData={
                                          sections[sectionIndex].videos[videoIndex].formData
                                        }
                                        loading={sections[sectionIndex].videos[videoIndex].loading}
                                        uploadProgress={
                                          sections[sectionIndex].videos[videoIndex].uploadProgress
                                        }
                                        quiz={sections[sectionIndex].videos[videoIndex].quiz}
                                        quizSolution={
                                          sections[sectionIndex].videos[videoIndex].quiz_solution
                                        }
                                        cancelUpload={cancelUpload}
                                        onUpdateFormData={(e) => {
                                          e.preventDefault();
                                          handleUpdateFormData(sectionIndex, videoIndex, e);
                                        }}
                                        onUpdateThumbnail={(thumbnail) =>
                                          handleUpdateThumbnail(sectionIndex, videoIndex, thumbnail)
                                        }
                                        onUpdateSubject={(subject) =>
                                          handleUpdateSubject(sectionIndex, videoIndex, subject)
                                        }
                                        onUpdateQuiz={(quiz) =>
                                          handleQuizUpload(sectionIndex, videoIndex, quiz)
                                        }
                                        onUpdateVideo={(video) =>
                                          handleUpdateVideo(sectionIndex, videoIndex, video)
                                        }
                                        onUpdateQuizSolution={(quizSolution) =>
                                          handleQuizSolution(sectionIndex, videoIndex, quizSolution)
                                        }
                                        onUpdateDuration={(duration) =>
                                          handleUpdateDuration(sectionIndex, videoIndex, duration)
                                        }
                                        onUpdateLoading={(loading) =>
                                          handleUpdateLoading(sectionIndex, videoIndex, loading)
                                        }
                                        categories={categories}
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
                                        selectedTab={selectedTab}
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
                          <Button
                            type="button"
                            onClick={
                              selectedTab === 'premium'
                                ? () => handleCourseUpload(sectionIndex)
                                : () => onIndividualVideoSubmit(sectionIndex)
                            }
                            className="bg-black rounded-md text-base mt-4 py-1 text-white"
                          >
                            Publish Section
                          </Button>
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
  onUpdateFormData,
  onUpdateThumbnail,
  onUpdateVideo,
  onUpdateDuration,
  cancelUpload,
  thumbnail,
  loading,
  uploadProgress,
  onUpdateSubject,
  selectedTab,
  categories,
  onUpdateQuiz,
  onUpdateQuizSolution,
  quizSolution,
  subject,
  quiz,
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
      {selectedTab === 'premium' && (
        <div>
          <div className="absolute -top-2 -right-14 flex gap-1">
            {' '}
            <Icons.addTitle className="w-6 h-6" onClick={onClick} />
            <Icons.info className="w-[1.45rem] h-[1.42rem]" onClick={onClick} />
          </div>
        </div>
      )}
      <form className="p-4 flex flex-col relative bg-white outline-none mb-4 shadow-lg w-full rounded-md justify-between">
        {loading && (
          <div className="absolute flex items-center justify-center bg-gray-100 bg-opacity-80 z-[1000] top-0 left-0 h-full w-full">
            <div className="bg-white p-4 flex flex-col gap-4 items-center justify-center rounded-md shadow-md">
              {/* <span className='animate-spin'><Icons.Loader2 stroke="black" width="34" height="34"/></span> */}
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

              {/* <div className="w-52 h-1 bg-white shadow-[inset_2px_1px_6px_rgba(0,0,0,0.2)] rounded-md relative">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${uploadProgress}%` }}
                  transition={{ duration: 0.5 }}
                  className="h-full bg-gray-500 rounded-md"
                  style={{ width: `${uploadProgress}%` }}
                ></motion.div>
              </div> */}

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
          <div className="flex lg:flex-row flex-col text-sm gap-8">
            <div className="flex flex-col uppercase gap-2 text-[#616161] font-light">
              <div className="flex flex-col">
                <label className="text-sm">Video title</label>
                <input
                  onChange={(e) => {
                    e.preventDefault();
                    handleFieldChange(e);
                  }}
                  name="title"
                  placeholder="Enter title..."
                  className="shadow-[inset_2px_1px_6px_rgba(0,0,0,0.2)] rounded-md px-3 py-1 placeholder:text-sm border-none focus:outline-none"
                  type="text"
                />
              </div>
              <div className="flex flex-col">
                <label className="text-sm">Video Description</label>
                <textarea
                  onChange={handleFieldChange}
                  name="description"
                  rows={4}
                  cols={4}
                  typeof="text"
                  placeholder="Enter description"
                  className="shadow-[inset_2px_1px_6px_rgba(0,0,0,0.2)] rounded-md px-3 py-1 placeholder:text-sm border-none focus:outline-none resize-none "
                />
              </div>
            </div>
            <QuizUploadColumn
              categories={categories}
              quiz={quiz}
              quizSolution={quizSolution}
              subject={subject}
              setQuiz={onUpdateQuiz}
              setQuizSolution={onUpdateQuizSolution}
              onChange={onUpdateSubject}
            />
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

const QuizUploadColumn = ({ onChange, setQuiz, quiz, categories, quizSolution, setQuizSolution, subject }) => {

  return (
    <div className="flex flex-col justify-between mb-4 lg:mb-0 uppercase gap-2 text-[#616161] font-light">
      <div className="flex flex-col">
        <label className="text-sm">Subject</label>

        <SubjectDropDown options={categories} selectedValue={subject} onValueChange={onChange} placeholder={"subject"} />
      </div>
      <div className="flex flex-col">
        <label className="text-sm">Upload Quiz</label>
        <FileInput file={quiz} setFile={setQuiz} />
      </div>
      <div className="flex flex-col">
        <label className="text-sm">Upload Quiz Solution</label>
        <FileInput file={quizSolution} setFile={setQuizSolution} />
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

const CourseTopic = ({
  courseId,
  setCourseTopic,
  courseTopic,
  coursethumbnail,
  setCourseThumbnail,
}) => {

  return (
    <div className="flex md:flex-row flex-col md:items-center gap-4 text-[#616161] font-light">
      <label className="text-sm uppercase text-[#616161] font-light">COURSE TITLE</label>
      <input
        disabled={courseId ? true : false}
        onChange={(e) => setCourseTopic(e.target.value)}
        name="courseTopics"
        value={courseTopic}
        placeholder="ENTER TITLE"
        className="shadow-[inset_2px_1px_6px_rgba(0,0,0,0.2)] bg-white rounded-md px-3 w-80 py-1 placeholder:text-sm border-none focus:outline-none"
        type="text"
      />
      <label className="text-sm uppercase text-[#616161] font-light">Thumbnail</label>
      <FileInput
        disabled={courseId ? true : false}
        file={coursethumbnail}
        setFile={setCourseThumbnail}
      />
    </div>
  );
};






