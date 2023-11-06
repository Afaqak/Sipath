'use client'
import React from 'react';
import { Quiz } from '@/components';
import { useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import axios from '../../../utils/index';
const QuizesPage = () => {
  const categoryParams = useSearchParams()
  const categoryId = categoryParams.get('id')
  const [quizzes, setQuizzes] = useState([])
  useEffect(() => {
    const fetchQuizFromCategory = async () => {
      const response = await axios.get(`/categories/${categoryId}/content?type=quizzes`)
      
      setQuizzes(response?.data)
    }
    fetchQuizFromCategory()
  }, [])
  return (
    <div className="lg:w-[70%] w-[85%]  mx-auto py-8">
      <div className="flex">
        <input
          placeholder="Search..."
          type="text"
          className="w-full px-2 focus:outline-none border-none py-1 rounded-l-md shadow-[inset_1px_2px_4px_rgba(0,0,0,0.1)]"
        />
        <div className="bg-white px-4 flex items-center border-2 border-gray-300 rounded-r-md">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6 p-1"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            />
          </svg>
        </div>
      </div>
      {quizzes?.map((quiz, ind) => (

        <Quiz key={ind} quiz={quiz} />
      ))}
    </div>
  );
};

export default QuizesPage;
