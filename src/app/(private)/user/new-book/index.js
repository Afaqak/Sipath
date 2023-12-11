'use client';
import React, { useState, useRef, useEffect } from 'react';
import { VideoUploadType, NewBookBodyColumn, UploadBookColumn, CoverPreview, Icons, SubjectDropDown, FileInput, UploadStatusDisplay } from '@/components';
import { useSession } from 'next-auth/react';
import { successToast, errorToast } from '@/utils/toasts';
import { useDispatch } from 'react-redux';
import { createBook } from '@/features/book/bookThunk';
import { useForm, Controller } from 'react-hook-form';
import { Button } from '@/components/ui/button';

const AddBook = () => {
  const dispatch = useDispatch();
  const { data: user, status } = useSession();
  const [loading, setLoading] = useState(false);
  const ref = useRef(null)

  useEffect(() => {
    if (status === 'unauthenticated') {
      window.location.replace('/')
      errorToast('Session Expired.... Logging you out!')
    }
  }, [user, status])

  console.log(status)




  const [coverImage, setCoverImage] = useState(null);
  const { control, handleSubmit, reset, setValue, watch, formState: { errors } } = useForm()

  const onSuccess = () => {
    successToast('Uploaded!')
    setLoading(false);
    setCoverImage(null)
    reset()
  };

  const onError = () => {
    setLoading(false);
    errorToast('Error uploading book!');
  };

  const onSubmit = async (data) => {
    console.log(data)


    try {
      setLoading(true);
      const formData = new FormData();
      formData.append('book', data.book);
      formData.append('title', data.title);
      formData.append('description', data.title);
      formData.append('thumbnail', data.thumbnail);
      formData.append('subject', data.subject);
      if (data?.type === 'premium' && data?.price > 0) {
        formData.append('price', data?.price);
      }
      dispatch(createBook({ formData, token: user?.token, isDownloadable: data?.isDownloadable, onSuccess, onError, setValue }));
    } catch (error) {
      setLoading(false);
    }
  };


  return (
    <div className="w-[90%] my-16 md:w-fit mx-auto">
      <Controller
        name={`type`}
        control={control}
        defaultValue={'free'}
        render={({ field }) => (
          <VideoUploadType setPrice={(price) => setValue(`price`, price)} type={field.value} setType={(val) => field.onChange(val)} />
        )}
      />
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className=" bg-white mt-4 h-fit relative py-6 p-5 rounded-md shadow-md">
          <h1 className="text-2xl font-semibold mb-4 border-b pb-2">New Book</h1>
          {loading && (
            <UploadStatusDisplay uploadProgress={watch('progress')} />
          )}
          <div className='flex md:flex-row flex-col uppercase gap-6'>

            <div className="flex flex-col gap-4 text-sm">
              <div className="flex flex-col">
                <label className="text-[#616161] font-light">BOOK TITLE</label>
                <Controller
                  name='title'
                  control={control}
                  rules={{ required: 'Title is required' }}
                  render={({ field }) => (
                    <>
                      <input
                        defaultValue={''}
                        {...field}

                        placeholder="Enter title..."
                        className={`shadow-[inset_2px_1px_6px_rgba(0,0,0,0.2)] rounded-md px-3 py-1 placeholder:text-sm border-none focus:outline-none `}
                        type="text"
                      />
                      {errors && errors?.title && (
                        <span className="text-red-500 text-sm">Title is required</span>
                      )}
                    </>
                  )
                  }
                />
              </div>
              <div className="flex flex-col">
                <label className="text-[#616161] font-light">DESCRIPTION</label>
                <Controller
                  name='description'
                  defaultValue={''}
                  rules={{ required: "Description is required" }}
                  control={control}
                  render={({ field }) => (
                    <>
                      <textarea
                        rows={4}
                        {...field}
                        cols={4}
                        placeholder="Enter description"
                        className={`shadow-[inset_2px_1px_6px_rgba(0,0,0,0.2)] rounded-md px-3 py-1 placeholder:text-sm border-none focus:outline-none resize-none }`}
                      />
                      {errors && errors?.description && (
                        <span className="text-red-500 text-sm">{errors?.description?.message}</span>
                      )}
                    </>
                  )}

                />

              </div>
            </div>
            <div className="flex flex-col gap-4">
              <div className="flex flex-col text-sm">
                <label className="text-sm text-[#616161] font-light">SUBJECT</label>
                <Controller defaultValue={''} rules={{ required: 'Subject is required' }} control={control} name='subject' render={({ field }) => (
                  <>
                    <SubjectDropDown selectedValue={field.value} onValueChange={(value) => field.onChange(value)} placeholder={"Select Subject"} />
                    {errors && errors?.subject && (
                      <span className="text-red-500 text-sm">Subject is required</span>
                    )}
                  </>
                )} />
              </div>
              <div className="flex flex-col text-sm text-[#616161] font-light">
                <label className="">UPLOAD BOOK FILE</label>
                <Controller defaultValue={''} rules={{ required: "Book is required" }} control={control} name='book' render={({ field }) => (
                  <>
                    <FileInput file={field.value} setFile={(file) => field.onChange(file)} />
                    {errors && errors?.book && (
                      <span className="text-red-500 font-normal text-sm">Book is required</span>
                    )}
                  </>
                )} />
                <div className="mt-3">

                  <label className="cursor-pointer flex gap-2 items-center">
                    <Controller defaultValue={false} control={control} name='isDownloadable' render={({ field }) => (
                      <input
                        {...field}
                        type="checkbox"
                        className="form-checkbox h-4 w-4 text-blue-600"
                      />
                    )} />

                    <span>ALLOW DOWNLOAD</span>

                  </label>
                </div>
              </div>
            </div>
            <div className='flex flex-col h-48'>
              <div
                onClick={() => ref.current.click()}
                className="bg-[#D9D9D9] text-sm font-bold text-center flex-col flex items-center min-h-full  md:h-auto md:w-[10.5rem] rounded-md justify-center"
              >
                {coverImage ? (
                  <img
                    src={coverImage}
                    alt="Cover Preview"
                    className="w-full h-full rounded-md object-contain"
                  />
                ) : (
                  <>
                    Cover <br /> Preview
                  </>
                )}


                <Controller rules={{ required: "Thumbnail is required" }} defaultValue={undefined} control={control} name='thumbnail' render={({ field }) => (
                  <>
                    <input

                      ref={ref}
                      value={undefined}
                      type="file"
                      accept="image/*"
                      className='hidden'
                      onChange={(e) => {
                        const thumbnailFile = e.target.files[0]
                        field.onChange(thumbnailFile)
                        if (thumbnailFile) {
                          const reader = new FileReader();

                          reader.onloadend = () => {
                            setCoverImage(reader.result);
                          };

                          reader.readAsDataURL(thumbnailFile);
                        }
                      }}



                    />

                  </>
                )} />
              </div>
              {errors && errors?.thumbnail && (
                <span className="text-red-500 text-sm">{errors?.thumbnail?.message}</span>
              )}
            </div>
          </div>
        </div>
        <div className="flex justify-end">
          <Button
            disabled={loading}
            type="submit"
            className="bg-black flex gap-2 rounded-md text-sm font-medium px-8 mt-4 py-1 text-white"
          >
            {loading && <span className='animate-spin'><Icons.Loader2 width="20" height="20" stroke="white" /></span>}
            Add Book
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddBook;
