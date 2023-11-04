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
import { SubjectDropDown } from '../common/subjectDropdown';
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
        <SubjectDropDown onValueChange={onChange} placeholder={"Select Subject"} selectedValue={subject}/>
       
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
