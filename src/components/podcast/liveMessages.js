'use client';
import React, { useState, useEffect, useRef } from 'react';
import UserAvatar from '../common/userAvatar';

export const LiveMessages = ({ messages }) => {
  const messagesContainerRef = useRef(null);
  console.log(messages);
  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div ref={messagesContainerRef} className="h-[75vh] overflow-y-scroll">
      <div className="flex flex-col mb-4 gap-4 px-8">
        {messages.map((message, index) => (
          <div key={index} className="message gap-2 flex">
            <UserAvatar />
            <div className="bg-[#777B87D9] text-white p-3 text-sm rounded-t-xl rounded-br-xl">
              {message}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
