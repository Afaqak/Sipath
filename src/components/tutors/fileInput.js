'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import { Icons } from '../icons';

export const FileInput = ({ file, setFile, disabled = false ,isMultiple=false}) => {

  const inputRef = useRef(null);

  const handleChooseFile = () => {
    inputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setFile(file);
  };

  return (
    <div className="relative">
      <input
        disabled={disabled}
        type="file"
        ref={inputRef}
        className="hidden"
        multiple={isMultiple}
        onChange={handleFileChange}
      />

      <div className="shadow-[inset_2px_2px_7px_rgba(0,0,0,0.1)]  text-ellipsis z-[20] truncate  lg:w-48 py-1 rounded-md px-2 placeholder:text-sm border-none focus:outline-none">
        {!file ? (
          <span
            className="font-semibold flex gap-2 whitespace-nowrap left-[2%] bg-[#D9D9D9] text-black text-sm cursor-pointer px-4 py-[0.12rem] rounded-md"
            onClick={handleChooseFile}
          >
            CHOOSE FILE <Image src={'/svgs/upload_file.svg'} width={15} height={15} alt="file" />
          </span>
        ) : (
          <div className="relative">
            <p
              className="font-semibold relative text-[0.8rem] text-green-500 cursor-pointer"
              onClick={handleChooseFile}
              style={{
                width: '100%',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}
            >
              {file?.name || file.toString()}
            </p>
            <Icons.trash
              onClick={() => setFile(null)}
              className="absolute h-[0.86rem] w-[0.86rem] -right-[0.47rem] top-[2px] cursor-pointer"
            />
          </div>
        )}
      </div>
    </div>
  );
};
