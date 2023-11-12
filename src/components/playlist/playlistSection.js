'use client'
import React, { useState } from 'react';
import { PlaylistItem } from '@/components';



export const PlaylistSection = ({
  sectionTitle,
  token,
  sectionDuration,
  videos,
  index,
  onClick,
  setVideoId,
  enrollments,
  setEnrollments,
  isButtonToggled,
}) => {

  return (
    <div className="rounded-md bg-white p-4 mb-4 shadow-md">
      <header onClick={onClick} className="cursor-pointer">
        <h2 className="font-semibold">{`Section ${index + 1} : ${sectionTitle}`}</h2>
        <p className="text-sm">{sectionDuration}</p>
      </header>

        {isButtonToggled && (
          <ul className="text-sm pt-4 border-t mt-4">
            {videos &&
              videos?.map((item) => (
                <PlaylistItem
                  enrollments={enrollments}
                  setEnrollments={setEnrollments}
                  id={item?.id}
                  token={token}
                  setVideoId={setVideoId}
                  key={item?.id}
                  title={item?.title}
                  duration={item?.subject}
                />
              ))}
          </ul>
        )}

    </div>
  );
};
