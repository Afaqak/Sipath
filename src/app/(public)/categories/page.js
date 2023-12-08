'use client'

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import useAxiosPrivate from '@/hooks/useAxiosPrivate';
import { useCategories } from '@/hooks/useCategories';

const CategoriesPage = () => {
  // const [categoriesData, setCategoriesData] = useState([]);
  const [isMounted,setIsMounted]=useState(false)
  const axios=useAxiosPrivate()
  const categories=useCategories()

  useEffect(()=>setIsMounted(true),[])

  // useEffect(() => {
  //   const fetchCategories = async () => {
    
  //     try {
  //       const response = await axios.get('/categories');
     
  //       setCategoriesData(response.data);
  //     } catch (error) {
  //       console.error('Error fetching categories:', error);
  //     }
  //   };

  //   fetchCategories();
  // }, []);
  if(!isMounted) return null
  
  return (
    <div className='my-8 overflow-visible relative w-[90%] mx-auto'>

      <div className=" grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 cursor-pointer 2xl:grid-cols-5 gap-4">
        {categories.map((data) => (
          <Link
            key={data.id}
            href={`/categories/${data.category?.toLowerCase()}?id=${data?.id}`}
            className="flex flex-col items-center justify-center shadow-lg mb-2 p-4 box-shadow-main rounded-md bg-white h-44"
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

export default CategoriesPage;
