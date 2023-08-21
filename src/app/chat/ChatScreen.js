import Image from 'next/image';
import React from 'react';

const ChatScreen = ({ user }) => {
  return (
    <div>
      <div className="flex flex-col justify-between h-[91vh]">
        <div className="">
          <div className="flex justify-between px-6 py-4 border border-b-4 sticky">
            <div className="flex items-center ">
              <Image src="/svgs/accountname.svg" width={40} height={40} alt="user" />
              <p className="ml-4">{user.accountName}</p>
            </div>
            <div className="flex">
              <button className="bg-[#1C8827] py-3 px-4 font-bold text-white flex items-center">
                <Image src={'/svgs/propose-appointment.svg'} width={20} height={20} alt="user" />
                <span className="ml-2">Propose Appointment</span>
              </button>
              <Image
                className="ml-4"
                src={'/svgs/info-icon.svg'}
                width={40}
                height={40}
                alt="user"
              />
            </div>
          </div>

          {/* Example chat messages */}
          <div className="px-4 flex items-center">
            <Image src={'/svgs/usericon.svg'} width={40} height={40} alt="user" />
            <div className="p-4 ml-2 text-white w-fit rounded-t-[13.976px] rounded-b-[13.976px] rounded-l-[13.976px] rounded-bl-[3.976px] bg-[#777b87d9]">
              Lorem, ipsum dolor sit amet consectetur adipisicing.
            </div>
          </div>

          <div className="px-4 flex items-center justify-end my-8">
            <div className="p-4 ml-2 text-white w-fit rounded-t-[13.976px] rounded-br-[3.976px] rounded-l-[13.976px] rounded-bl-[13.976px] bg-[#203a60bd]">
              Lorem, ipsum dolor sit amet.
            </div>
          </div>
          <div className="px-4 flex items-center">
            <Image src={'/svgs/usericon.svg'} width={40} height={40} alt="user" />
            <div className="p-4 ml-2 text-white w-fit rounded-t-[13.976px] rounded-b-[13.976px] rounded-l-[13.976px] rounded-bl-[3.976px] bg-[#777b87d9]">
              Lorem, ipsum dolor sit amet consectetur adipisicing.
            </div>
          </div>
        </div>
        <div className="border border-t-2">
          <div className="flex items-center mx-4 mb-2 mt-4 ">
            <Image src={'/svgs/fileicon.svg'} width={25} height={25} alt="user" />
            <Image
              src={'/svgs/upload_picture.svg'}
              width={25}
              height={25}
              alt="user"
              className="mx-4"
            />
            <Image src={'/svgs/zoom_icon.svg'} width={25} height={25} alt="user" />
            <input
              placeholder="Type here"
              type="text"
              className="w-full ml-4 px-2 focus:outline-none border-none py-2 rounded-l-md shadow-inner shadow-xl"
            />
            <Image className="ml-4" src={'/svgs/sendicon.svg'} width={25} height={25} alt="user" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatScreen;
