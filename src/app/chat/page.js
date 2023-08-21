'use client';

import Image from 'next/image';
import React, { useState } from 'react';
import UserListItem from './UserListItem ';
import ChatScreen from './ChatScreen';

const users = [
  {
    id: 1,
    accountName: 'User Name',
    imageUrl: '/svgs/accountname.svg',
    description: 'Lorem ipsum dolor sit amet consectetur',
    chattime: 'Yesterday 10:21am',
  },

  {
    id: 2,
    accountName: 'User Name',
    imageUrl: '/svgs/accountname.svg',
    description: 'Lorem ipsum dolor sit amet consectetur',
    chattime: 'Yesterday 10:21am',
  },
  {
    id: 3,
    accountName: 'User Name',
    imageUrl: '/svgs/accountname.svg',
    description: 'Lorem ipsum dolor sit amet consectetur',
    chattime: 'Yesterday 10:21am',
  },
];

const Chat = () => {
  const [selectedUser, setSelectedUser] = useState(null);

  const handleUserClick = (user) => {
    setSelectedUser(user);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 h-[91vh] bg-[#F2F0F0]">
      {/* Left Panel - List of Users */}
      <div
        className={`border border-r-4 flex flex-col justify-between h-[91vh]  ${
          selectedUser ? 'hidden md:flex justify-between flex-col' : 'block'
        }`}
      >
        <div className="">
          {users.map((item) => (
            <UserListItem
              key={item.id}
              user={item}
              isSelected={selectedUser && selectedUser.id === item.id}
              onClick={handleUserClick}
            />
          ))}
        </div>
        <div className={`px-6 py-4 bg-[#FFF] cursor-pointer`}>
          <h3 className="text-lg font-light">Pending Appointment Request</h3>
          <div className="flex items-center justify-between mt-4">
            <div className="flex items-center">
              <Image src={'/svgs/accountname.svg'} width={40} height={40} alt="user" />
              <p className="font-bold ml-3 text-lg">User Name</p>
            </div>
            <p className="text-[#7B7B7B] text-sm font-normal">Yesterday 10:21am</p>
          </div>
          <div className="mt-1 text-sm">Lorem ipsum dolor sit amet consectetur adipisicing.</div>
        </div>
      </div>
      <div className={`col-span-1 md:col-span-3 bg-white ${selectedUser ? 'block' : 'hidden'}`}>
        {selectedUser && <ChatScreen user={selectedUser} />}
      </div>
    </div>
  );
};

export default Chat;
