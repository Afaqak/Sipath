'use client';
import React, { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { VideoItem, ExpertItem } from '@/components';

import 'swiper/css';
import 'swiper/css/pagination';
export function Carousel({ items, contentComponent }) {

  return (
    <Swiper
      pagination={{
        clickable: true,
      }}
      navigation={true}
      spaceBetween={40}
      breakpoints={{
        300: {
          slidesPerView: 'auto',
          spaceBetween: 25,
        },
        640: {
          slidesPerView: 'auto',
        },
        1024: {
          slidesPerView: 'auto',
          spaceBetween: 20,
        },
        1280: {
          slidesPerView: 'auto',
          spaceBetween: 20,
        },
      }}
      className="mySwiper"
    >
      {
      items.map((item,index) => (
        <SwiperSlide
          className={`carousel-slide ${contentComponent === ExpertItem ? 'lg:ml-14 ' : ''}`}
          key={index}
        >
          
          {
          React.createElement(contentComponent, {
            ...getContentProps(contentComponent, item),
          })}
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

function getContentProps(contentComponent, item) {
  if (contentComponent === VideoItem) {
    return { video: item };
  } else if (contentComponent === ExpertItem) {
    return { item };
  }

  return {};
}
