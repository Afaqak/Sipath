'use client'
import React, { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

export const UniversalTab = ({ tabs, active, tabStyle, setActive }) => {
  return (
    <div className={`mt-4 ${tabStyle}`}>
      {tabs.map((tab) => (
        <button
          key={tab.key}
          onClick={() => setActive(tab.key)}
          className={`py-3 ${active === tab.key ? 'border-2 border-subcolor3' : ''
            } bg-white flex items-center justify-center  gap-2 focus font-thin text-subcolor3 text-sm rounded w-full shadow-md transform transition-transform ${active === tab.key ? 'scale-105' : ''
            }`}
        >
          <Image src={tab.icon} alt={tab.label} width={20} height={20} />
          {tab.label}
        </button>
      ))}
    </div>

  );
};
