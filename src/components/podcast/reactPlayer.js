'use client';
import React, { useEffect, useState } from 'react';
import ReactPlayer from 'react-player';

export const ContentPlayer = ({ noPremium }) => {
  const [isClient, setIsClient] = useState(false);
  const [videoUrl, setVideoUrl] = useState('');

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleVideoUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const videoUrl = URL.createObjectURL(file);
      setVideoUrl(videoUrl);
    }
  };

  return (
    <div>
      {isClient && (
        <div className={`relative lg:h-[60vh] md:h-[40vh] h-[30vh]`}>
          <ReactPlayer controls url={videoUrl} width="100%" height="100%" />
          <div
            className={`${videoUrl ? 'hidden' : 'absolute'} w-full h-full top-0 bottom-0 ${
              noPremium ? 'bg-transparent' : 'bg-[#D9D9D9]'
            } flex items-center justify-center `}
          >
            <div className="flex flex-col gap-4">
              <label
                htmlFor="fileInput"
                id="premium"
                className="cursor-pointer font-medium text-lg"
              >
                Click me to add a video
                <input
                  className="hidden"
                  type="file"
                  id="fileInput"
                  accept="video/*"
                  onChange={handleVideoUpload}
                />
              </label>
              <p
                className={`bg-green-700 shadow-md rounded-md px-4 py-1 text-white font-medium text-lg text-center ${
                  noPremium ? 'hidden' : 'block'
                }`}
              >
                Buy Ticket for $19.99
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
