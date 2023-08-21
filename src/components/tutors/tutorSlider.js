'use client';
import React, { useRef, useState } from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';

export function TutorSlider() {
  return (
    <Swiper
      slidesPerView={3}
      spaceBetween={30}
      pagination={{
        clickable: true,
      }}
      breakpoints={{
        300: {
          slidesPerView: 1,
        },
        640: {
          slidesPerView: 2,
        },

        1024: {
          slidesPerView: 2,
        },
      }}
      className="mySwiper"
    >
      {/* {videos.map((video) => (
        <SwiperSlide className="customSlide" key={video.id}>

        </SwiperSlide>
      ))} */}
      <SwiperSlide>1</SwiperSlide>
    </Swiper>
  );
}
