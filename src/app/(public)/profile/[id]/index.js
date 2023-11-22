'use client';
import React, { useState, useEffect } from 'react';
import useAxiosPrivate from '@/hooks/useAxiosPrivate';
import Image from 'next/image';
import { Feed } from '@/components';
import { ChatRequestModal } from '@/components/chat/chatRequestModal';
import {
  Profile,
} from '@/components';
import { UniversalTab } from '@/components';
import { AppointmentRequestModal } from '@/components/appointment/appointmentRequestModal';
import { MyVideos, Mybooks } from '@/components/user';
import { MyCourses } from '@/components/tutors';
import { useSession } from 'next-auth/react';


const tutorTabs = [
  { key: 'videos', label: 'Videos', icon: '/svgs/Play.svg' },
  { key: 'books', label: 'Books', icon: '/svgs/book.svg' },
  { key: 'quiz', label: 'Quizzes', icon: '/svgs/quiz.svg' },
  { key: 'courses', label: 'Courses', icon: '/svgs/rocket.svg' },
  { key: 'podcast', label: 'Podcast', icon: '/svgs/podcasts.svg' },
];

const userTabs = [
  { key: 'videos', label: 'Videos', icon: '/svgs/Play.svg' },
  { key: 'books', label: 'Books', icon: '/svgs/book.svg' },
  { key: 'podcast', label: 'Podcast', icon: '/svgs/podcasts.svg' },
];




export const MyProfile = ({ user }) => {
  const axios = useAxiosPrivate()
  const [active, setActive] = useState(user?.user?.isTutor?tutorTabs[0].key:userTabs[0].key);
  const [openChat, setOpenChat] = useState(false)
  const [openAppointment, setOpenAppointment] = useState(false)
  const [loading, setLoading] = useState(false)
  const {data:session}=useSession()

  const handleMessageRequest = async (message, onClose) => {

    if (!message) return
    try {
      setLoading(true)
      await axios.post(`chats/request/${user?.user?.id}`, {
        message
      }, {
        headers: {
          Authorization: `Bearer ${session?.token}`
        }
      })
      onClose()

    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }


  return (
    <>
      <div className="mt-0.5"></div>
      <div className="pb-8 overflow-visible relative w-[90%] md:w-[85%] mx-auto">
        <Profile isActon={false} type={'userprofile'} session={session} tutor={user?.tutor} user={user?.user} />
        <div className="flex justify-between gap-2 mt-4">
          {
            user?.user?.isTutor &&
            <button onClick={() => setOpenAppointment(true)} className="py-1 bg-white flex items-center justify-center gap-2 rounded-md w-full border-2 border-black">
              <Image src={'/svgs/Calendar.svg'} alt="calendart" width={20} height={20} />
              <span className="md:block hidden">
                Book Appointment</span>
            </button>
          }
          <button onClick={() => setOpenChat(true)} className="py-1 bg-white flex items-center justify-center gap-2 rounded-md w-full border-2 border-main">
            <Image src={'/svgs/messageblue.svg'} alt="calendart" width={20} height={20} />
            <span className="md:block hidden" >{user?.user?.isTutor ? "Message Expert" : "Message User"}</span>
          </button>
          <button className="py-1 bg-white flex items-center justify-center gap-2 rounded-md w-full border-2 border-subcolor">
            <Image src={'/svgs/coins.svg'} alt="calendart" width={20} height={20} />
            <span className="md:block hidden">Donate</span>
          </button>
        </div>

        {
          user?.user?.isTutor ?
            <UniversalTab
              tabStyle={'grid grid-cols-2 gap-4 md:grid-cols-6'}
              active={active}
              tabs={tutorTabs}
              setActive={setActive}
            /> : <UniversalTab
              tabStyle={'grid grid-cols-2 gap-4 md:grid-cols-4'}
              active={active}
              tabs={userTabs}
              setActive={setActive}
            />

        }
        {active === 'books' && <Mybooks token={''} user={user?.user} url={`/assets/books/user/${user?.user?.id}`} />}
        {active === 'myfeed' && <MyFeed session={user?.user} />}
        {active==='courses' && <MyCourses user={user?.user} dataKey='courses' url={`/assets/courses/tutor/${user?.tutor?.tutor_id}`}/>}
        {active === 'videos' && <MyVideos url={`/assets/videos/user/${user?.user?.id}`}/>}

      </div>
      <ChatRequestModal loading={loading} handleSubmit={handleMessageRequest} isOpen={openChat} setIsOpen={setOpenChat} />
      <AppointmentRequestModal isOpen={openAppointment} setIsOpen={setOpenAppointment} userId={user?.user?.id} />
    </>
  );
};

const MyFeed = ({ session }) => {
  const [posts, setPosts] = useState([]);
  const axios = useAxiosPrivate();
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get(`/posts/user/${session.id}`);

        setPosts(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchCourses();
  }, []);
  return (
    <div className=" mx-auto flex mt-4 flex-col gap-4">

      {posts.map((feed, index) => (
        <Feed user={session} key={index} feed={feed} />
      ))}
    </div>
  );
};

