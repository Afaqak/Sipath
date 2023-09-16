'use client';

import Image from 'next/image';
import React, { useRef, useState } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { FileInput, VideoUploadType } from '@/components';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import axios from '../../../utils/index';
import { useSelector } from 'react-redux';
const VideoUpload = () => {
  console.log([...Array(1)]);
  const [videoBodies, setVideoBodies] = useState([...Array(1)].map((_, index) => ({ id: index })));
  const [videoType, setVideoType] = useState('free');

  const handleAddVideoBody = () => {
    setVideoBodies((prevBodies) => [...prevBodies, { id: prevBodies.length }]);
  };
  console.log(videoBodies);
  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const reorderedVideoBodies = Array.from(videoBodies);
    const [movedVideoBody] = reorderedVideoBodies.splice(result.source.index, 1);
    reorderedVideoBodies.splice(result.destination.index, 0, movedVideoBody);

    setVideoBodies(reorderedVideoBodies);
  };

  return (
    <div className="relative w-[90%] lg:w-4/6 mx-auto mt-16">
      <VideoUploadType type={videoType} setType={setVideoType} />
      <div className="flex flex-col gap-4">
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="videoBodies" direction="vertical">
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                {videoBodies.map(({ id }, index) => (
                  <Draggable key={id} draggableId={`videoBody-${id}`} index={index}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <div
                          className={`h-[2px] my-5 relative w-[80%] lg:w-[90%] bg-[#1850BC] ${
                            videoBodies.length > 1 ? 'block' : 'hidden'
                          }`}
                        >
                          <div className="absolute -top-2 -right-14 flex gap-1">
                            <Image
                              alt="circle"
                              src={'/svgs/add_circle.svg'}
                              width={20}
                              height={20}
                            />
                            <Image alt="info" src={'/svgs/info.svg'} width={18} height={18} />
                          </div>
                        </div>
                        {/*until here*/}
                        <div key={index} className="relative">
                          <div className="w-full h-full absolute top-0 -left-10 shadow rounded-md bg-white"></div>
                          <VideoBody />
                        </div>
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

      <div className="flex justify-center mt-4 mb-16">
        <button onClick={handleAddVideoBody} className=" text-white plus">
          <Image src={'/svgs/add_video.svg'} alt="add_video" width={35} height={35} />
        </button>
      </div>
    </div>
  );
};
export default VideoUpload;

const VideoBody = () => {
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
  console.log(formData);

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
      const response = await axios.post('/upload/video', formDataToSend, config);
      if (response.status === 200) {
        console.log('Video uploaded successfully:', response.data);
      } else {
        console.error('Error uploading video:', response.statusText);
      }
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
    <form
      onSubmit={onSubmit}
      className="p-4 flex flex-col relative bg-white mb-4 shadow-lg w-full rounded-md justify-between"
    >
      {loading && (
        <div className="absolute flex items-center justify-center bg-gray-100 bg-opacity-80 z-[1000] top-0 left-0 h-full w-full">
          <div className="bg-white p-4 flex flex-col gap-4 items-center justify-center rounded-md shadow-md">
            <motion.div
              className="rounded-md bg-gray-100 text-gray-600 font-semibold p-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
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
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    {`${uploadProgress}%`}
                  </motion.div>
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
        className="lg:h-28 h-36 flex items-center justify-center text-black font-semibold rounded-md w-full bg-[#D9D9D9]"
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
