import { ClipLoader } from 'react-spinners';
import React from 'react';

export const Loader = ({ message, subMessage }) => {
  return (
    <div className="fixed top-0 left-0 w-screen h-screen flex flex-col items-center justify-center bg-black bg-opacity-80">
      <div className="bg-white p-6 rounded-lg w-64 shadow-lg text-center">
        <ClipLoader loading={true} color={'#1850BC'} size={40} />
        <p className="text-xl font-semibold mt-4">{message}</p>
        <p className="text-gray-600 text-sm mt-2">{subMessage}</p>
      </div>
    </div>
  );
};
