import moment from 'moment';
import Image from 'next/image';
import React, { useState, useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { socket } from '@/socket';
import { useSession } from 'next-auth/react';
import { insertMessage, insertMessages } from '@/features/chat/message/messageSlice';
import { Icons } from '@/components';
import UserAvatar from '@/components/common/userAvatar';
import { debounce } from 'lodash';
import useAxios from '@/hooks/useAxios';
import { Button } from '@/components/ui/button';
import { AppointmentRequestModal } from '@/components';
const ChatScreen = ({ conversation, session }) => {

  const dispatch = useDispatch();
  const [text, setText] = useState('');
  const messages = useSelector((state) => state.messages.messages);
  const { data: user } = useSession();
  const chatContainerRef = useRef(null);
  const [openAppointment, setOpenAppointment] = useState(false)
  const axios = useAxios()
  const [loading, setLoading] = useState(false);
  const [hasMoreMessages, setHasMoreMessages] = useState(true);
  const [set, setSet] = useState(0)
  const inputRef = useRef(null)


  useEffect(() => {

    setSet(0);
    setHasMoreMessages(true)
  }, [conversation]);

  const sendMessage = (e) => {
    e.preventDefault();
    if (!text) return;

    socket.emit('send-message', {
      text,
      sender: user?.user?.id,
      chat_id: conversation?.id,
    });
    console.log(text, ":text")

    setText('');
  };

  const scrollToBottom = () => {
    chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
  };

  const formattedTime = (createdAt) => {
    return moment(createdAt).format('HH:mm A');
  };

  useEffect(() => {
    if (inputRef?.current) {
      inputRef?.current?.focus();
    }
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  const handleScroll = debounce(() => {
    if (messages.length >= 10 && chatContainerRef.current.scrollTop === 0 && hasMoreMessages && !loading) {
      loadMoreMessages();

    }
  }, 200);
  const loadMoreMessages = async () => {
    const setToGet = set + 10;
    setLoading(true);
    const { data } = await axios.get(`/chats/${conversation?.id}/messages?limit=10&set=${setToGet}`, {

      headers: {
        Authorization: `Bearer ${session?.token}`
      }
    });


    dispatch(insertMessages(data?.messages))
    if (data.messages?.length > messages?.length) {
      setHasMoreMessages(true)
    } else {
      setHasMoreMessages(false)
    }

    setSet(setToGet);
    setLoading(false);
  };


  useEffect(() => {
    chatContainerRef?.current?.addEventListener('scroll', handleScroll);

    return () => {
      chatContainerRef?.current?.removeEventListener('scroll', handleScroll);
    };
  }, [messages, hasMoreMessages, loading]);


  useEffect(() => {
    socket.on('message-recieved', ({ text: message, sender, chat_id }) => {
      console.log(message, ":message")
      const newMessage = {
        id: Date.now(),
        createdAt: new Date(),
        message,
        sender,
        chat_id,
      };


      dispatch(insertMessage(newMessage));
    });

    return () => {
      socket.off('message-recieved');
    };
  }, [conversation, user]);

  const isMessageFromSender = (message) => {
    // console.log(message,"{from function}")
    return message?.sender === user?.user?.id
  };

  let otherUser = conversation.member_1 === user?.user?.id ? conversation?.chat_member_2 : conversation?.chat_member_1

  return (
    <div>
      <div className="flex flex-col justify-between overflow-y-scroll">
        <div className="">
          <div className="flex justify-between px-6 py-4 shadow-md">
            <div className="flex items-center ">
              <UserAvatar user={{ image: otherUser?.profile_image, name: otherUser?.display_name.slice(0,2) }} />
              {/* <p className="ml-4">{user.accountName}</p> */}
            </div>
            <div className="flex items-center">
              <Button onClick={() => setOpenAppointment(true)} className="text-white bg-subcolor hover:bg-green-700 rounded-md">Propose Appointment</Button>
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
            className="h-[70vh] py-6 flex flex-col gap-2 overflow-y-scroll scroll-mb-2"
          >
            {loading &&
              <div className='w-full flex justify-center py-2'>
                <span className='animate-spin'><Icons.Loader2 width="24" height="24" stroke="black" /></span>
              </div>
            }
            {messages?.map((message) => (
              <div
                key={message?.id}
                className={`px-4 flex justify-center flex-col ${isMessageFromSender(message) ? 'items-start' : 'items-end'}`}
              >
                <p className={`text-gray-300 mb-1  text-[0.70rem] `}>
                  {formattedTime(message?.createdAt)}
                </p>
                <div
                  className={`p-3 ml-2 text-sm text-white w-fit rounded-t-[13.976px]  rounded-b-[13.976px] rounded-l-[13.976px] ${isMessageFromSender(message)
                    ? 'rounded-b-[13.976px] rounded-l-[13.976px] bg-[#203A60BD]'
                    : 'rounded-r-[13.976px] bg-[#1F8E2A]'
                    }`}
                >
                  {message?.message}
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
                ref={inputRef}
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
      <AppointmentRequestModal isOpen={openAppointment} setIsOpen={setOpenAppointment} chatId={conversation?.id} />
    </div>
  );
};

export default ChatScreen;


