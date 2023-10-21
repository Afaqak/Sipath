'use client';
import React, { useEffect, useState } from 'react';
import { Video, LoadingSkeletons } from '@/components';

export const VideoGallery = ({ videos }) => {
  return (
    <div className="pt-8 pb-8 overflow-visible relative w-[90%] mx-auto">
      {loading && <LoadingSkeletons times={10} />}
      <Video videos={videos} title="New Uploads" load={true} />
    </div>
  );
};
