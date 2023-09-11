import Image from 'next/image';
import React from 'react';
import { useSelector } from 'react-redux';

const ChatScreen = ({ user }) => {
  const messages = useSelector((state) => state.messages.messages);
  console.log(messages);
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

          {/* Example chat messages */}
          <div className="h-[70vh] py-4  flex flex-col gap-2 overflow-y-scroll scroll-mb-2">
            {messages?.map((message) => (
              <div key={message?.id} className="px-4 flex items-center">
                <Image src={'/svgs/usericon.svg'} width={40} height={40} alt="user" />
                <div className="p-4 ml-2 text-sm text-white w-fit rounded-t-[13.976px] rounded-b-[13.976px] rounded-l-[13.976px] rounded-bl-[3.976px] bg-[#777b87d9]">
                  {message?.text}
                </div>
              </div>
            ))}
          </div>
          <div className="border fixed bottom-0  w-full bg-white">
            <div className="flex w-full items-center mx-4 mb-2 mt-4 ">
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
                placeholder="Type here"
                type="text"
                className=" w-[55%] ml-4 px-2 focus:outline-none border-none py-2 rounded-l-md shadow-[inset_2px_1px_6px_rgba(0,0,0,0.2)] "
              />
              <Image
                className="ml-4"
                src={'/svgs/sendicon.svg'}
                width={25}
                height={25}
                alt="user"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatScreen;
