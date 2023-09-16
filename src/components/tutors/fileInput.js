'use client';

import React, { useRef } from 'react';
import Image from 'next/image';

export const FileInput = ({ file, setFile }) => {
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
      <input type="file" ref={inputRef} className="hidden" onChange={handleFileChange} />
      <input
        type="text"
        className="shadow-[inset_2px_2px_7px_rgba(0,0,0,0.1)] w-48 rounded-md px-2 py-1 placeholder:text-sm border-none focus:outline-none"
        readOnly
      />
      {!file ? (
        <span
          className="font-semibold absolute flex gap-2 top-1/2 whitespace-nowrap left-[2%] transform -translate-y-1/2 bg-[#D9D9D9] text-black text-sm cursor-pointer px-4 py-[0.12rem] rounded-md"
          onClick={handleChooseFile}
        >
          CHOOSE FILE <Image src={'/svgs/upload_file.svg'} width={15} height={15} alt="file" />
        </span>
      ) : (
        <span
          className="font-semibold absolute overflow-hidden flex gap-2 top-1/2 whitespace-nowrap transform -translate-y-1/2 text-green-500  text-sm cursor-pointer px-4 py-[0.12rem] rounded-md"
          onClick={handleChooseFile}
        >
          {file?.name}
        </span>
      )}
    </div>
  );
};
