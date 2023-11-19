'use client';
import { v4 as uuidv4 } from 'uuid';
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';
import { FileInput, VideoUploadType, SubjectDropDown } from '@/components';
import axios from '@/utils/index'
import { motion } from 'framer-motion';
import useAxiosPrivate from '@/hooks/useAxiosPrivate';
import { Button } from '@/components/ui/button';
import { errorToast, successToast } from '@/utils/toasts';
import { useSession } from 'next-auth/react';
import { Icons } from '@/components';
import { useFieldArray, useForm, Controller, useFormState } from 'react-hook-form';


const VideoUpload = () => {
  const [sectionIds, setSectionIds] = useState([])
  const [courseId,setCourseId]=useState(null)
  const privateAxios=useAxiosPrivate()
  const {data:user}=useSession()
  const defaultVideo = {
    title: '',
    description: '',
    subject: '',
    thumbnail: null,
    video: null,
    duration: 0,
    loading: false,
    uploadProgress: 0,
    quiz: null,
    quiz_solution: null,
  };

  const defaultSection = {
    id: 'section-1',
    title: '',
    videos: [defaultVideo],
  };

  const defaultState = [defaultSection];

  const {
    control,
    handleSubmit,
    setValue,
    register,
    watch,

    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      sections: defaultState,
      courseTopics: '',
      courseThumbnail: null,
      price: 0,
      type: "free"

    },
  });

  const { fields, append, remove, update } = useFieldArray({
    control,
    name: 'sections',
  });



  const handleAddSection = () => {
    append({ videos: [defaultVideo] });
  };

  const handleAddVideo = (sectionIndex) => {
    const currentSections = watch('sections');

    const newVideo = { ...defaultVideo };
    setValue(
      'sections',
      currentSections.map((section, index) =>
        index === sectionIndex ? { ...section, videos: [...section.videos, newVideo] } : section
      )
    );
  };


  async function uploadVideo(video, index, sectionIndex) {

    const formDataToSend = new FormData();
    formDataToSend.append('video', video.video);
    formDataToSend.append('thumbnail', video.thumbnail);
    formDataToSend.append('title', video.title);
    formDataToSend.append('description', video.description);
    formDataToSend.append('subject', video.subject);
    formDataToSend.append('duration', video.duration);

    const config = {
      headers: {
        Authorization: `Bearer ${user?.token}`,
        'Content-Type': 'multipart/form-data',
      },
      onUploadProgress: (progressEvent) => {

        const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
        setValue(`sections[${sectionIndex}].videos[${index}].uploadProgress`, progress);

      },
    };

    try {
      const response = await privateAxios.post('/upload/video', formDataToSend, config);

      if (response.status === 200) {

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

      }
    } catch (error) {
      console.error('Error uploading video:', error);
      ;
    } finally {
    }
  }




  const onSubmit = async (formData, sectionIndex) => {
    console.log(formData, sectionIndex);
  
    let cId = courseId
    let sId = sectionIds.slice();
    const section = formData.sections[sectionIndex];
    const sectionVideos = formData.sections[sectionIndex].videos;
  
    const courseForm = new FormData();
    if (!courseId) {
    courseForm.append('name', formData.courseTopics);
      courseForm.append('thumbnail', formData.courseThumbnail);
      if (formData.price && formData.price > 0) {
        courseForm.append('price', formData.price);
      }
  
      try {
        const response = await privateAxios.post('/courses', courseForm, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${user?.token}`,
          },
        });
  
        successToast('Course added!', '#1850BC');
        setCourseId(response?.data?.course?.id);
        cId = response?.data?.course?.id;
      } catch (error) {
        console.error('Error adding course:', error);
      }
    }
  
    if (courseId && !sId[sectionIndex]) {
      try {
        const response = await privateAxios.post(
          `/courses/${cId}/section`,
          {
            name: section.title,
          },
          {
            headers: {
              Authorization: `Bearer ${user?.token}`,
            },
          }
        );
        sId[sectionIndex] = response?.data?.section?.id;
  
        successToast(`Section Added!`, '#1850BC');
  
        setSectionIds(sId);
      } catch (error) {
        console.error('Error adding section:', error);
      }
    }
  
    try {
      for (const [index, video] of sectionVideos.entries()) {
        await uploadVideo(video, index, sectionIndex);
      }
    } catch (error) {
      console.error('Error uploading videos:', error);
    }
  };
  


  // const onSubmit = async (data) => {
  //   try {
  //     console.log(data);

  //   } catch (error) {
  //     console.error('Error uploading courses:', error.message);
  //   }
  // };


  return (

    <div className=' w-full my-16'>
      <div className='md:w-[60%]  flex flex-col gap-4 mx-auto overflow-hidden'>
        <Controller
          name={`type`}
          control={control}
          defaultValue={'free'}
          render={({ field }) => (
            <VideoUploadType setPrice={(price) => setValue(`price`, price)} type={field.value} setType={(val) => field.onChange(val)} />
          )}
        />
        <CourseTopic register={register} control={control} />
        {fields?.map((section, sectionIndex) => (
          <div key={section.id}>
            <div className="relative mb-6">
              <div className="p-4 flex flex-col relative bg-white mb-4 shadow-lg rounded-md">
                <div className="flex flex-row items-center gap-4 text-[#616161] font-light">
                  <label className="text-sm uppercase text-[#616161] font-light">SECTION TITLE</label>
                  <input
                    {...register(`sections[${sectionIndex}].title`)}
                    placeholder={`Section ${sectionIndex + 1} Title`}
                    className="shadow-[inset_2px_1px_6px_rgba(0,0,0,0.2)] rounded-md px-3 py-1 placeholder:text-sm border-none focus:outline-none"
                  />
                </div>
              </div>
            </div>
            <div className='flex gap-4 flex-col'>
              {section?.videos?.map((video, videoIndex) => (
                <div key={video.id} className='flex flex-col gap-4'>
                  <VideoBody
                    isSubmitting={isSubmitting}
                    register={register}
                    watch={watch}
                    handleAddSection={handleAddSection}
                    errors={errors}
                    control={control}
                    fieldName={`sections[${sectionIndex}].videos`}
                    removeVideo={() => remove(videoIndex, sectionIndex)}
                    setValue={setValue}
                    sectionIndex={sectionIndex}
                    videoIndex={videoIndex}
                  />
                </div>
              ))}

            </div>

            <div className='w-full flex justify-end mt-4'>
              <Button className='' type="button" onClick={handleSubmit((data) => onSubmit(data, sectionIndex))} disabled={isSubmitting}>
                {isSubmitting ? 'Submitting...' : 'Submit Section'}
              </Button>
            </div>

            <div className='w-full mt-6 flex justify-center'>
              <button
                onClick={() => {
                  handleAddVideo(sectionIndex)
                }}
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
          </div>
        ))}

        <div className='w-full flex justify-end'>
          <Button className='' type="button" disabled={isSubmitting}>
            {isSubmitting ? 'Submitting...' : 'Submit Videos'}
          </Button>
        </div>
      </div>
    </div>

  );
};
export default VideoUpload;



const VideoBody = ({ control, index, handleAddSection, setValue, watch, fieldName, errors, removeVideo, videoIndex, sectionIndex, isSubmitting }) => {

  const inputRef = useRef(null)
  const videoRef = useRef(null);


  return (
    <div className="bg-white p-4 relative gap-4  w-full mx-auto rounded-md shadow-md">
      <div className=' '>

        {isSubmitting && (
          <div className="absolute flex items-center justify-center bg-gray-100 bg-opacity-80 z-[1000] top-0 left-0 h-full w-full">
            <div className="bg-white p-4 flex flex-col gap-4 items-center justify-center rounded-md shadow-md">

              <motion.div className="rounded-md bg-gray-100 text-gray-600 font-semibold p-2">
                <motion.span
                  initial={{ scale: 0.5 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  {watch(`${fieldName}[${videoIndex}].uploadProgress`) === 100 ? (
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5 }}
                    >
                      Uploaded
                    </motion.div>
                  ) : (
                    <motion.div><span className={`
                                          ${watch(`${fieldName}[${videoIndex}].uploadProgress`) === '0' ? 'animate-pulse' : ''}
                                      `}>{watch(`${fieldName}[${videoIndex}].uploadProgress`)}</span></motion.div>
                  )}
                </motion.span>
              </motion.div>
              <button
                type="button"

                className="bg-red-500 text-white px-4 py-1 rounded-md hover:bg-red-600 transition-colors duration-300"
              >
                Cancel Upload
              </button>
            </div>
          </div>
        )}

        <div className='flex gap-2 justify-end items-center mb-4'>
          <div onClick={removeVideo} className='h-5 w-fit rounded-full bg-slate-200 flex items-center justify-center '>
            <Icons.minus stroke="black" className="w-5 cursor-pointer h-5" />
          </div>
          <Icons.addTitle onClick={handleAddSection} className="w-6 h-6 cursor-pointer" />
          <Icons.info className="w-[1.45rem] cursor-pointer h-[1.42rem]" />
        </div>
        <div className="flex flex-col lg:flex-row justify-between gap-8">

          <div className="flex gap-8">
            <div className="flex flex-col uppercase gap-2 text-[#616161] font-light">
              <div className="flex flex-col">
                <label className="text-sm">Video title</label>
                <Controller
                  name={`${fieldName}[${videoIndex}].title`}
                  control={control}
                  defaultValue=""
                  rules={{ required: 'Title is required' }}
                  render={({ field }) => (
                    <>
                      <input
                        {...field}
                        placeholder="Video Title"
                        className="shadow-[inset_2px_1px_6px_rgba(0,0,0,0.2)] rounded-md px-3 py-1 placeholder:text-sm border-none focus:outline-none"
                      />
                      {errors['sections'] && errors['sections'][sectionIndex]?.videos[videoIndex]?.title && (
                        <span className="text-red-500 text-sm capitalize">{errors['sections'] && errors['sections'][sectionIndex]?.videos[videoIndex]?.title.message}</span>
                      )}
                    </>
                  )}
                />

              </div>
              <div className="flex flex-col">
                <label className="text-sm">Video Description</label>
                <Controller
                  name={`${fieldName}[${videoIndex}].description`}
                  control={control}
                  defaultValue=""
                  rules={{ required: "Description is Required" }}
                  render={({ field }) => (
                    <>
                      <textarea
                        {...field}
                        rows={4}
                        cols={4}
                        placeholder="Video Description"
                        className="shadow-[inset_2px_1px_6px_rgba(0,0,0,0.2)] rounded-md px-3 py-1 placeholder:text-sm border-none focus:outline-none resize-none"
                      />
                      {errors['sections'] && errors['sections'][sectionIndex]?.videos[videoIndex]?.description && (
                        <span className="text-red-500 text-sm capitalize">{errors['sections'] && errors['sections'][sectionIndex]?.videos[videoIndex]?.description.message}</span>
                      )}
                    </>
                  )}
                />

              </div>
            </div>
            <div className="flex flex-col justify-between mb-4 lg:mb-0 lg:items-center uppercase gap-2 text-[#616161] font-light">
              <div className="flex flex-col">
                <label className="text-sm">Subject</label>
                <Controller
                  name={`${fieldName}[${videoIndex}].subject`}
                  control={control}
                  rules={{ required: "Subject is Required" }}
                  render={({ field }) => (
                    <>
                      <SubjectDropDown
                        onValueChange={(value) => {
                          field.onChange(value);
                        }}
                        selectedValue={field.value}
                        placeholder="Select Subject"
                      />
                      {errors['sections'] && errors['sections'][sectionIndex]?.videos[videoIndex]?.subject && (
                        <span className="text-red-500 capitalize text-sm">{errors['sections'] && errors['sections'][sectionIndex]?.videos[videoIndex]?.subject.message}</span>
                      )}
                    </>
                  )}
                />

              </div>
              <div className="flex flex-col">
                <label className="text-sm">Upload Quiz</label>
                <Controller
                  name={`${fieldName}[${videoIndex}].quiz`}
                  control={control}
                  render={({ field }) => (
                    <FileInput file={field.value} setFile={(value) => {
                      field.onChange(value);
                    }} />

                  )}
                />

              </div>
              <div className="flex flex-col">
                <label className="text-sm">Upload Quiz Solution</label>
                <Controller
                  name={`${fieldName}[${videoIndex}].quizSolution`}
                  control={control}
                  render={({ field }) => (
                    <FileInput file={field.value} setFile={(value) => {
                      field.onChange(value);
                    }} />

                  )}
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-5 justify-between text-[#616161] font-light">
            <div className="">
              <div className='lg:h-28 h-36 flex  items-center justify-center cursor-pointer text-black font-semibold rounded-md  w-48 bg-gray-100'>
                <Controller
                  name={`${fieldName}[${videoIndex}].video`}
                  control={control}
                  rules={{ required: 'Video is required' }}
                  render={({ field }) => (
                    <>
                      <input
                        ref={inputRef}
                        type="file"
                        accept="video/*"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files[0];
                          field.onChange(file)
                          var video = document.createElement('video');
                          video.preload = 'metadata';
                          video.onloadedmetadata = function () {
                            window.URL.revokeObjectURL(video.src);
                            var duration = video.duration;

                            setValue(`${fieldName}[${videoIndex}].duration`, Math.floor(duration));
                          }

                          video.src = URL.createObjectURL(file);;


                        }}
                      />
                      {field.value ? (
                        <div className='relative'>
                          <span onClick={() => setValue(`${fieldName}[${videoIndex}].video`, null)} className='absolute z-[2000] top-3 right-4 overflow-hidden h-4 w-4 rounded-full bg-slate-200 flex items-center justify-center'>  <Icons.minus stroke="black" className="w-5 cursor-pointer h-5" /></span>
                          <video ref={videoRef} controls className="w-full h-full rounded-md object-contain">
                            <source src={URL.createObjectURL(field.value)} type="video/mp4" />
                            Your browser does not support the video tag.
                          </video>
                        </div>
                      ) : (
                        <div onClick={() => inputRef.current?.click()} className="w-full h-full rounded-md object-contain">
                          <div className="flex items-center justify-center h-full gap-2">
                            Upload Video{' '}

                            <img src={'/svgs/upload_video.svg'} width={15} height={15} alt="file" />
                          </div>
                        </div>
                      )}
                    </>
                  )}
                />
              </div>
              {errors['sections'] && errors['sections'][sectionIndex]?.videos[videoIndex]?.video && (
                <span className="text-red-500 text-sm">Video is required</span>
              )}

            </div>


            <div className="flex flex-col overflow-hidden">
              <label className="text-sm">UPLOAD VIDEO THUMBNAIL</label>
              <>
                <Controller
                  name={`${fieldName}[${videoIndex}].thumbnail`}
                  control={control}
                  rules={{ required: "Thumbnail is Required" }}
                  render={({ field }) => (
                    <FileInput file={field.value} setFile={(value) => {
                      field.onChange(value);
                    }} />

                  )}
                />
                {errors['sections'] && errors['sections'][sectionIndex]?.videos[videoIndex]?.thumbnail && (
                  <span className="text-red-500 text-sm">Thumbnail is required</span>
                )}
              </>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};






const CourseTopic = ({ register, control }) => {
  const { errors } = useFormState({ control });

  return (
    <div className="flex md:flex-row flex-col md:items-center gap-4 text-[#616161] font-light">
      <div className='flex flex-col'>
        <label className="text-sm uppercase text-[#616161] font-light">COURSE TITLE</label>
        <input
          {...register('courseTopics', { required: true })}
          placeholder="ENTER TITLE"
          className={`shadow-[inset_2px_1px_6px_rgba(0,0,0,0.2)] bg-white rounded-md px-3 w-80 py-1 placeholder:text-sm border-none focus:outline-none ${errors.courseTopics ? 'border-red-500' : '' // Add red border for validation error
            }`}
          type="text"
        />
        {errors.courseTopics && (
          <span className="text-red-500 text-sm">Course Title is required.</span>
        )}
      </div>
      <div className='flex flex-col'>
        <label className="text-sm uppercase text-[#616161] font-light">Thumbnail</label>
        <Controller
          name="courseThumbnail"
          control={control}
          rules={{ required: "Course Thumbnail is Required" }}
          render={({ field }) => (
            <>
              <FileInput
                file={field.value}
                setFile={(value) => {
                  field.onChange(value);
                }}
              />
              {errors.courseThumbnail && (
                <span className="text-red-500 text-sm">Course Thumbnail is required.</span>
              )}
            </>
          )}
        />
      </div>
    </div>
  );
};



