'use client';

import { NewQuizBodyRow, UploadQuizRow } from '@/components';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createQuiz } from '@/features/quiz/quizThunk';
import { errorToast, successToast } from '@/utils/toasts';
import { ClipLoader } from 'react-spinners';
import { useSession } from 'next-auth/react';
const NewQuiz = () => {
  const dispatch = useDispatch();
  const [quizTitle, setQuizTitle] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');
  const [quizSolutionFiles, setQuizSolutionFiles] = useState(null);
  const [quizFile, setQuizFile] = useState(null);
  const [thumbnailFile, setThumbnailFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const { data: user } = useSession();

  const onSuccess = () => {
    successToast('Quiz Added Successfully!');
    setQuizTitle('');
    setSelectedSubject('');
    setQuizFile(null);
    setQuizSolutionFiles(null);
    setLoading(false);
    setThumbnailFile(null);
  };

  const onError = () => {
    errorToast('Error uploading Quiz!');
    setLoading(false);
  };

  const handlePublish = async () => {
    if (!quizTitle || !selectedSubject || !quizFile || !quizSolutionFiles || !thumbnailFile) {
      errorToast('Please fill in all required fields.');
      return;
    }

    let errors = [];

    if (quizFile.type.startsWith('image/')) {
      errors.push('Quiz file must be a PDF.');
    }

    if (quizSolutionFiles.type.startsWith('image/')) {
      errors.push('Quiz solution file must be a PDF.');
    }

    if (!thumbnailFile.type.startsWith('image/')) {
      errors.push('Thumbnail must be an image.');
    }

    if (errors.length > 0) {
      errors.forEach((error) => {
        errorToast(error);
      });
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append('title', quizTitle);
    formData.append('quiz', quizFile);
    formData.append('quiz_solution', quizSolutionFiles);
    formData.append('thumbnail', thumbnailFile);
    formData.append('subject', selectedSubject);

    try {
      dispatch(createQuiz({ token: user?.token, data: formData, onSuccess, onError }));

    } catch (err) {
    } finally {
    }
  };

  return (
    <div className="relative w-[90%] lg:w-[60%] mx-auto">
      
      <div className=" mt-16 bg-white flex uppercase flex-col gap-4 p-4 rounded-md shadow-md">
      <h1 className="text-2xl font-semibold mb-4 border-b pb-2">New Quiz</h1>
        {loading && (
          <div className="absolute flex items-center justify-center bg-gray-100 bg-opacity-80 z-[1000] top-0 left-0 h-full w-full">
            <div className="bg-white p-4 flex flex-col gap-4 items-center justify-center rounded-md shadow-md">
              <ClipLoader color="black" />
            </div>
          </div>
        )}
        <NewQuizBodyRow
          quizTitle={quizTitle}
          setQuizTitle={setQuizTitle}
          selectedSubject={selectedSubject}
          setSelectedSubject={setSelectedSubject}
        />
        <UploadQuizRow
          quizSolutionFiles={quizSolutionFiles}
          setQuizSolutionFiles={setQuizSolutionFiles}
          thumbnailFile={thumbnailFile}
          setThumbnailFile={setThumbnailFile}
          quizFile={quizFile}
          setQuizFile={setQuizFile}
        />
      </div>
      <div className="flex justify-end">
        <button className="bg-black rounded-md px-8 mt-4 py-1 text-white" onClick={handlePublish}>
          Publish
        </button>
      </div>
    </div>
  );
};

export default NewQuiz;
