'use client';
import React, { useEffect, useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import { Book } from '@/components';
import 'swiper/css';
import 'swiper/css/pagination';
import useAxiosPrivate from '@/hooks/useAxiosPrivate';
import { useSession } from 'next-auth/react';

export function BookSlider() {
  const axios = useAxiosPrivate();
  const [books, setBooks] = useState([]);
  const { data: user } = useSession();
  console.log(user?.tutor?.tutor_id);

  useEffect(() => {
    const fetchBooks = async () => {
      const response = await axios.get(`/assets/books/tutor/${user?.tutor?.tutor_id}`);
      setBooks(response.data);
    };
    fetchBooks();
  });
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
      {books &&
        books.map((book) => (
          <SwiperSlide>
            <Book book={book} />
          </SwiperSlide>
        ))}
    </Swiper>
  );
}
