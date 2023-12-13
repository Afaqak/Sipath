'use client';

import React, { useEffect } from 'react';
import { FileInput, SubjectDropDown, UploadStatusDisplay, VideoUploadType } from '@/components';
import { useDispatch } from 'react-redux';
import { errorToast, successToast } from '@/utils/toasts';
import { useSession } from 'next-auth/react';
import { useForm, Controller } from 'react-hook-form';
import useAxios from '@/hooks/useAxios';

const NewQuiz = () => {
  const dispatch = useDispatch();
  const axios = useAxios()
  const { control, handleSubmit, setValue, reset, formState: { isSubmitting }, watch } = useForm()
  const { data: user, status } = useSession();


  useEffect(() => {
    if (status === 'unauthenticated') {
      window.location.replace('/')
      errorToast('Session Expired.... Logging you out!')
    }
  }, [user, status])





  const handlePublish = async (body) => {

    const formData = new FormData();
    formData.append('title', body.title);
    formData.append('quiz', body.quizFile);
    formData.append('quiz_solution', body.quizSolutionFiles);
    formData.append('thumbnail', body.thumbnail);
    formData.append('subject', body.subject);
    if (body?.type === 'premium' && body?.price > 0) {
      formData.append('price', body?.price);
    }


    try {

      const config = {
        headers: {
          Authorization: `Bearer ${user?.token}`,
          'Content-Type': 'multipart/form-data',
        },

        onUploadProgress: (progressEvent) => {
          const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          if (setValue) {
            setValue('progress', progress)
          }
        },
      };


      await axios.post(`/upload/quiz`, formData, config).then((res) => {
        console.log(res.data)
        successToast('Quiz Uploaded!')
      });
      reset()


    } catch (err) {

    } finally {
    }
  };



  return (
    <div className="relative w-[90%] lg:w-[60%] mx-auto">
      <div className='mt-16 mb-4'>
        <Controller
          name={`type`}
          control={control}
          defaultValue={'free'}
          render={({ field }) => (
            <VideoUploadType setPrice={(price) => setValue(`price`, price)} type={field.value} setType={(val) => field.onChange(val)} />
          )}
        />
      </div>
      <div className="  bg-white flex relative uppercase flex-col gap-4 p-4 rounded-md shadow-md">
        {isSubmitting && (
          <UploadStatusDisplay uploadProgress={watch('progress')} />
        )}
        <h1 className="text-2xl font-semibold mb-4 border-b pb-2">New Quiz</h1>

        <form onSubmit={handleSubmit(handlePublish)}>

          <div className="flex flex-col md:flex-row gap-4 text-[#616161] font-light text-sm">
            <div className="flex flex-col">
              <label className="text-sm font-light">Quiz title</label>
              <Controller
                control={control}
                name='title'
                rules={{ required: "Title is required!" }}
                defaultValue={''}
                render={({ field }) => (
                  <input
                    {...field}
                    placeholder="ENTER TITLE"
                    className="shadow-[inset_2px_2px_7px_rgba(0,0,0,0.1)] text-sm w-48 rounded-md px-3 py-1 placeholder:text-sm border-none focus:outline-none"
                    type="text"

                  />
                )}

              />

            </div>
            <div className="flex flex-col">
              <label className="text-sm text-[#616161] font-light">Subject</label>
              <Controller
                name={`subject`}
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

                  </>
                )}
              />
            </div>
          </div>

          <div className="flex gap-4 flex-col md:flex-row">
            <div className="flex flex-col">
              <label className="text-sm text-[#616161] font-light">Upload Quiz</label>
              <Controller
                name='quizFile'
                control={control}
                rules={{ required: "Quiz File is required!" }}
                render={({ field }) => (
                  <FileInput file={field.value} setFile={(value) => {
                    field.onChange(value);
                  }} />

                )}

              />
            </div>
            <div className="flex flex-col">
              <label className="text-sm text-[#616161] font-light">Upload Quiz Solution</label>
              <Controller
                name='quizSolutionFile'
                control={control}

                rules={{ required: 'Quiz Solution file is required!' }}
                render={({ field }) => (
                  <FileInput file={field.value} setFile={(value) => {
                    field.onChange(value);
                  }} />

                )}

              />

            </div>
            <div className="flex flex-col">
              <label className="text-sm text-[#616161] font-light">Upload Thumbnail</label>
              <Controller
                name='thumbnail'
                control={control}
                rules={{ required: 'Thumbnail is required!' }}
                render={({ field }) => (
                  <FileInput file={field.value} setFile={(value) => {
                    field.onChange(value);
                  }} />

                )}

              />

            </div>
          </div>
          <div className="flex justify-end">
            <button className="bg-black rounded-md font-medium px-8 mt-4 py-1 text-white" onClick={handlePublish}>
              Publish
            </button>
          </div>
        </form>
      </div>

    </div>
  );
};

export default NewQuiz;
