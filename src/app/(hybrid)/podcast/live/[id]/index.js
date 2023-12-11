'use client';
import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { useSearchParams,usePathname } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { socket } from '@/socket';
import { motion } from 'framer-motion';
import { LiveMessages, Icons } from '@/components';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import useAxios from '@/hooks/useAxios';
import { initializeStripe, redirectToCheckout } from '@/utils/stripeUtils';
import { SuccessfullPurchaseModal } from '@/components/modals/successfullPurchaseModal';
import { BuyNowModal } from '@/components/modals/paymentModal';
const Live = ({ podcast: pod }) => {
  const params = useSearchParams()
  const room = params.get('room');
  const pathname=usePathname()
  const { data: user } = useSession();
  const videoContainerRef = useRef(null);
  const axios = useAxios()
  const router = useRouter();
  const [peerState, setPeerState] = useState({ peer: null, initialized: false });
  const session_id = room?.split('?')[1]
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [stripe, setStripe] = useState(null);
  const [isOpen, setIsOpen] = useState(false)
  const [localStream, setLocalStream] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [videoMuted, setVideoMuted] = useState(false);
  const [audioMuted, setAudioMuted] = useState(false);
  const [podcast, setPodcast] = useState(pod)
  const [callEnded, setCallEnded] = useState(false)
  const [showJoinScreen, setShowJoinScreen] = useState(true);
  const [storedStream, setStoredStream] = useState(null)
  const [isClient,setIsClient]=useState(false)

  const cleanup = () => {
    if (peerState.peer) {
      peerState.peer.destroy();
      setPeerState((prevPeerState) => ({
        ...prevPeerState,
        peer: null,
        initialized: false,
      }));
    }

    if (localStream) {
      localStream.getTracks().forEach((track) => track.stop());
      localStream.getTracks().forEach((track) => localStream.removeTrack(track));
      localStream.getTracks().forEach((track) => track.stop());
      setLocalStream(null);
    }
  };

  const endCall = () => {
    console.log('end call')

    cleanup()

    socket.emit('end-call', { room });

    navigator.mediaDevices.enumerateDevices()
      .then(devices => console.log('Media Devices (after stopping tracks):', devices));
  };

  const initializeSocket = () => {
    socket.connect();
    socket.on('connect', () => {

    });

    socket.on('chat-message', (message) => {

      setMessages((prevMessages) => [...prevMessages, message]);
    });
    socket.on('call-ended', () => {
      setCallEnded(true)
      console.log('Call ended on receiver side');
      setTimeout(() => window.location.replace('/podcast'), 2000)
      cleanup();
      console.log('Cleanup completed on receiver side');

    });

  };

  useEffect(()=>{
    setIsClient(true)
  },[])



  useEffect(() => {
    initializeSocket();

    return () => {

      cleanup()

    }
  }, []);

  const initializePeer = async (podcastData) => {
    try {
      const module = await import('peerjs');
      const Peer = module.default;
      const tutorId = podcastData.tutor_id;

      if (user?.user?.isTutor && +user?.tutor?.tutor_id === +podcastData?.tutor_id) {
        const peer = new Peer(room);
        setPeerState({ peer, initialized: true });
        console.log(videoMuted)
        const videoConstraint = videoMuted ? false : { width: { min: 640, ideal: 1280 }, height: { min: 640, ideal: 720 } };

        const constraints = {
          video: videoConstraint,
          audio: audioMuted ? false : true,
        };
        console.log(constraints)
        if (!constraints['video'] && !constraints["audio"]) {
          return
        }


        navigator?.mediaDevices?.getUserMedia(constraints).then((stream) => {
          setLocalStream(stream);
          createVideoElement(stream);

          peer.on('connection', (conn) => {
            console.log('peer connected')
            console.log(conn.peer)
            conn.on('open', () => {
              peer.call(conn.peer, stream);
            });
          });

          socket.emit('broadcaster-connected', { id: tutorId, room });
        });
      } else {
        const peer = new Peer();
        setPeerState({ peer, initialized: true });

        peer.on('call', (call) => {
          call.on('stream', (remoteStream) => {
            console.log(remoteStream)

            setLocalStream(remoteStream);
            createVideoElement(remoteStream);
          });
          call.answer(null);
        });

        peer.on('open', () => {
          peer.connect(room);
          socket.emit('listener-connected', { id: peer.id, room });
          socket.emit('chat-message', { room, message: `${user?.user?.display_name} joined!` });
        });
      }
    } catch (error) {
      console.error('Error initializing Peer:', error);
    }
  };

  function onTutorJoinClick() {

    setShowJoinScreen(false)
    initializePeer(podcast)
  }

  function onJoinClick() {
    // if(!localStream) return
    setShowJoinScreen(false)
    initializePeer(podcast)
  }


  const createVideoElement = (stream) => {
    const video = document.createElement('video');
    video.muted = false;
    video.srcObject = stream;
    video.id = stream.id;
    video.style.width = '100%';
    video.style.height = '100%';
    video.style.objectFit = 'cover';

    video.addEventListener('loadedmetadata', () => {
      video.play();
      if (videoContainerRef?.current) {
        videoContainerRef.current.innerHTML = '';
        videoContainerRef.current.appendChild(video);
      }
    });
  };






  const toggleVideoMute = () => {
    const videoElem = videoContainerRef.current.querySelector('video');
    console.log(localStream)
    if (videoElem) {

      const videoTrack = localStream?.getVideoTracks()[0];
      videoTrack.enabled = videoMuted
      console.log(videoTrack, videoElem.srcObject)
      if (videoTrack) {
        console.log("check", videoMuted)

        if (!videoMuted) {

          const pastStream = localStream;
          // videoElem.srcObject = null;
          setStoredStream(pastStream);
        } else {
          console.log("here", storedStream)
          const streamToSet = storedStream || localStream;
          videoElem.srcObject = localStream;
        }
      }
    }

    setVideoMuted(!videoMuted);
  };

  const toggleAudioMute = () => {
    setAudioMuted((prevAudioMuted) => {
      if (localStream && localStream.getAudioTracks().length > 0) {
        localStream.getAudioTracks()[0].enabled = !prevAudioMuted;
      }
      return !prevAudioMuted;
    });
  };



  const sendMessage = (e) => {
    e.preventDefault();
    if (newMessage.trim() !== '') {
      socket.emit('chat-message', { room, message: newMessage, avatar: user?.user?.profile_image });
      setNewMessage('');
    }
  };

  const controlsStyles = {
    position: 'absolute',
    bottom: '10px',
    left: '50%',
    transform: 'translateX(-50%)',
    display: 'flex',
    alignItems: 'center',
    borderRadius: '5px',
    padding: '5px',
    zIndex: '5000',
  };

  const setPurchase = async () => {
    try {
      const response = await axios.post(`/purchases?${session_id}`, {
        asset_id: podcast.id,
        asset_type: "podcast"
      }, {
        headers: {
          Authorization: `Bearer ${user?.token}`
        }
      });
      router.replace(pathname)
      setIsSuccessModalOpen(true);
      setTimeout(() => {
        setIsSuccessModalOpen(false);
        router.replace(`/podcast/live/${podcast?.id}?room=${podcast?.room_id}`);
      }, 2500);

    } catch (err) {
      console.log('Error in setPurchase:', err);
    }
  };



  useEffect(() => {
    initializeStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY).then((stripeInstance) => {
      setStripe(stripeInstance);
    });
  }, []);

  useEffect(() => {
    console.log('checking---checking')
    console.log(session_id)
    if (session_id) {
      setShowJoinScreen(false)
      console.count('Session ID is not null:', session_id);
      setPurchase();
    }
  }, [session_id,isClient]);

  const onBuyNowSubmit = async (onDone) => {
    try {
      const response = await axios.post("/purchases/create-checkout-session?type=podcast", {
        asset_id: podcast?.id,
        return_url: window.location.href
      }, {
        headers: {
          Authorization: `Bearer ${user?.token}`
        }
      })

      const { sessionId } = response.data;

      await redirectToCheckout(stripe, sessionId);

    } catch (err) {
      console.log(err)
    } finally {
      if (onDone && typeof onDone === 'function') {
        onDone()
      }
    }
  }

  if(!isClient) return null

  return (
    <>
      {callEnded && <div className=' bg-white absolute top-0 left-0 w-full h-full flex gap-4 items-center justify-center z-[9000]'>

        <Icons.colorLoader />
        <p className=' text-xl font-semibold'>Stream Ending...</p></div>}
      <div className="grid grid-cols-1 relative lg:grid-cols-8">
        <div className="live-message col-span-5 relative lg:my-8 px-4 lg:px-0 lg:pl-8">
          {showJoinScreen && +user?.tutor?.tutor_id === +podcast?.tutor_id && (
            <div className="join-screen fixed z-[8000] bg-white  h-full w-full top-0 left-0 flex flex-col items-center justify-center ">
              <p className="text-2xl font-semibold mb-4">Welcome, Tutor!</p>
              <p className="text-lg mb-4">Before you start, please enable your audio and video.</p>

              <Button onClick={onTutorJoinClick} className="mt-4 bg-main rounded-full text-white text-lg hover:bg-main/90 cursor-pointer">
                Continue
              </Button>
            </div>
          )}
          {showJoinScreen && +user?.tutor?.tutor_id !== +podcast?.tutor_id && (
            <div className="join-screen fixed z-[8000] bg-white  h-full w-full top-0 left-0 flex flex-col items-center justify-center ">
              <p className="text-2xl font-semibold mb-4">Welcome!</p>

              <Button onClick={onJoinClick} className="mt-4 bg-main rounded-full text-white text-lg hover:bg-main/90 cursor-pointer">
                Join Stream
              </Button>
            </div>
          )}

          <div className={`group w-full lg:h-[75vh] group relative`}>
            {
              !(+user?.tutor?.tutor_id === +podcast?.tutor_id) && podcast?.price > 0 ? <div className='bg-gray-200 aspect-video  flex items-center flex-col justify-center'>
                <p className='text-sm font-semibold'>This is a Premium Product</p>
              
                <Button onClick={() => setIsOpen(true)} className='bg-subcolor hover:bg-subcolor/90'>Buy Video for {podcast?.price}$</Button>
              </div> :
                <div ref={videoContainerRef} id="video-container" className={`lg:h-[75vh]`}></div>
            }
            {!(+user?.tutor?.tutor_id === +podcast?.tutor_id) ? null : (
              <div
                style={controlsStyles}
                className=" transition-all z-[8000] duration-300 ease-in-out"
              >
                <button
                  onClick={toggleAudioMute}
                  className={`cursor-pointer relative h-10 w-10 flex items-center justify-center rounded-full  text-white ${audioMuted ? 'bg-red-600 bg-opacity-100' : 'bg-black  bg-opacity-30'
                    }`}
                >
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: audioMuted ? 30 : 0 }}
                    className="-rotate-[36deg] absolute transform -translate-y-1/2 left-1/2 top-1/2 -translate-x-1/2 w-[0.14rem] items-center flex justify-center bg-white"
                  ></motion.div>
                  <Icons.mic />
                </button>
                <button
                  className={`cursor-pointer h-10 relative w-10 flex ml-4 items-center justify-center rounded-full  text-white ${videoMuted ? 'bg-red-600 bg-opacity-100 ' : 'bg-black  bg-opacity-30'
                    }`}
                  onClick={toggleVideoMute}
                >
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: videoMuted ? 30 : 0 }}
                    className="-rotate-[36deg] absolute transform -translate-y-1/2 left-1/2 top-1/2 -translate-x-1/2 w-[0.14rem] items-center flex justify-center bg-white"
                  ></motion.div>
                  <Icons.switchVideo />
                </button>
                <button
                  onClick={endCall}
                  className={`cursor-pointer h-10 relative w-10 flex ml-4 items-center justify-center rounded-full  text-white bg-red-600 bg-opacity-100`}
                >
                  <Icons.endCall />
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="mt-8 col-span-3 overflow-y-scroll right-0 lg:w-[35%] relative lg:fixed h-[100vh]">
          <LiveMessages messages={messages} />
          <div className="bg-white  z-[4000] relative py-2 shadow-lg">
            <form onSubmit={sendMessage} className="flex gap-2 py-1 items-center justify-center">
              <input
                onChange={(e) => setNewMessage(e.target.value)}
                value={newMessage}
                className="rounded-md py-1 focus:outline-none w-[70%] placeholder:text-sm shadow-[inset_1px_4px_10px_rgba(0,0,0,0.1)] px-2"
                placeholder="Type here..."
                type="text"
              />
              <button type="submit">
                <Image src={'/svgs/send.svg'} alt="send" width={30} height={30} />
              </button>
            </form>
          </div>
        </div>
        <SuccessfullPurchaseModal isOpen={isSuccessModalOpen} setIsOpen={setIsSuccessModalOpen} />
        <BuyNowModal onBuyNowSubmit={onBuyNowSubmit} isOpen={isOpen} setIsOpen={setIsOpen} />
      </div>
    </>
  );
};

export default Live;






