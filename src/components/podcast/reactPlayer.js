'use client';
import React, { useEffect, useState } from 'react';
import ReactPlayer from 'react-player';
import axios from '../../utils/index';
import { useSelector } from 'react-redux';
import { useSearchParams } from 'next/navigation';

export const ContentPlayer = ({ noPremium }) => {
  const searchParams = useSearchParams();

  const id = searchParams.get('id');

  const [isClient, setIsClient] = useState(false);
  const [videoBlob, setVideoBlob] = useState(null);
  const token = JSON.parse(localStorage.getItem('token'));
  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    const fetchVideoData = async () => {
      try {
        const response = await axios.get(`/assets/video/stream/${id}`, {
          responseType: 'arraybuffer',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(response.data);
        const videoBlob = new Blob([response.data], { type: 'video/mp4' });
        console.log(videoBlob);
        setVideoBlob(videoBlob);
      } catch (error) {
        console.error('Error fetching video data:', error);
      }
    };

    fetchVideoData();
  }, []);

  return (
    <div>
      {isClient && (
        <div className={`relative lg:h-[60vh] md:h-[40vh] h-[30vh]`}>
          {videoBlob && (
            <ReactPlayer controls width="100%" height="100%" url={URL.createObjectURL(videoBlob)} />
          )}
          {/* <div
            className={`${videoBlob ? 'hidden' : 'absolute'} w-full h-full top-0 bottom-0 ${
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
                <input className="hidden" type="file" id="fileInput" accept="video/*" />
              </label>
              <p
                className={`bg-green-700 shadow-md rounded-md px-4 py-1 text-white font-medium text-lg text-center ${
                  noPremium ? 'hidden' : 'block'
                }`}
              >
                Buy Ticket for $19.99
              </p>
            </div>
          </div> */}
        </div>
      )}
    </div>
  );
};
