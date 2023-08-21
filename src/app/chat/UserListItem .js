import React from 'react';
import Image from 'next/image';

const UserListItem = ({ user, isSelected, onClick }) => {
  return (
    <div
      className={`p-6 bg-[#FFF] cursor-pointer ${isSelected ? 'bg-[#1A6DC733] bg-opacity-20' : ''}`}
      onClick={() => onClick(user)}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Image src={user.imageUrl} width={40} height={40} alt="user" />
          <p className="font-bold ml-3 text-lg">{user.accountName}</p>
        </div>
        <p className="text-[#7B7B7B] text-sm font-normal">{user.chattime}</p>
      </div>
      <div className="mt-1 text-sm">{user.description}</div>
    </div>
  );
};

export default UserListItem;
