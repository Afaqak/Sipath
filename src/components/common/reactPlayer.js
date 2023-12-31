'use client';
import React, { useEffect, useRef, useState } from 'react';
import useAxios from '@/hooks/useAxios';
import { useParams, useRouter, useSearchParams } from 'next/navigation';


import videojs from 'video.js';
import 'video.js/dist/video-js.css';
import '@videojs/themes/dist/fantasy/index.css';
import { Button } from '@/components/ui/button';
import { BuyNowModal } from '../modals/paymentModal';

import { initializeStripe, redirectToCheckout } from '@/utils/stripeUtils';



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
  const axios = useAxios()
  const playerRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false)
  const currentUrl =  typeof window!=='undefined'? window.location.href:"";
  const baseUrlWithoutQueryParams = currentUrl.split('?')[0];
  const [stripe, setStripe] = useState(null);

  useEffect(() => {
    initializeStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY).then((stripeInstance) => {
      setStripe(stripeInstance);
    });
  }, []);




  const videoJsOptions = {
    controls: true,
    width: '100%',
    height: 400,
    responsive: true,
    fill: true,
    sources: [],
  };

  const onBuyNowSubmit = async (onDone) => {
    try {

      const response = await axios.post("/purchases/create-checkout-session?type=video", {
        asset_id: selectedVideo?.asset?.id,
        return_url: baseUrlWithoutQueryParams
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      const {  sessionId } = response.data;

      await redirectToCheckout(stripe, sessionId);

    } catch (err) {
      console.log(err)
    } finally {
      if (onDone && typeof onDone === 'function') {
        onDone()
      }
    }
  }



  useEffect(() => {


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


      {
        (selectedVideo?.asset?.price > 0 && !selectedVideo?.signed_url) ?
          <div className='bg-gray-200 aspect-video  flex items-center flex-col justify-center'>
            <p className='text-sm font-semibold'>This is a Premium Product</p>
            <Button onClick={() => setIsOpen(true)} className='bg-subcolor hover:bg-subcolor/90'>Buy Video for {selectedVideo?.asset?.price}$</Button>
        </div> :
          <div className="aspect-video">
            <video autoPlay preload='auto' poster={selectedVideo?.asset?.thumbnail && selectedVideo?.asset?.thumbnail} ref={playerRef} className="video-js vjs-theme-fantasy" />
          </div>
      }
      {/* <SuccessfullPurchaseModal isOpen={isSuccessModalOpen} setIsOpen={setIsSuccessModalOpen} /> */}
      <BuyNowModal productName={selectedVideo?.asset?.title} productPrice={selectedVideo?.asset?.price} onBuyNowSubmit={onBuyNowSubmit} isOpen={isOpen} setIsOpen={setIsOpen} />
    </div>
  );
};

export default React.memo(ContentPlayer);
