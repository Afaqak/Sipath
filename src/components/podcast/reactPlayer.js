'use client';
import React, { useEffect, useRef, useState } from 'react';
import useAxiosPrivate from '@/hooks/useAxiosPrivate';
import { useSearchParams } from 'next/navigation';
import { useSession } from 'next-auth/react';
import videojs from 'video.js';
import { Icons } from '../icons';

import 'video.js/dist/video-js.css';
import '@videojs/themes/dist/fantasy/index.css';

class NextButton extends videojs.getComponent('Button') {
  constructor(player, options) {
    super(player, options);
    this.el().innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-arrow-right-to-line"><path d="M17 12H3"/><path d="m11 18 6-6-6-6"/><path d="M21 5v14"/></svg>
  `;
    this.el().style.marginLeft = '20px';
  }

  handleClick(event) {
   
  }
}

videojs.registerComponent('NextButton', NextButton);

const ContentPlayer = ({ noPremium, token }) => {
  const searchParams = useSearchParams();
  const axios = useAxiosPrivate();
  const videoId = searchParams.get('id')
  const playerRef = useRef(null);
  const [isClient, setIsClient] = useState(false);
  const [video, setVideo] = useState({})


  const videoJsOptions = {
    controls: true,
    width: '100%',
    height: 400,
    responsive: true,
    fill: true,
    sources: [],
  };

  useEffect(() => {

    setIsClient(true);

    const fetchVideoData = async () => {
    
      try {
        const response = await axios.get(`/assets/video/${videoId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
   
        setVideo(response.data)
        console.log(response?.data,"for video")
        videoJsOptions.sources = [
          {
            src: response?.data?.signed_url,
            type: 'video/mp4',
          },
        ];

        if (playerRef.current) {
          const player = videojs(playerRef.current, videoJsOptions);

          const controlBar = player.getChild('controlBar');

          if (!player.getChild('controlBar').getChild('NextButton')) {
          
            const nextButton = controlBar.addChild('NextButton', {}, 1);
            controlBar.el().insertBefore(nextButton.el(), controlBar.el().firstChild);
          }
          player.src(videoJsOptions.sources);
          player.poster(response?.data?.asset?.thumbnail)

        }
      } catch (error) {
        console.error('Error fetching video data:', error);
      }
     
    };

    fetchVideoData();
  }, [videoId]);


  return (
    <div className='aspect-video relative border bg-black'>
    
      <div className="aspect-video">
        <video poster={video?.asset?.thumbnail} ref={playerRef} className="video-js vjs-theme-fantasy " />
      </div>

    </div>
  );
};

export default React.memo(ContentPlayer);
