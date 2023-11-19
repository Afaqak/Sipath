'use client';
import React, { useState, useEffect } from 'react';
import useAxiosPrivate from '@/hooks/useAxiosPrivate';
import UserAvatar from '@/components/common/userAvatar';
import { formatTimeAgo } from '@/utils';
import Image from 'next/image';
import Link from 'next/link';
import { Feed } from '@/components';
import { ChatRequestModal } from '@/components/chat/chatRequestModal';
import {
  Quiz,
  Video,
  Book,
  PodcastSlider,
  Profile,
  EventsCalendar,
  MyIncome,
  MyAccount,
  Icons,
  VideoItem,
  BookSkeleton,
} from '@/components';

import { UniversalTab } from '@/components';
import { signOut, useSession } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { errorToast } from '@/utils/toasts';
import { setBooks } from '@/features/book/bookSlice';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { setQuizes } from '@/features/quiz/quizSlice';
import { AppointmentRequestModal } from '@/components/appointment/appointmentRequestModal';
const tabs = [
  { key: 'myvideos', label: 'Videos', icon: '/svgs/Play.svg' },
  { key: 'myfeed', label: 'Feed', icon: '/svgs/rocket.svg' },
  { key: 'books', label: 'Books', icon: '/svgs/rocket.svg' },
  { key: 'quiz', label: 'Quizzes', icon: '/svgs/quiz.svg' },
  { key: 'Course', label: 'Courses', icon: '/svgs/rocket.svg' },
  { key: 'podcast', label: 'Podcast', icon: '/svgs/podcasts.svg' },
];


export const MyProfile = ({ user, session }) => {
  const axios = useAxiosPrivate()
  const [active, setActive] = useState(tabs[0].key);
  const [openChat, setOpenChat] = useState(false)
  const [openAppointment, setOpenAppointment] = useState(false)
  const [loading, setLoading] = useState(false)
  console.log(user?.user,"{with followers}")

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
        <UniversalTab
          tabStyle={'grid grid-cols-2 gap-4 md:grid-cols-6'}
          active={active}
          tabs={tabs}
          setActive={setActive}
        />

        {/* {active === 'courses' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <Video videos={courses} />
          </motion.div>
        )} */}
        {/* 
        {active === 'quiz' && (
          <MyQuizzes token={session?.token} tutorId={session?.tutor?.tutor_id} />
        )} */}
        {/* {active === 'podcast' && (
          <div>
            <PodcastSlider videos={courses} />
            <Video videos={courses} title={'Past Podcasts'} />
          </div>
        )} */}
        {active === 'books' && <Mybooks id={user.user?.id} />}
        {active === 'myfeed' && <MyFeed session={user?.user?.id} />}

        {/* {active === 'income' && <MyIncome />} */}
        {active === 'myvideos' && <MyVideos userId={user?.user?.id} />}

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
        const response = await axios.get(`/posts/user/${session}`, {
          headers: {
            Authorization: `Bearer ${session?.token}`,
          },
        });

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
        <Feed key={index} feed={feed} />
      ))}
    </div>
  );
};


const MyCourses = ({ token }) => {
  const [courses, setCourses] = useState([]);
  const axios = useAxiosPrivate();
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get('/courses', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setCourses(response.data.courses);
      } catch (err) {
        console.log(err);
      }
    };
    fetchCourses();
  }, []);
  return (
    <div className="py-8 grid md:grid-cols-2 gap-4 lg:grid-cols-3">
      {courses.map((course) => (
        <CourseCard key={course?.id} course={course} />
      ))}
    </div>
  );
};




const CourseCard = ({ course }) => {
  return (
    <Link
      href={`/tutor/courses/${course?.id}`}
      className=" h-[20rem] relative block mb-6 w-full p-4 bg-white shadow-md rounded-md"
    >
      {course?.price && course?.price > 0 && (
        <span className="absolute top-2 z-[1000] left-0 bg-subcolor text-[0.7rem] py-[0.15rem]  rounded-r-md text-white px-3 font-medium">
          {course?.price}$
        </span>
      )}
      <div className="relative">
        {course?.thumbnail ? (
          <Image
            src={course?.thumbnail}
            alt={'course'}
            width={300}
            height={200}
            className="rounded-md object-cover w-full h-44"
          />
        ) : (
          <div className="rounded-md object-cover w-full h-44"></div>
        )}
      </div>
      <div className="mt-3 flex gap-2 items">
        <UserAvatar />
        <div>
          <h1 className="text-[1.05rem] font-semibold mb-[0.20rem] line-clamp-2">{course?.name}</h1>
          <div className="flex items-center text-sm gap-2 text-gray-700">
            <span>authors</span>
          </div>
          <div className="flex items-center text-sm gap-2 text-gray-700">
            <span>{formatTimeAgo(course.createdAt)}</span>
            <span>&bull;</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

const MyQuizzes = ({ token }) => {
  const axios = useAxiosPrivate();
  const dispatch = useDispatch();
  const quizes = useSelector((state) => state?.quizzes?.quizzes);

  useEffect(() => {
    const fetchQuizes = async () => {
      try {
        const response = await axios.get(`/assets/quizzes/tutor/${tutorId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        dispatch(setQuizes(response?.data));
      } catch (err) {
        console.error(err);
      }
    };
    fetchQuizes();
  }, []);

  return (
    <div className="w-[90%] mx-auto mt-10">
      <div className="flex justify-end w-full">

      </div>
      {quizes && quizes.map((quiz, index) => <Quiz key={index} quiz={quiz} />)}
    </div>
  );
};

const MyVideos = ({ userId }) => {
  const axios = useAxiosPrivate();
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchTutorVideos = async () => {
      try {
        const response = await axios.get(`/assets/videos/user/${userId}`);
        setVideos(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchTutorVideos();
  }, []);

  return (
    <div className=" py-8">
      <div className="grid grid-cols-3 gap-y-4 gap-x-14 mt-4">
        {videos.map((video, index) => (
          <VideoItem video={video} key={index} />
        ))}
      </div>
    </div>
  );
};

const Mybooks = ({ id }) => {
  const axios = useAxiosPrivate();
  const [loading, setLoading] = useState(false);
  const [books, setBooks] = useState([]);
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        setLoading(false);
        const response = await axios.get(`/assets/books/user/${id}`);

        setBooks(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchBooks();
  }, []);


  return (
    <div>
      {loading ? (
        <BookSkeleton times={6} />
      ) : (
        <div className="grid mt-8 gap-4 grid-cols-1 lg:grid-cols-2">
          {books &&
            books?.map((book, index) => <Book setBooks={setBooks} book={book} key={index} />)}
        </div>
      )}
    </div>
  );
};
