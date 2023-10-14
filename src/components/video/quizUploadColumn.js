'use client';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { FileInput } from '../tutors/fileInput';
export const QuizUploadColumn = ({
  onChange,
  subject,
  setQuiz,
  quiz,
  quizSolution,
  setQuizSolution,
}) => {
  console.log(quizSolution);
  return (
    <div className="flex flex-col justify-between mb-4 lg:mb-0 lg:items-center uppercase gap-2 text-[#616161] font-light">
      <div className="flex flex-col">
        <label className="text-sm">Subject</label>
        <Select onValueChange={onChange} value={subject?.toString()}>
          <SelectTrigger className="w-[200px]">
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
      <div className="flex flex-col">
        <label className="text-sm">Upload Quiz</label>
        <FileInput file={quiz} setFile={setQuiz} />
      </div>
      <div className="flex flex-col">
        <label className="text-sm">Upload Quiz Solution</label>
        <FileInput file={quizSolution} setFile={setQuizSolution} />
      </div>
    </div>
  );
};
