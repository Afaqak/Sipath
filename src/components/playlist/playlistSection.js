import React, { useState } from 'react';
import { PlaylistItem } from '@/components';

export const PlaylistSection = ({ sectionTitle, sectionDuration, items }) => {
  const [isListVisible, setListVisible] = useState(false);

  const toggleListVisibility = () => {
    setListVisible(!isListVisible);
  };

  return (
    <div className="rounded-md bg-white p-4 mb-4 shadow-md ">
      <header className="cursor-pointer" onClick={toggleListVisibility}>
        <h2 className="font-semibold">{sectionTitle}</h2>
        <p className="text-sm">{sectionDuration}</p>
      </header>

      <ul className={`text-sm pt-4 border-t mt-4 ${isListVisible ? '' : 'hidden'}`}>
        {items.map((item) => (
          <PlaylistItem
            key={item.id}
            title={item.title}
            duration={item.duration}
            isChecked={item.isChecked}
          />
        ))}
      </ul>
    </div>
  );
};
