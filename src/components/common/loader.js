import { ClipLoader } from 'react-spinners';
import React from 'react';

export const Loader = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-white">
      <ClipLoader loading={true} color={'#000'} size={40} />
    </div>
  );
};
