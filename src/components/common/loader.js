import React, { useState } from 'react';
import { Icons } from '../icons';
export const Loader = () => {

  return (<div className='min-h-[80vh] flex items-center justify-center'>
    <div className='flex gap-4 items-center'>
      <div className=''>
        <Icons.colorLoader stroke="black" width="36" height="36" className="" />
      </div>
      <p className='text-xl font-semibold'>Loading...</p>
    </div>
  </div>)
};
