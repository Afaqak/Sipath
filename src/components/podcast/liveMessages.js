'use client'
import React, { useState, useEffect ,useRef} from 'react';

import { faker } from '@faker-js/faker';

export const LiveMessages = () => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const messagesContainerRef = useRef(null);

  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
    }
  }, [messages]);

  // Generate fake messages and profiles when the component mounts
  useEffect(() => {
    const fakeMessages = [];
    for (let i = 0; i < 10; i++) {
      const message = {

        id: i + 1,
        text: faker.lorem.sentence(),
        profile: faker.image.avatar(),
      };
      fakeMessages.push(message);
    }
    setMessages(fakeMessages);
  }, []);

  // Function to handle the input change
  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  // Function to handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    if (inputValue.trim() !== '') {
      // Create a new message with the input value as text and a random profile SVG
      const newMessage = {
        id: faker.random.uuid(),
        text: inputValue.trim(),
        profile: faker.image.avatar(),
      };
      // Add the new message to the existing messages
      setMessages([...messages, newMessage]);
      // Reset the input field
      setInputValue('');
    }
  };

  return (
    <div ref={messagesContainerRef} className='overflow-y-scroll live-message'>
      {/* Render the messages with their profiles */}
      <div className='flex flex-col mb-4 gap-4 px-8'>
        {messages.map((message) => (
          <div key={message.id} className="message gap-2 flex">
            <img src={message.profile} alt="Profile" className="tutor-img self-end w-[2.5rem] object-cover" />
            <div className="bg-[#777B87D9] text-white p-3 rounded-t-xl rounded-br-xl">{message.text}</div>
          </div>
        ))}
      </div>
      {/* Input form to add new messages */}

    </div>
  );
};

