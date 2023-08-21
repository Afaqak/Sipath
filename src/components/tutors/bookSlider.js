'use client';
import React, { useRef, useState } from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import { Book } from '@/components';
import 'swiper/css';
import 'swiper/css/pagination';

export function BookSlider() {
  return (
    <Swiper
      slidesPerView={3}
      autoplay={true}
      spaceBetween={30}
      pagination={{
        clickable: true,
      }}
      modules={[Autoplay]}
      breakpoints={{
        300: {
          slidesPerView: 1,
        },
        640: {
          slidesPerView: 1,
        },

        1024: {
          slidesPerView: 2,
        },
      }}
      className="mySwiper"
    >
      <SwiperSlide>
        <Book />
      </SwiperSlide>
      <SwiperSlide>
        <Book />
      </SwiperSlide>
      <SwiperSlide>
        <Book />
      </SwiperSlide>
      <SwiperSlide>
        <Book />
      </SwiperSlide>
    </Swiper>
  );
}
