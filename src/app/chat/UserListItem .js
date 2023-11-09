import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import UserAvatar from '@/components/common/userAvatar';
const UserListItem = ({ user, conversation, isSelected, onClick }) => {

  const member_2=user?.id=== conversation?.chat_member_2?.id?conversation?.chat_member_1:conversation?.chat_member_2
  console.log(conversation,"conversation")
  return (
    <div
      className={`p-3  cursor-pointer border relative 
      bg-[#F2F0F0]
      `}
      onClick={onClick}
    >
      <div className="flex items-center  justify-between">
        <div className="flex items-center">
          <UserAvatar user={{image:member_2?.profile_image}} width={40} className="z-[2000]" height={40} alt="user" />
          <p className="font-semibold ml-3 z-[2000]">{member_2?.display_name}</p>
        </div>

        
        {isSelected && (
          <motion.div
            transition={{ duration: 0.2 }}
            className="absolute inset-0 bg-[#1A6DC733] bg-opacity-20"
            layoutId="active-pill"
          ></motion.div>
        )}
        {/* <p className="text-[#7B7B7B] text-sm z-[2000] font-normal">{user.chattime}</p> */}
      </div>
      {/* <div className="mt-1 text-sm z-[2000]">{user.description}</div> */}
    </div>
  );
};

export default UserListItem;
