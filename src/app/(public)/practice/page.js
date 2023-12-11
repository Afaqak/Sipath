'use client'
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import useAxios from '@/hooks/useAxios';
import Image from 'next/image';

const Practice = () => {
  const [categoriesData, setCategoriesData] = useState([]);

  const axios = useAxios()
  useEffect(() => {
    const fetchCategories = async () => {

      try {
        const response = await axios.get('/categories');
     
        setCategoriesData(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div className="pb-8 overflow-visible w-[90%] mx-auto relative">
      <h2 className="text-center font-bold mt-16 text-lg">Quiz Categories</h2>
      <div className="py-8 grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 cursor-pointer 2xl:grid-cols-5 gap-4">
        {categoriesData.map((data) => (
          <Link
            key={data.id}
            href={`/practice/${data.category?.toLowerCase()}?id=${data?.id}`}
            className="flex flex-col items-center justify-center box-shadow-main mb-2 p-4 rounded-md bg-white h-44"
          >
            <Image
              className="w-24 h-20 object-contain"
              src={`/svgs/${data.category?.toLowerCase()}.svg`}
              width={80}
              height={80}
              alt={data.category}
            />
            <h1 className="text-xl font-semibold mt-4 text-black">{data.category}</h1>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Practice;
