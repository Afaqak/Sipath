'use client';
import React, { useEffect, useState } from 'react';
import UserListItem from './UserListItem ';
import ChatScreen from './ChatScreen';
import { useDispatch } from 'react-redux';
import { fetchConversations } from '@/features/chat/conversation/conversationThunk';
import { useSelector } from 'react-redux';
import { getMessagesByConversationId } from '@/features/chat/message/messageThunk';
import { RequestModal } from '@/components/chat/requestModal';
import { socket } from '@/socket';
import { AppointmentsModal } from '@/components/appointment/appointmentsModal';

const Chat = ({session}) => {
  const dispatch = useDispatch();
  const [selectedUser, setSelectedUser] = useState(null);
  const conversations = useSelector((state) => state?.conversations?.conversations);
  const [requestModalOpen, setRequestModalOpen] = useState(false);
  const [appointmentModalOpen, setAppointmentModalOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchConversations({token:session?.token}));
  }, []);
  const handleUserClick = (conversation) => {
    console.log(conversation,"{clicked useR}")
    setSelectedUser(conversation);
    socket.emit('join-chat',conversation?.id)
    dispatch(getMessagesByConversationId({token:session?.token,id:conversation?.id}));

  };
  console.log(conversations,"{covno}")

  function openRequestModal() {
    setRequestModalOpen(true);
  }
  function openAppointmentModal() {
    setAppointmentModalOpen(true);
  }
  return (
    <div className="flex overflow-scroll  bg-[#F2F0F0]">
      {/* Left Panel - List of Users */}
      <div
        className={`border fullShadow  flex flex-col relative overflow-y-auto w-[30%] justify-between h-[91vh]  ${
          selectedUser ? 'hidden md:flex justify-between flex-col' : 'block'
        }`}
      >
        <div className="">
          <button
            onClick={openRequestModal}
            className="bg-white w-full py-4 px-4 text-left border-b-2 border-blue-600"
          >
            View Requests
          </button>
          {conversations &&
            conversations?.map((conversation, index) => (
              <UserListItem
                user={session?.user}
                key={index}
                conversation={conversation}
                isSelected={selectedUser && selectedUser.id === conversation.id}
                onClick={() => handleUserClick(conversation)}
              />
            ))}
        </div>
        <div>
          {/*button for appointments*/}
          <button onClick={openAppointmentModal} className="bg-white absolute bottom-0 w-full py-4  text-left px-4 border-blue-600 border-t-2">
            Appointments
          </button>
        </div>
      </div>
      <div
        className={`col-span-1 w-[75%] md:col-span-3 bg-white ${selectedUser ? 'block' : 'hidden'}`}
      >
        {selectedUser && <ChatScreen conversation={selectedUser}/>}
      </div>
      <RequestModal token={session?.token} isOpen={requestModalOpen} setIsOpen={setRequestModalOpen} />
      <AppointmentsModal token={session?.token} isOpen={appointmentModalOpen} setIsOpen={setAppointmentModalOpen} />
    </div>
  );
};

export default Chat;
