import { FileInput } from '@/components';
import React, { useEffect, useState } from 'react';

import { SubjectDropDown } from '../common/subjectDropdown';

export const NewQuizBodyRow = ({
  quizTitle,
  setQuizTitle,
  selectedSubject,
  setSelectedSubject,
}) => {

  return (
    <div className="flex flex-col md:flex-row gap-4 text-[#616161] font-light text-sm">
      <div className="flex flex-col">
        <label className="text-sm font-light">Quiz title</label>
        <input
          placeholder="ENTER TITLE"
          className="shadow-[inset_2px_2px_7px_rgba(0,0,0,0.1)] text-sm w-48 rounded-md px-3 py-1 placeholder:text-sm border-none focus:outline-none"
          type="text"
          value={quizTitle}
          onChange={(e) => setQuizTitle(e.target.value)}
        />
      </div>
      <div className="flex flex-col">
        <label className="text-sm text-[#616161] font-light">Subject</label>
        <SubjectDropDown  selectedValue={+selectedSubject} placeholder={"Select Subject"} onValueChange={setSelectedSubject}/>
      </div>
    </div>
  );
};

export const UploadQuizRow = ({
  quizSolutionFiles,
  setQuizSolutionFiles,
  thumbnailFile,
  setThumbnailFile,
  quizFile,
  setQuizFile,
}) => {
  return (
    <div className="flex gap-4 flex-col md:flex-row">
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
