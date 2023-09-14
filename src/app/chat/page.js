'use client';
import React, { useEffect, useState } from 'react';
import UserListItem from './UserListItem ';
import ChatScreen from './ChatScreen';
import { useDispatch } from 'react-redux';
import { fetchConversations } from '@/features/chat/conversation/conversationThunk';
import { useSelector } from 'react-redux';
import { getMessagesByConversationId } from '@/features/chat/message/messageThunk';
import { RequestModal } from '@/components/chat/requestModal';
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
  const dispatch = useDispatch();
  const [selectedUser, setSelectedUser] = useState(null);
  const conversations = useSelector((state) => state?.conversations?.conversations);
  const [requestModalOpen, setRequestModalOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchConversations(12));
  }, []);
  const handleUserClick = (conversation) => {
    setSelectedUser(conversation);
    dispatch(getMessagesByConversationId(conversation?.id));
  };

  function openModal() {
    setRequestModalOpen(true);
  }
  return (
    <div className="flex h-[91vh]  bg-[#F2F0F0]">
      {/* Left Panel - List of Users */}
      <div
        className={`border fullShadow  flex flex-col w-[30%] justify-between h-[91vh]  ${
          selectedUser ? 'hidden md:flex justify-between flex-col' : 'block'
        }`}
      >
        <div className="">
          <button
            onClick={openModal}
            className="bg-white w-full py-4 px-4 text-left border-b-2 border-blue-600"
          >
            View Requests
          </button>
          {conversations &&
            conversations?.map((conversation, index) => (
              <UserListItem
                key={index}
                user={users[index]}
                isSelected={selectedUser && selectedUser.id === conversation.id}
                onClick={() => handleUserClick(conversation)}
              />
            ))}
        </div>
        <div>
          {/*button for appointments*/}
          <button className="bg-white w-full py-4  text-left px-4 border-blue-600 border-t-2">
            Appointments
          </button>
        </div>
      </div>
      <div
        className={`col-span-1 w-[75%] md:col-span-3 bg-white ${selectedUser ? 'block' : 'hidden'}`}
      >
        {selectedUser && <ChatScreen user={selectedUser} />}
      </div>
      <RequestModal isOpen={requestModalOpen} setIsOpen={setRequestModalOpen} />
    </div>
  );
};

export default Chat;
