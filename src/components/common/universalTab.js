import React, { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

export const UniversalTab = ({ tabs, active, tabStyle, setActive }) => {
  return (
    <div className={`mt-4 ${tabStyle}`}>
      {tabs.map((tab) => (
        <motion.button
          key={tab.key}
          onClick={() => setActive(tab.key)}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.98 }}
          className={`py-3 ${
            active === tab.key && 'border-2 border-subcolor3'
          } bg-white flex items-center justify-center gap-2 font-thin text-subcolor3 text-sm rounded w-full shadow-md `}
        >
          <Image src={tab.icon} alt={tab.label} width={20} height={20} />
          {tab.label}
        </motion.button>
      ))}
    </div>
  );
};
