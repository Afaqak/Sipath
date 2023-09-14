import { createMessage } from '@/features/chat/message/messageThunk';
import moment from 'moment';
import Image from 'next/image';
import React, { useState, useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
const ChatScreen = ({ user }) => {
  const dispatch = useDispatch();
  const [text, setText] = useState('');
  const messages = useSelector((state) => state.messages.messages);

  const firstMember = 12;

  let secondMember = user.member_one !== 12 ? user.member_one : user.member_two;

  const sendMessage = (e) => {
    e.preventDefault();
    if (!text) return;
    dispatch(createMessage({ text, senderId: firstMember, receiverId: secondMember }));
    setText('');
  };
  const chatContainerRef = useRef(null);

  const scrollToBottom = () => {
    chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
  };
  const formattedTime = (createdAt) => {
    return moment(createdAt).format('HH:mm A');
  };
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div>
      <div className="flex flex-col justify-between overflow-y-scroll">
        <div className="">
          <div className="flex justify-between px-6 py-4 shadow-md">
            <div className="flex items-center ">
              <Image src="/svgs/accountname.svg" width={40} height={40} alt="user" />
              <p className="ml-4">{user.accountName}</p>
            </div>
            <div className="flex">
              <button className="bg-[#1C8827] py-[0.20rem] rounded-md px-4 text-sm font-bold text-white flex items-center">
                <Image src={'/svgs/propose-appointment.svg'} width={20} height={20} alt="user" />
                <span className="ml-2">Propose Appointment</span>
              </button>
              <Image
                className="ml-4"
                src={'/svgs/info-icon.svg'}
                width={30}
                height={30}
                alt="user"
              />
            </div>
          </div>

          <div
            ref={chatContainerRef}
            className="h-[70vh] py-4  flex flex-col gap-2 overflow-y-scroll scroll-mb-2"
          >
            {messages?.map((message) => (
              <div
                key={message?.id}
                className={`px-4 flex justify-center flex-col ${
                  message.sender_id === firstMember ? 'items-end' : 'items-start'
                }`}
              >
                <p className={`text-gray-300 mb-1  text-[0.70rem] `}>
                  {formattedTime(message?.createdAt)}
                </p>
                <div
                  className={`p-4 ml-2 text-sm text-white w-fit rounded-t-[13.976px]  rounded-b-[13.976px] rounded-l-[13.976px]  ${
                    message.sender_id === firstMember
                      ? 'bg-[#203A60BD] rounded-br-[3.976px]'
                      : 'bg-[#777b87d9] rounded-bl-[3.976px] '
                  }`}
                >
                  {message?.text}
                </div>
              </div>
            ))}
          </div>

          <div className="border fixed bottom-0  w-full bg-white">
            <form onSubmit={sendMessage} className="flex w-full items-center mx-4 mb-2 mt-4 ">
              <div className="flex ">
                <Image src={'/svgs/fileicon.svg'} width={20} height={20} alt="user" />
                <Image
                  src={'/svgs/upload_picture.svg'}
                  width={25}
                  height={25}
                  alt="user"
                  className="mx-4"
                />
              </div>

              <input
                onChange={(e) => setText(e.target.value)}
                placeholder="Type here"
                type="text"
                value={text}
                className=" w-[55%] ml-4 px-2 focus:outline-none border-none py-2 rounded-l-md shadow-[inset_2px_1px_6px_rgba(0,0,0,0.2)] "
              />
              <button type="submit">
                <Image
                  className="ml-4"
                  src={'/svgs/sendicon.svg'}
                  width={25}
                  height={25}
                  alt="user"
                />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatScreen;
