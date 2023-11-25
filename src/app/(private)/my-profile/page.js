'use client';
import React, { useState} from 'react';

import {
  Video,
  Profile,
  EventsCalendar,
  MyIncome,
} from '@/components';
import { UniversalTab } from '@/components';
import { useSession } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import { MyCourses,MyQuizzes } from '@/components/tutors';
import { MyFeed, MyVideos, Mybooks } from '@/components/user';
import { tutorTabs,userTabs } from '@/utils/tabs';
import { MyAccount } from '@/components/profile/myAccount';


const MyProfile = () => {


  const router=useRouter()
  const tabParams=useSearchParams()
  const { data: session } = useSession();
  const tabsToShow =session?.user?.isTutor ? tutorTabs : userTabs
  const [active, setActive] = useState(tabParams.get('tab') || tabsToShow[0].key);
  const updateURL = (tabKey) => {
    router.replace(`?tab=${tabKey}`,undefined,{
      scroll:false
    });
  };
  
  return (
    <>
      <div className="mt-0.5"></div>
      <div className="pb-8 overflow-visible relative">
        <div className=' w-[90%] md:w-[85%] mx-auto'>
        <Profile type={'myprofile'} session={session} user={session?.user} />
        <UniversalTab
          tabStyle={session?.user?.isTutor ?'grid grid-cols-3 gap-4 md:grid-cols-4':'grid grid-cols-3 gap-4 md:grid-cols-6'}
          active={active}
          tabs={tabsToShow}
          setActive={(val)=>{
            updateURL(val)
            setActive(val) 
          
          }}
        />
        </div>
        <div className='w-[90%] md:w-[85%] mx-auto'>
        {active === 'courses' && (
          <div>
            <Video videos={courses} />
          </div>
        )}

        {active === 'quiz' && (
          <MyQuizzes token={session?.token} url={`/assets/quizzes/tutor/${session?.tutor?.tutor_id}`} />
        )}
        {active === 'myfeed' && (
          <MyFeed session={session} />
        )}
        {/* {active === 'podcast' && (
          <div>
            <PodcastSlider videos={courses} />
            <Video videos={courses} title={'Past Podcasts'} />
          </div>
        )} */}
        {active ==='mylearning' && <MyCourses dataKey="enrollments" user={session} url={`/courses/enrollments`}/>}
        {active === 'books' && <Mybooks isProfile={true} url={`/assets/books/user/${session?.user?.id}`} token={session?.token} user={session?.user} />}
        {active === 'income' && <MyIncome />}
        {active === 'myvideos' && <MyVideos token={session?.token} url={`/assets/videos/user/${session?.user?.id}`} />}
        {active === 'myaccount' && <MyAccount session={session} />}
        {active === 'mycourses' && <MyCourses dataKey="courses" url={'/courses'} user={session} />}
        </div>

        
        {active === 'calendar' && <EventsCalendar />}
      </div>
    </>
  );
};




export default MyProfile
