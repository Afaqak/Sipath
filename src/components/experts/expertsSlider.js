'use client';

import React, { useRef } from 'react';
import { ExpertItem, Carousel } from '@/components';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';

export function ExpertsSlider({ videos }) {
  return (
    <Swiper
      breakpoints={{
        300: {
          slidesPerView: 'auto',
        },
        640: {
          slidesPerView: 'auto',
        },
        1024: {
          slidesPerView: 'auto',
        },
        1280: {
          slidesPerView: '4',
        },
      }}
      slidesPerView={2}
      pagination={{ clickable: true }}
      className="mySwiper"
    >
      <Carousel items={videos} contentComponent={ExpertItem} />
    </Swiper>
  );
}
