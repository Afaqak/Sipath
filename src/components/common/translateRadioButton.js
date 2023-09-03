'use client';
import React, { useState } from 'react';

export const TranslationToggleButton = ({ onClick, color, image }) => {
  const [translated, setTranslated] = useState(false);
  console.log(translated);
  const handleButtonClick = () => {
    setTranslated(!translated);
    onClick(!translated);
  };
  return (
    <button
      onClick={handleButtonClick}
      className={`w-10 h-4 rounded-2xl bg-white flex shadow-[inset_1px_3px_7px_rgba(0,0,0,0.2)] items-center transition duration-300 focus:outline-none ${color}`}
    >
      <div
        style={{ backgroundColor: color }}
        className={`w-6 h-6 relative rounded-full transition duration-300 transform p-1 ${
          translated ? ' -translate-x-2' : 'translate-x-full'
        }`}
      >
        {image && <img src={image} className="h-4 w-4" alt="Icon" />}
      </div>
    </button>
  );
};
