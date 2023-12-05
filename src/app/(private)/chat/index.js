'use client';
import React, { useEffect, useState } from 'react';
import UserListItem from './UserListItem ';
import ChatScreen from './ChatScreen';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { getMessagesByConversationId } from '@/features/chat/message/messageThunk';
import { RequestModal } from '@/components/modals/requestModal';
import { socket } from '@/socket';
import { AppointmentsModal} from '@/components';
import { clearChat } from '@/features/chat/message/messageSlice';
import { useSession } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';

const Chat = ({ convos }) => {
    const [conversations, setConversations] = useState(convos || [])
    const searchParams = useSearchParams()
    const dispatch = useDispatch();
    const convoId = searchParams.get('convo_id')
    const [selectedUser, setSelectedUser] = useState(convoId || null);
    const [requestModalOpen, setRequestModalOpen] = useState(false);
    const requests = useSelector((state) => state?.messageRequests?.messageRequests);
    const appointmentRequests = useSelector((state) => state?.appointments?.receivedAppointmentRequests);
    const [appointmentModalOpen, setAppointmentModalOpen] = useState(false);
    const { data: session } = useSession()

    useEffect(() => {
        if (convoId && conversations) {
            const foundConversation = conversations?.find((conversation) => +conversation?.id === +convoId);
            if (foundConversation) {
                setSelectedUser(foundConversation);
                socket.emit('join-chat', foundConversation?.id);
                dispatch(clearChat());
                dispatch(getMessagesByConversationId({ token: session?.token, id: foundConversation?.id }));
            }
        }
    }, [convoId, conversations, dispatch, session]);


    const handleUserClick = (conversation) => {
        setSelectedUser(conversation);
        socket.emit('join-chat', conversation?.id)
        dispatch(clearChat())
        dispatch(getMessagesByConversationId({ token: session?.token, id: conversation?.id }));

    };

    function openRequestModal() {
        setRequestModalOpen(true);
    }

    return (
        <div className="flex overflow-scroll flex-col md:flex-row  bg-[#F2F0F0]">
            {/* Left Panel - List of Users */}
            <div
                className={`border fullShadow  flex flex-col relative overflow-y-auto md:w-[30%] w-[100%] justify-between h-[91vh]  ${selectedUser ? 'md:flex justify-between flex-col' : 'block'
                    }`}
            >
                <div className="">
                    <button
                        onClick={openRequestModal}
                        className="bg-white w-full py-4 flex justify-between absolute top-0 z-[10000] left-0 px-4 text-left border-b-2 border-blue-600"
                    >
                        <span className='font-semibold'>View Requests</span> <span className='h-6 w-6 rounded-full bg-main text-white font-bold text-sm flex items-center justify-center'>{requests?.length}</span>
                    </button>
                    <div className='mt-[3.64rem]'>
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
                </div>
                <div onClick={() => setAppointmentModalOpen(true)} className='bg-white cursor-pointer w-full py-4 flex absolute bottom-0 justify-between px-4 text-left border-t-2 border-blue-600'>
                    {/*button for appointments*/}
                    <span className='font-semibold'>Appointment Requests</span> <span className='h-6 w-6 rounded-full bg-main text-white font-bold text-sm flex items-center justify-center'>{appointmentRequests?.length}</span>
                </div>
            </div>
            <div
                className={`col-span-1 w-[75%] md:col-span-3 bg-white ${selectedUser ? 'block' : 'hidden'}`}
            >
                {selectedUser && <ChatScreen session={session} conversation={selectedUser} />}
            </div>
            <RequestModal setConversations={setConversations} token={session?.token} isOpen={requestModalOpen} setIsOpen={setRequestModalOpen} />
            <AppointmentsModal token={session?.token} isOpen={appointmentModalOpen} setIsOpen={setAppointmentModalOpen} />
        </div>
    );
};

export default Chat;
