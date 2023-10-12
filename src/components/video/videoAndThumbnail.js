'use client';
import { useRef, useState } from 'react';

import { FileInput } from '../tutors/fileInput';
export const VideoandThumbnail = ({ thumbnail, setThumbnail, setVideo, setDuration }) => {
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
        setDuration(duration.toString());
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
        {/* {videoUrl ? (
          <video controls className="w-full h-full rounded-md object-contain">
            <source src={videoUrl} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        ) : (
          <div className="w-full h-full rounded-md object-contain">
            {thumbnail ? (
              <div>wewq</div>
            ) : (
              <div className="flex items-center justify-center h-full gap-2">
                Upload Video{' '}
                <Image src={'/svgs/upload_video.svg'} width={15} height={15} alt="file" />
              </div>
            )}
          </div>
        )} */}
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
