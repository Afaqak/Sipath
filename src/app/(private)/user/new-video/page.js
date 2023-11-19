'use client'
import { useSession } from 'next-auth/react'
import React, { useRef, useState } from 'react'
import { FileInput, SubjectDropDown, Icons, VideoUploadType } from '@/components'
import { useForm, useFieldArray, Controller } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import { motion } from 'framer-motion'
import useAxiosPrivate from '@/hooks/useAxiosPrivate'


const NewVideo = () => {
    const axios = useAxiosPrivate()
    const { data: user } = useSession()
    const {
        control,
        handleSubmit,
        setValue,
        register,
        watch,
        reset,
        formState: { errors, isSubmitting },
    } = useForm({
        defaultValues: {
            videoBodies: [{ title: '', description: '', video: null, subject: '', progress: 0, quiz: '', quizSolution: '', duration: 0, price: '', type: "free" }],
        },
    });
    const { fields, append, remove } = useFieldArray({
        control,
        name: 'videoBodies',
    });


    async function uploadVideo(video, index) {

        const formDataToSend = new FormData();
        formDataToSend.append('video', video.video);
        formDataToSend.append('thumbnail', video.thumbnail);
        formDataToSend.append('title', video.title);
        formDataToSend.append('description', video.description);
        formDataToSend.append('subject', video.subject);
        formDataToSend.append('duration', video.duration)



        if (video.type === 'premium' && video?.price > 0) {
            formDataToSend.append('price', video.price);
        }

        const config = {
            headers: {
                Authorization: `Bearer ${user?.token}`,
                'Content-Type': 'multipart/form-data',
            },

            onUploadProgress: (progressEvent) => {
          
                    const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                    console.log(progress,"{progres}",index)
                    setValue(`videoBodies[${index}].progress`, progress);
                
            },
        };


        try {
            const response = await axios.post('/upload/video', formDataToSend, config);
            console.log(response.data, "{response}")

        } catch (error) {
            console.error('Error uploading video:', error);
            errorToast('Error uploading video!');

        } finally {
        }
    }


    const onSubmit = async (data) => {
        try {


            console.log(data)
            for (const [index, video] of data.videoBodies.entries()) {
                await uploadVideo(video, index);
            }
        } catch (error) {
            console.error('Error uploading videos:', error.message);
        }
    };






    return (
        <div className=' w-full'>
            <div className='md:w-[60%]  flex flex-col gap-4 mx-auto'>
                {fields.map((field, index) => (
                    <div className='flex flex-col gap-4' key={field.id}>

                        <VideoBody watch={watch} isSubmitting={isSubmitting} register={register} errors={errors} control={control} fieldName={'videoBodies'} removeVideo={() => remove(index)} setValue={setValue} index={index} />
                    </div>
                ))}

                <div className='w-full mt-6 flex justify-center'>
                    <button
                        onClick={() => append({})}
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
                <div className='w-full flex justify-end'>
                    <Button className='' type="button" onClick={handleSubmit(onSubmit)} disabled={isSubmitting}>
                        {isSubmitting ? 'Submitting...' : 'Submit Videos'}
                    </Button>
                </div>


            </div>
        </div>
    );
};


export default NewVideo





const VideoBody = ({ control, index, setValue,watch, fieldName, errors, removeVideo, isSubmitting }) => {

    const inputRef = useRef(null)
    const videoRef = useRef(null);
    const [uploadType, setUploadType] = useState('free')
    console.log(watch(`${fieldName}[${index}].progress`))

    return (
        <>
            <Controller
                name={`${fieldName}[${index}].type`}
                control={control}
                defaultValue={'free'}
                render={({ field }) => (
                    <VideoUploadType setPrice={(price) => setValue(`${fieldName}[${index}].price`, price)} type={field.value} setType={(val) => field.onChange(val)} />
                )}
            />
            <div className="bg-white p-4 gap-4 relative w-full mx-auto rounded-md shadow-md">
                {isSubmitting && (
                    <div className="absolute flex items-center justify-center bg-gray-100 bg-opacity-80 z-[1000] top-0 left-0 h-full w-full">
                        <div className="bg-white p-4 flex flex-col gap-4 items-center justify-center rounded-md shadow-md">
                         
                            <motion.div className="rounded-md bg-gray-100 text-gray-600 font-semibold p-2">
                                <motion.span
                                    initial={{ scale: 0.5 }}
                                    animate={{ scale: 1 }}
                                    transition={{ duration: 0.5 }}
                                >
                                    {watch(`${fieldName}[${index}].progress`) === 100 ? (
                                        <motion.div
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ duration: 0.5 }}
                                        >
                                            Uploaded
                                        </motion.div>
                                    ) : (
                                        <motion.div><span className={`
                                            ${watch(`${fieldName}[${index}].progress`)==='0'?'animate-ping':''}
                                        `}>{watch(`${fieldName}[${index}].progress`)}</span></motion.div>
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

                <div className='flex justify-end'>
                    <div onClick={removeVideo} className='h-5 w-fit rounded-full bg-slate-200 flex items-center justify-center mb-4'>
                        <Icons.minus stroke="black" className="w-5 cursor-pointer h-5" />
                    </div>
                </div>
                <div className="flex flex-col lg:flex-row justify-between gap-8">

                    <div className="flex gap-8">
                        <div className="flex flex-col uppercase gap-2 text-[#616161] font-light">
                            <div className="flex flex-col">
                                <label className="text-sm">Video title</label>
                                <Controller
                                    name={`${fieldName}[${index}].title`}
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
                                            {errors[fieldName] && errors?.[fieldName][index]?.title && (
                                                <span className="text-red-500 text-sm">{errors?.[fieldName] && errors?.[fieldName][index]?.title?.message}</span>
                                            )}
                                        </>
                                    )}
                                />

                            </div>
                            <div className="flex flex-col">
                                <label className="text-sm">Video Description</label>
                                <Controller
                                    name={`videoBodies[${index}].description`}
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
                                            {errors[fieldName] && errors?.[fieldName][index]?.description && (
                                                <span className="text-red-500 text-sm">{errors?.[fieldName] && errors?.[fieldName][index]?.description?.message}</span>
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
                                    name={`videoBodies[${index}].subject`}
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
                                            {errors[fieldName] && errors?.[fieldName][index]?.subject && (
                                                <span className="text-red-500 text-sm">Subject is required</span>
                                            )}
                                        </>
                                    )}
                                />

                            </div>
                            <div className="flex flex-col">
                                <label className="text-sm">Upload Quiz</label>
                                <Controller
                                    name={`videoBodies[${index}].quiz`}
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
                                    name={`videoBodies[${index}].quizSolution`}
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
                            <div className='lg:h-28 h-36 flex  items-center justify-center cursor-pointer text-black font-semibold rounded-md w-full bg-gray-100'>
                                <Controller
                                    name={`videoBodies[${index}].video`}
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
                                                        console.log(duration)
                                                        setValue(`videoBodies[${index}].duration`, Math.floor(duration));
                                                    }

                                                    video.src = URL.createObjectURL(file);;


                                                }}
                                            />
                                            {field.value ? (
                                                <div className='relative'>
                                                    <span onClick={() => setValue(`videoBodies[${index}].video`, null)} className='absolute z-[2000] top-3 right-4 h-4 w-4 rounded-full bg-slate-200 flex items-center justify-center'>  <Icons.minus stroke="black" className="w-5 cursor-pointer h-5" /></span>
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
                            {errors[fieldName] && errors?.[fieldName][index]?.video && (
                                <span className="text-red-500 text-sm">Video is required</span>
                            )}

                        </div>


                        <div className="flex flex-col overflow-hidden">
                            <label className="text-sm">UPLOAD VIDEO THUMBNAIL</label>
                            <>
                                <Controller
                                    name={`videoBodies[${index}].thumbnail`}
                                    control={control}
                                    rules={{ required: "Thumbnail is Required" }}
                                    render={({ field }) => (
                                        <FileInput file={field.value} setFile={(value) => {
                                            field.onChange(value);
                                        }} />

                                    )}
                                />
                                {errors[fieldName] && errors?.[fieldName][index]?.thumbnail && (
                                    <span className="text-red-500 text-sm">Thumbnail is required</span>
                                )}
                            </>
                        </div>
                    </div>

                </div>

            </div>
        </>
    );
};


