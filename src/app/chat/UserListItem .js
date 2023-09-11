import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
const UserListItem = ({ user, isSelected, onClick }) => {
  return (
    <div
      className={`p-3  cursor-pointer border relative 
bg-[#FFF]
      `}
      onClick={() => onClick(user)}
    >
      <div className="flex items-center  justify-between">
        <div className="flex items-center">
          <Image src={user.imageUrl} width={40} className="z-[2000]" height={40} alt="user" />
          <p className="font-bold ml-3 text-lg z-[2000]">{user.accountName}</p>
        </div>
        {isSelected && (
          <motion.div
            transition={{ duration: 0.2 }}
            className="absolute inset-0 bg-[#1A6DC733] bg-opacity-20"
            layoutId="active-pill"
          ></motion.div>
        )}
        <p className="text-[#7B7B7B] text-sm z-[2000] font-normal">{user.chattime}</p>
      </div>
      <div className="mt-1 text-sm z-[2000]">{user.description}</div>
    </div>
  );
};

export default UserListItem;
