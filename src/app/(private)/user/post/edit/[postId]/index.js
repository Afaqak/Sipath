'use client'
import React, { useRef, useState, useMemo, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { useSession } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import useAxiosPrivate from '@/hooks/useAxiosPrivate';
import { Icons } from '@/components';
import { errorToast, successToast } from '@/utils/toasts';
import { FeedSkeleton } from '@/utils/skeletons';
import { useRouter } from 'next/navigation';
const QuillNoSSRWrapper = dynamic(
    async () => {
        const { default: RQ } = await import('react-quill');
        // eslint-disable-next-line react/display-name
        return ({ forwardedRef, ...props }) => <RQ ref={forwardedRef} {...props} />;
    },
    { ssr: false }
);

const PostEditPage = ({ params }) => {

    const { data: user } = useSession();
    const axios = useAxiosPrivate();
    const router = useRouter()
    const postId = params?.postId
    const [loading, setLoading] = useState(false);
    const [selectedImages, setSelectedImages] = useState([]);
    const [bigImage, setBigImage] = useState(null);
    const [removedImages, setRemovedImages] = useState([])
    const quillRef = useRef(null);
    const fileInputRef = useRef(null);
    const [attachedImages, setAttachedImages] = useState([])
    const [loadingSkeleton, setLoadingSkeleton] = useState(false)
    const [prevText, setPrevText] = useState('');

    const handleIconClick = (thumbnail) => {
        const updatedImages = selectedImages.filter((image) => image !== thumbnail);
        setSelectedImages(updatedImages);
        setBigImage(updatedImages[updatedImages.length - 1]);
        console.log(thumbnail, removedImages)
        if (attachedImages?.includes(thumbnail)) {
            setRemovedImages((prevRemovedImages) => [...(prevRemovedImages || []), thumbnail]);
        }
    };
    const handleImageChange = (event) => {
        const files = event.target.files;
        if (files.length > 0 && selectedImages) {
            setSelectedImages([...selectedImages, ...files]);
            setBigImage(files[files.length - 1]);
        }
    };

    const handleThumbnailClick = (thumbnail) => {
        setBigImage(thumbnail);
    };

    const handleInputClick = () => {
        fileInputRef.current.click();
    };

    const handleSubmit = async () => {
        try {
            setLoading(true);

            const text = quillRef.current?.value || '';
            const newImages = selectedImages.filter(image => !attachedImages?.includes(image));

            // Update text
            if (text !== prevText) {
                const formDataText = new FormData();
                formDataText.append('text', text);
                await axios.patch(`/posts/${postId}?type=text`, formDataText, {
                    headers: {
                        'Authorization': `Bearer ${user?.token}`,
                        'Content-Type': 'multipart/form-data',
                    },
                });
                successToast('Updated Text!');
                setPrevText(text);
            }
            // Remove images
            if (removedImages?.length > 0) {
                const formDataRemoveImage = new FormData();
                for (let i = 0; i < removedImages?.length; i++) {
                    const file = removedImages[i];
                    formDataRemoveImage.append('images_to_remove', file);
                }
                const response = await axios.patch(`/posts/${postId}?type=remove-images`, formDataRemoveImage, {
                    headers: {
                        'Authorization': `Bearer ${user?.token}`,
                        'Content-Type': 'multipart/form-data',
                    }
                });
                console.log(response.data)
                if (removedImages.length > 1) {
                    errorToast("Removed Images!");
                } else {
                    errorToast("Removed Image!");
                }


                setRemovedImages(null)
                setSelectedImages([...response?.data?.updatedPost?.attached_images]);
                setAttachedImages([...response?.data?.updatedPost?.attached_images])
                //  setData(response?.updatedPost)

            }

            // Add images
            if (newImages.length > 0) {
                const formDataInsertImage = new FormData();
                for (let i = 0; i < newImages?.length; i++) {
                    const file = newImages[i];
                    formDataInsertImage.append('image', file);
                }
                const response = await axios.patch(`/posts/${postId}?type=add-images`, formDataInsertImage, {
                    headers: {
                        'Authorization': `Bearer ${user?.token}`,
                        'Content-Type': 'multipart/form-data',
                    }
                });

                console.log(response.data?.post?.attached_images)
                if (newImages.length > 1) {
                    successToast("Added Images!");
                } else {
                    successToast("Added Image!");
                }
                setRemovedImages(null)
                setSelectedImages([...response?.data?.post?.attached_images]);
                setAttachedImages([...response?.data?.post?.attached_images])
            }


        } catch (error) {
            console.error('Error:', error);
        } finally {
            setLoading(false);
        }
    };


    function setData(response) {
        console.log(response)
        const { text = '', attached_images } = response
        console.log(attached_images)
        quillRef.current.getEditor().root.innerHTML = text;
        setPrevText(response?.text)
        setSelectedImages(attached_images);
        setAttachedImages(attached_images)
        setBigImage(attached_images[0]);
    }
    useEffect(() => {
        const fetchPostToEdit = async () => {
            setLoadingSkeleton(true)
            try {
                const request = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/posts/${postId}`, {
                    headers: {
                        Authorization: `Bearer ${user?.token}`,
                    },
                });
                const response = await request.json();
                if (+response?.author_id !== +user?.user?.id) {
                    router.back()
                }

                setData(response)

            } catch (err) {
                console.log(err);
            }
            finally {
                setLoadingSkeleton(false)
            }
        };

        fetchPostToEdit();
    }, []);


    if (loadingSkeleton) {
        return <FeedSkeleton time={1} />
    }

    return (
        <div className="lg:w-[45%] mx-auto relative md:w-[70%]">

            {loading && (
                <div className='w-full absolute bg-white bg-opacity-50 top-0 left-0 h-full flex items-center z-[2000] justify-center'>
                    <span className='animate-spin'>
                        <Icons.Loader2 stroke="black" height="30" width="30" />
                    </span>
                </div>
            )}
            <div className="mt-2 bg-white flex flex-col gap-4 p-4 rounded-md shadow-md">

                <h1 className="text-2xl font-semibold mb-4 border-b pb-2">New Post</h1>

                <div className="">
                    <Image
                        priority
                        src={bigImage ? (bigImage instanceof File ? URL.createObjectURL(bigImage) : bigImage) : "https://bit.ly/placeholder-img"}
                        width={200}
                        height={200}
                        alt="Big"
                        className="p-2 rounded-md aspect-video w-full object-contain mb-4 border-2"
                    />
                    <div className="flex gap-2 pb-2 pl-[0.3rem] min-w-full overflow-x-auto">
                        <div
                            onClick={handleInputClick}
                            className='h-16 shadow-md min-w-[4rem] rounded-md bg-gray-100 flex-col flex items-center cursor-pointer justify-center'
                        >
                            <Icons.plus height="24" width="24" stroke="black" />
                        </div>

                        {selectedImages?.map((thumbnail, index) => (
                            <div className='relative' key={index}>
                                <div className=''>
                                    <Icons.multiply
                                        onClick={() => handleIconClick(thumbnail)}
                                        width="5"
                                        height="5"
                                        stroke="red"
                                        className="w-3 cursor-pointer h-3 absolute top-1 z-[2000] right-3"
                                    />
                                </div>
                                <img
                                    key={index}
                                    src={thumbnail ? (thumbnail instanceof File ? URL.createObjectURL(thumbnail) : thumbnail) : "https://bit.ly/placeholder-img"}
                                    alt={`Thumbnail ${index + 1}`}
                                    className={`cursor-pointer min-w-[4rem] max-w-[4rem] h-[4rem] rounded-md object-contain transform border-2 mr-2 ${bigImage && thumbnail && (
                                            (bigImage instanceof File && thumbnail instanceof File && bigImage.name === thumbnail.name) ||
                                            (typeof bigImage === 'string' && typeof thumbnail === 'string' && bigImage === thumbnail)
                                        ) ? 'border-main ' : ''
                                        }`}
                                    onClick={() => handleThumbnailClick(thumbnail)}
                                />
                            </div>
                        ))}
                    </div>
                </div>

                <input
                    ref={fileInputRef}
                    hidden
                    type="file"
                    onChange={handleImageChange}
                    multiple
                    accept="image/*"
                />

                <QuillNoSSRWrapper forwardedRef={quillRef} defaultValue='' />


            </div>
            <div className="flex justify-end">
                <Button disabled={loading} onClick={handleSubmit} className="bg-black flex gap-2 items-center mt-4" >
                    {loading && <span className='animate-spin'><Icons.Loader2 stroke="white" height="20" width="20" /></span>} Publish
                </Button>
            </div>
        </div>
    );
};

export default React.memo(PostEditPage);
