'use client';

import { NewQuizBodyRow, UploadQuizRow } from '@/components';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createQuiz } from '@/features/quiz/quizThunk';
import { errorToast, successToast } from '@/utils/toasts';
import useAxiosPrivate from '@/hooks/useAxiosPrivate';
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
  console.log(quizFile, 'u');

  const onSuccess = () => {
    successToast('Quiz Added Successfully!');
    setQuizTitle('');
    setSelectedSubject('');
    setQuizFile(null);
    setQuizSolutionFiles(null);
    setThumbnailFile(null);
  };

  const onError = () => {
    errorToast('Error uploading Quiz!');
  };

  const handlePublish = async () => {
    if (!quizTitle || !selectedSubject || !quizFile || !quizSolutionFiles || !thumbnailFile) {
      errorToast('Please fill in all required fields.');
      return;
    }

    let errors = [];

    if (!quizFile.type.startsWith('application/pdf')) {
      errors.push('Quiz file must be a PDF.');
    }

    if (!quizSolutionFiles.type.startsWith('application/pdf')) {
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

    const formData = new FormData();
    formData.append('title', quizTitle);
    formData.append('quiz', quizFile);
    formData.append('quiz_solutin', quizSolutionFiles);
    formData.append('thumbnail', thumbnailFile);
    formData.append('subject', selectedSubject);

    try {
      dispatch(createQuiz({ token: user?.token, data: formData, onSuccess, onError }));

      console.log(response.data);
    } catch (err) {
    } finally {
    }
  };

  return (
    <div className="relative w-[90%] lg:w-[60%] mx-auto">
      <div className=" mt-16 bg-white flex uppercase flex-col gap-4 p-4 rounded-md shadow-md">
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
