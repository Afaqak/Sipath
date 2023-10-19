import { FileInput } from '@/components';
import React from 'react';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export const NewQuizBodyRow = ({
  quizTitle,
  setQuizTitle,
  selectedSubject,
  setSelectedSubject,
}) => {
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

export const UploadQuizRow = ({
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
