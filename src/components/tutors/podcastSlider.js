'use client';
import React, { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import Image from 'next/image';

export function PodcastSlider({ videos }) {
  console.log(videos);
  const livePodcastIndex = videos.findIndex((video) => video.livepodcast);

  return (
    <Swiper
      breakpoints={{
        300: {
          slidesPerView: 1,
          spaceBetween: 25,
        },
        640: {
          slidesPerView: 2,
          spaceBetween: 30,
        },
        1024: {
          slidesPerView: 2,
          spaceBetween: 0,
        },
        1280: {
          slidesPerView: 3,
        },
      }}
      slidesPerView={2}
      pagination={{ clickable: true }}
      className="mySwiper mt-8"
    >
      {videos.map((video, index) => (
        <SwiperSlide key={index} className="self-end ">
          {index === livePodcastIndex && <h2 className="font-bold text-xl mb-3">Live</h2>}
          {index === 1 && !livePodcastIndex && (
            <h2 className="font-bold text-xl mb-3">Upcoming Podcasts</h2>
          )}
          <div className="">
            <VideoItem video={video} />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

export const VideoItem = ({ video }) => (
  <div className="min-h-64 self-end relative  w-full md:w-[90%]  mb-6 p-4 bg-white shadow-md rounded-md">
    {video?.livepodcast && (
      <span className="absolute top-6 z-[1000] right-6 bg-[#FB3C22] flex gap-1 items-center py-[0.20rem] rounded-xl text-sm text-white px-2 font-medium">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-5 h-5"
        >
          <circle cx="12" cy="12" r="9" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="12" cy="12" r="5" fill="white" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        Live
      </span>
    )}

    {video?.price && (
      <span className="absolute top-2 z-[1000] left-0 bg-green-700 py-1 rounded-r-md text-white px-5 font-medium">
        {video?.price}$
      </span>
    )}

    <div className="relative">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="black"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z"
        />
      </svg>
      <Image
        src={video?.thumbnail}
        alt={video?.thumbnail}
        width={300}
        height={200}
        className="rounded-md object-cover w-full h-40"
      />
    </div>

    <div className="mt-3 flex gap-2 items">
      <Image
        src="/demo-1.jpg"
        alt="demo"
        className="rounded-full mt-1 w-8 h-8 object-cover"
        width={32}
        height={32}
      />
      <div>
        <h1 className="text-lg font-semibold mb-[0.20rem] line-clamp-2">{video.title}</h1>
        <div className="flex items-center text-sm gap-2 text-gray-700">
          <span>{video.account}</span>
        </div>
        {video.livepodcast ? (
          <div className="flex items-center text-sm gap-2 text-gray-700">
            <span>{video.views} views</span>
            <span>&bull;</span>
            <span>2 hours ago</span>
            <span>&bull;</span>
            <div className="flex items-center">
              4.7{' '}
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="orange"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="none"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
                  />
                </svg>
              </span>
            </div>
          </div>
        ) : (
          <div className="flex gap-4 items-center">
            <p className="text-[#616161]">Live on 22/05/23 - 09:30am</p>
            <Image src={'/svgs/bell.svg'} alt="bell" width={18} height={18} />
          </div>
        )}
      </div>
    </div>
    {video.livepodcast ? (
      <button className="text-black border-2 w-full border-green-600 py-[0.20rem] px-8 rounded-md mt-2">
        Join Now
      </button>
    ) : (
      <button className="text-black border-2 w-full border-black py-[0.20rem] px-8 rounded-md mt-2">
        Claim Free Ticket
      </button>
      //
    )}
  </div>
);
