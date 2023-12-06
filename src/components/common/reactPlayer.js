'use client';
import React, { useEffect, useRef, useState } from 'react';
import useAxiosPrivate from '@/hooks/useAxiosPrivate';
import { useSearchParams } from 'next/navigation';
import videojs from 'video.js';

import 'video.js/dist/video-js.css';
import '@videojs/themes/dist/fantasy/index.css';
import { Button } from '@/components/ui/button';

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

const ContentPlayer = ({ noPremium, token, selectedVideo }) => {

  const playerRef = useRef(null);
  const [isClient, setIsClient] = useState(false);


  const videoJsOptions = {
    controls: true,
    width: '100%',
    height: 400,
    responsive: true,
    fill: true,
    sources: [],
  };

  console.log(selectedVideo?.signed_url, "{}")

  useEffect(() => {

    setIsClient(true);


    function setPlayer() {
  
      if (selectedVideo && selectedVideo.signed_url) {
        videoJsOptions.sources = [
          {
            src: selectedVideo.signed_url,
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
          player.poster(selectedVideo.asset?.thumbnail);
        }
      }
    }

    setPlayer()

  }, [selectedVideo]);


  return (
    <div className='aspect-video relative border bg-black'>

      <div className="aspect-video">
        <video poster={selectedVideo?.asset?.thumbnail && selectedVideo?.asset?.thumbnail} ref={playerRef} className="video-js vjs-theme-fantasy " />

        {
          // selectedVideo?.asset && selectedVideo?.price === 0 ?
          //   :
            // <div className='bg-gray-200 aspect-video  flex items-center flex-col justify-center'>
            //   <p className='text-sm font-semibold'>This is a Premium Product</p>
            //   <Button className='bg-subcolor '>Buy Video for 19.99$</Button>
            // </div>

        }
      </div>

    </div>
  );
};

export default React.memo(ContentPlayer);
