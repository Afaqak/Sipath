'use client';

import { FileInput } from '@/components';
import React, { useState } from 'react';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { errorToast, successToast } from '@/utils/toasts';
import useAxiosPrivate from '@/hooks/useAxiosPrivate';

const NewQuiz = () => {
  const [quizTitle, setQuizTitle] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');
  const [quizSolutionFiles, setQuizSolutionFiles] = useState(null);
  const [quizFile, setQuizFile] = useState(null);
  const [thumbnailFile, setThumbnailFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const axios = useAxiosPrivate();
  console.log(quizFile, 'u');
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
      const response = await axios.post(`/upload/quiz`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      if (response.status === 200) {
        successToast('Quiz Added Successfully!');
        setQuizTitle('');
        setSelectedSubject('');
        setQuizFile(null);
        setQuizSolutionFiles(null);
        setThumbnailFile(null);
      }
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

const NewQuizBodyRow = ({ quizTitle, setQuizTitle, selectedSubject, setSelectedSubject }) => {
  return (
    <div className="flex gap-4 text-[#616161] font-light">
      <div className="flex flex-col">
        <label className="text-sm font-light">Quiz title</label>
        <input
          placeholder="ENTER TITLE"
          className="shadow-[inset_2px_2px_7px_rgba(0,0,0,0.1)] w-48 rounded-md px-3 py-1 placeholder:text-sm border-none focus:outline-none"
          type="text"
          value={quizTitle}
          onChange={(e) => setQuizTitle(e.target.value)}
        />
      </div>
      <div className="flex flex-col">
        <label className="text-sm text-[#616161] font-light">Subject</label>
        <Select onValueChange={setSelectedSubject} defaultValue={selectedSubject}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select a Subject" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Subjects</SelectLabel>
              <SelectItem value="1">English</SelectItem>
              <SelectItem value="2">Chemistry</SelectItem>
              <SelectItem value="3">Physics</SelectItem>
              <SelectItem value="4">Science</SelectItem>
              <SelectItem value="5">Maths</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

const UploadQuizRow = ({
  quizSolutionFiles,
  setQuizSolutionFiles,
  thumbnailFile,
  setThumbnailFile,
  quizFile,
  setQuizFile,
}) => {
  return (
    <div className="flex gap-4">
      <div className="flex flex-col">
        <label className="text-sm text-[#616161] font-light">Upload Quiz</label>
        <FileInput setFile={setQuizFile} file={quizFile} />
      </div>
      <div className="flex flex-col">
        <label className="text-sm text-[#616161] font-light">Upload Quiz Solution</label>
        <FileInput setFile={setQuizSolutionFiles} file={quizSolutionFiles} />
      </div>
      <div className="flex flex-col">
        <label className="text-sm text-[#616161] font-light">Upload Thumbnail</label>
        <FileInput setFile={setThumbnailFile} file={thumbnailFile} />
      </div>
    </div>
  );
};

export default NewQuiz;
