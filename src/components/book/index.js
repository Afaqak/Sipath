import { FileInput } from '@/components';
import { useState, useRef ,useEffect} from 'react';
import { SubjectDropDown } from '@/components'
import axios from '@/utils/index'
export const NewBookBodyColumn = ({
  bookTitle,
  bookDescription,
  setBookDescription,
  setBookTitle,
}) => {


  return (
    <div className="flex flex-col gap-4 text-sm">
      <div className="flex flex-col">
        <label className="text-[#616161] font-light">BOOK TITLE</label>

        <input
          value={bookTitle}
          onChange={setBookTitle}
          placeholder="Enter title..."
          className={`shadow-[inset_2px_1px_6px_rgba(0,0,0,0.2)] rounded-md px-3 py-1 placeholder:text-sm border-none focus:outline-none `}
          type="text"
        />
      </div>
      <div className="flex flex-col">
        <label className="text-[#616161] font-light">DESCRIPTION</label>

        <textarea
          onChange={setBookDescription}
          rows={4}
          value={bookDescription}
          cols={4}
          placeholder="Enter description"
          className={`shadow-[inset_2px_1px_6px_rgba(0,0,0,0.2)] rounded-md px-3 py-1 placeholder:text-sm border-none focus:outline-none resize-none }`}
        />
      </div>
    </div>
  );
};

export const CoverPreview = ({ thumbnail, setThumbnail }) => {
  const [coverImage, setCoverImage] = useState(null);
  const inputRef = useRef(null);

  const handleFileInputChange = () => {
    inputRef.current.click();
  };

  const handleFileSelected = (event) => {
    const file = event.target.files[0];
    setThumbnail(file);
    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setCoverImage(reader.result);
      };

      reader.readAsDataURL(file);
    }
  };

  return (
    <div
      onClick={handleFileInputChange}
      className="bg-[#D9D9D9] text-sm font-bold text-center flex items-center h-48 md:h-auto md:w-32 rounded-md justify-center"
    >
      {thumbnail ? (
        <img
          src={URL.createObjectURL(thumbnail)}
          alt="Cover Preview"
          className="w-full h-full rounded-md object-contain"
        />
      ) : (
        <>
          Cover <br /> Preview
        </>
      )}
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelected}
        className="hidden"
      />
    </div>
  );
};

export const UploadBookColumn = ({
  setBookFile,
  bookFile,
  isDownloadable,
  setIsDownloadable,
  subject,
  setSubject,

}) => {


  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col text-sm">
        <label className="text-sm text-[#616161] font-light">SUBJECT</label>
        <SubjectDropDown selectedValue={subject} onValueChange={setSubject} placeholder={"Select Subject"}/>
      </div>
      <div className="flex flex-col text-sm text-[#616161] font-light">
        <label className="">UPLOAD BOOK FILE</label>
        <FileInput file={bookFile} setFile={setBookFile} />
        <div className="mt-3">
          <label className="cursor-pointer flex gap-2 items-center">
            <input
              onChange={() => setIsDownloadable(!isDownloadable)}
              type="checkbox"
              className="form-checkbox h-4 w-4 text-blue-600"
            />
            <span>ALLOW DOWNLOAD</span>
          </label>
        </div>
      </div>
    </div>
  );
};
