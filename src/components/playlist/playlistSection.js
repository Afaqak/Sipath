import React, { useState } from 'react';
import { PlaylistItem } from '@/components';
import { motion, AnimatePresence } from 'framer-motion';

export const PlaylistSection = ({
  sectionTitle,
  sectionDuration,
  videos,
  index,
  onClick,
  setVideoId,
  isButtonToggled,
}) => {
  return (
    <motion.div className="rounded-md bg-white p-4 mb-4 shadow-md">
      <header onClick={onClick} className="cursor-pointer">
        <h2 className="font-semibold">{`Section ${index + 1} : ${sectionTitle}`}</h2>
        <p className="text-sm">{sectionDuration}</p>
      </header>
      <AnimatePresence>
        {isButtonToggled && (
          <motion.ul className="text-sm pt-4 border-t mt-4">
            {videos &&
              videos?.map((item) => (
                <PlaylistItem
                  id={item?.id}
                  setVideoId={setVideoId}
                  key={item?.id}
                  title={item?.title}
                  duration={item?.subject}
                  isChecked={true}
                />
              ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
