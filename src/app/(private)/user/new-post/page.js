'use client'
import React, { useRef, useState, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { useSession } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import useAxiosPrivate from '@/hooks/useAxiosPrivate';
import { Icons } from '@/components';
import { errorToast, successToast } from '@/utils/toasts';
const QuillNoSSRWrapper = dynamic(
  async () => {
    const { default: RQ } = await import('react-quill');
    // eslint-disable-next-line react/display-name
    return ({ forwardedRef, ...props }) => <RQ ref={forwardedRef} {...props} />;
  },
  { ssr: false }
);
const NewPost = () => {
  const { data: user } = useSession();
  const axios = useAxiosPrivate();

  const [loading, setLoading] = useState(false);
  const [selectedImages, setSelectedImages] = useState([]);
  const [bigImage, setBigImage] = useState(null);
  const quillRef = useRef(null);
  const fileInputRef = useRef(null);

  const handleIconClick = (thumbnail) => {
    const updatedImages = selectedImages.filter((image) => image !== thumbnail);
    setSelectedImages(updatedImages);
    setBigImage(updatedImages[updatedImages.length - 1]);
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
    const formData = new FormData();
    
    const text = quillRef.current?.value || '';

    if(!text) return errorToast("Text is empty!")
    formData.append('text', text) ;

    for (let i = 0; i < selectedImages.length; i++) {
      const file = selectedImages[i];
      formData.append('image', file);
    }
    
    for (const pair of formData.entries()) {
        console.log(pair)
    }

    try {
      setLoading(true);

      const response = await axios.post('/posts', formData, {
        headers: {
          'Authorization': `Bearer ${user?.token}`,
          'Content-Type': 'multipart/form-data',
        }
      });

     successToast("Uploaded Post!")
      quillRef.current.value=""
      setSelectedImages([])
      setBigImage(null)
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };




  



  return (
    <div className="lg:w-[45%] mx-auto md:w-[70%]">
      <div className="mt-2 bg-white flex flex-col gap-4 p-4 rounded-md shadow-md">
        {loading && (
          <div className='w-full absolute bg-white bg-opacity-50 top-0 left-0 h-full flex items-center z-[2000] justify-center'>
            <span className='animate-spin'>
              <Icons.Loader2 stroke="black" height="30" width="30" />
            </span>
          </div>
        )}

        <h1 className="text-2xl font-semibold mb-4 border-b pb-2">New Post</h1>

        <div className="">
          <Image
            priority
            src={bigImage && URL.createObjectURL(bigImage) || "https://bit.ly/placeholder-img"}
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

            {selectedImages.map((thumbnail, index) => (
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
                  src={URL.createObjectURL(thumbnail)}
                  alt={`Thumbnail ${index + 1}`}
                  className={`cursor-pointer min-w-[4rem] max-w-[4rem] h-[4rem] rounded-md object-contain transform border-2 mr-2 ${bigImage && bigImage.name === thumbnail.name ? 'border-main ' : ''}`}
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

      <QuillNoSSRWrapper forwardedRef={quillRef} />


      </div>
      <div className="flex justify-end">
        <Button disable={loading} onClick={handleSubmit} className="bg-black flex gap-2 items-center mt-4" >
          {loading && <span className='animate-spin'><Icons.Loader2 stroke="white" height="20" width="20" /></span>} Publish
        </Button>
      </div>
    </div>
  );
};

export default React.memo(NewPost);
