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
}) => {
  const [isListVisible, setListVisible] = useState(false);

  const toggleListVisibility = () => {
    setListVisible(!isListVisible);
  };

  return (
    <motion.div onClick={onClick} className="rounded-md bg-white p-4 mb-4 shadow-md">
      <header className="cursor-pointer" onClick={toggleListVisibility}>
        <h2 className="font-semibold">{`Section ${index + 1} : ${sectionTitle}`}</h2>
        <p className="text-sm">{sectionDuration}</p>
      </header>
      <AnimatePresence>
        {isListVisible && (
          <motion.ul className="text-sm pt-4 border-t mt-4">
            {videos &&
              videos?.map((item) => (
                <PlaylistItem
                  id={item?.id}
                  onClick={setVideoId}
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
