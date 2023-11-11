'use client';
import React, { useEffect, useState, useRef } from 'react';
import useAxiosPrivate from '@/hooks/useAxiosPrivate';
import { useRouter } from 'next/navigation';
import { LoadingSkeletons, Icons, formatTimeAgo } from '@/components';
import { errorToast } from '@/utils/toasts';
import { Button } from '@/components/ui/button';
import UserAvatar from '@/components/common/userAvatar';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import { useParams } from 'next/navigation';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from '@/components/ui/dialog';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { buttonVariants } from '@/components/ui/button';
const CoursePage = ({ session }) => {
  const axios = useAxiosPrivate();
  const params = useParams();
  const router = useRouter();
  const [enrollmentModal, setEnrollmentModal] = useState(false)
  const [unEnrollmentModal, seUnEnrollmentModal] = useState(false)
  const [sections, setSections] = useState([]);
  const [videosBySection, setVideosBySection] = useState({});
  const [buttonStates, setButtonStates] = useState({});
  const [loadingStates, setLoadingStates] = useState([]);
  const [course, setCourse] = useState({});
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [enrollments, setEnrollments] = useState([])
  const [enrollmentId, setEnrollmentId] = useState(0)

  useEffect(() => {
    const fetchSections = async () => {
      const response = await axios.get(`/courses/${params?.course}/sections`, {
        headers: {
          Authorization: `Bearer ${session?.token}`,
        },
      });
      setSections(response.data.sections);
      setCourse(response.data.course);
      setLoadingStates(new Array(response.data.sections.length).fill(false));
      setButtonStates(new Array(response.data.sections.length).fill(false));
    };
    fetchSections();
  }, []);

  useEffect(() => {
    if (course?.id) {
      fetchUserEnrollments();
    }
  }, [course?.id]);

  const fetchUserEnrollments = async () => {

    try {
      const response = await axios.get('/courses/enrollments', {
        headers: {
          Authorization: `Bearer ${session?.token}`,
        },
      });
      const enrollments = response.data.enrollments;
      setEnrollments(enrollments)
      const isEnrolledInCourse = enrollments.some((enrollment) => enrollment?.course?.id === course.id);
      setIsEnrolled(isEnrolledInCourse);
    } catch (err) {
      console.log(err);
    }
  };



  const toggleButton = (sectionId) => {
    setButtonStates((prevState) => ({
      ...prevState,
      [sectionId]: !prevState[sectionId],
    }));
  };

  const handleDisplayVideos = async (sectionId) => {
    try {
      if (!videosBySection[sectionId]) {
        toggleButton(sectionId);
        setLoadingStates((prevLoadingSections) => {
          const updatedLoadingSections = [...prevLoadingSections];
          updatedLoadingSections[sectionId] = true;
          return updatedLoadingSections;
        });

        const response = await axios.get(`/courses/${params?.course}/sections/${sectionId}`, {
          headers: {
            Authorization: `Bearer ${session?.token}`,
          },
        });

        const updatedVideosBySection = { ...videosBySection };
        updatedVideosBySection[sectionId] = response.data.videos;

        setVideosBySection(updatedVideosBySection);
      } else {
        toggleButton(sectionId);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setTimeout(() => {
        setLoadingStates((prevLoadingSections) => {
          const updatedLoadingSections = [...prevLoadingSections];
          updatedLoadingSections[sectionId] = false;
          return updatedLoadingSections;
        });
      }, 1000);
    }
  };


  return (
    <div className="py-8 overflow-visible relative w-[90%] md:w-[85%] mx-auto">
      {course.id ? ( // Check if the course data is available
        <>
          <div className="flex justify-between mb-8 items-center">
            <div className="flex gap-2">
              <h1 className="text-4xl capitalize font-semibold">{course?.name}</h1>
            </div>
            {
              <div className="flex gap-2">
                {session?.tutor?.tutor_id === course?.tutor_id && (
                  <Button
                    onClick={() => router.push(`/tutor/courses/${params?.course}/edit`)}
                    variant="outline"
                    className="flex gap-2 transform active:-translate-y-1 border-black items-center"
                  >
                    <Icons.edit className="w-4 h-4 stroke-black" />
                    Edit Course
                  </Button>
                )}
                {session?.tutor?.tutor_id === course?.tutor_id && (
                  <Link
                    className={cn(
                      buttonVariants({ variant: 'outline' }),
                      'border-subcolor2 text-subcolors '
                    )}
                    href={`/courses/${params?.course}`}
                  >
                    
                      View Course
                  </Link>
                 
                )}
                {!(session?.tutor?.tutor_id === course?.tutor_id) ? (
                  isEnrolled ? (
                    <Button
                      onClick={() => {
                        const enrollment = enrollments.find((enrollment) => enrollment.course.id === course.id);
                        if (enrollment) {

                          setEnrollmentId(enrollment.id);
                        }
                        seUnEnrollmentModal(true)
                      }}
                      variant="outline"
                      className="flex gap-2 transform active:-translate-y-1 bg-main border-main text-white items-center"
                    >
                      Enrolled
                    </Button>
                  ) : (
                    <Button
                      onClick={() => {
                        setEnrollmentModal(true)
                      }}
                      variant="outline"
                      className="flex gap-2 transform active:-translate-y-1 bg-subcolor border-subcolor text-white items-center"
                    >
                      Enroll in Course
                    </Button>
                  )
                ) : null}


              </div>
            }
          </div>
          <div className="rounded-md">
            {course.thumbnail && (
              <Image
                src={course?.thumbnail}
                width={500}
                height={500}
                className="mb-4 rounded-md"
                alt="course-thumbnail"
              />
            )}
          </div>
          {sections &&
            sections.map((section, sectionIndex) => (
              <div className="" key={section.id}>
                <header
                  onClick={() => handleDisplayVideos(section?.id)}
                  className={`cursor-pointer flex flex-col lg:flex-row justify-between border bg-white p-4 shadow-md ${buttonStates[section?.id] ? 'mb-2 ' : ''
                    }`}
                >
                  <div className="mb-2 flex justify-between w-full items-center lg:mb-0">
                    <div className="flex gap-4 ">
                      <Icons.expantArrow
                        className={`w-[20px] h-[20px] transform transition-all duration-300 ease-in-out ${buttonStates[section?.id] ? ' rotate-180' : 'rotate-0'
                          }`}
                      />
                      <h2 className="font-semibold text-[1.04rem] ">
                        {`Section ${sectionIndex + 1} : ${section?.name}`}
                      </h2>
                    </div>
                    <p className="text-sm text-gray-600">Duration: 10:00</p>
                  </div>
                </header>

                {buttonStates[section?.id] ? (
                  loadingStates[section?.id] ? (
                    <div className={` ${buttonStates[section?.id] ? 'mb-2 ' : ''}`}>
                      <LoadingSkeletons times={3} />
                    </div>
                  ) : (
                    <div
                      className={`grid md:grid-cols-2 lg:grid-cols-3 gap-4 ${buttonStates[section?.id] ? 'mb-2 ' : ''
                        }`}
                    >
                      {videosBySection[section?.id] &&
                        videosBySection[section?.id]?.map((video, videoIndex) => {
                          return (
                            <VideoItem

                              setVideosBySection={setVideosBySection}
                              sectionId={section?.id}
                              courseId={params?.course}
                              key={video?.id}
                              video={video}
                              videosBySection={videosBySection}
                            />
                          );
                        })}
                    </div>
                  )
                ) : null}
              </div>
            ))}
          <CourseUnEnrollmentModal enrollmentId={enrollmentId} setIsEnrolled={setIsEnrolled} token={session?.token} courseId={course?.id} isOpen={unEnrollmentModal} setIsOpen={seUnEnrollmentModal} />
          <CourseEnrollmentModal setEnrollments={setEnrollments} setIsEnrolled={setIsEnrolled} token={session?.token} courseId={course?.id} isOpen={enrollmentModal} setIsOpen={setEnrollmentModal} />
        </>) : <div className='min-h-[60vh] flex items-center justify-center'>
        <div className='animate-spin'>
          <Icons.Loader2 width="36" height="36" className="stroke-black w-6 h-6" />
        </div>
      </div>}
    </div>
  );
};

export default CoursePage;

export const VideoItem = ({ video, sectionId, courseId, setVideosBySection, videosBySection }) => {
  const [open, setOpen] = useState(false);
  const [deletOpen, setDeleteOpen] = useState(false);
  const axios = useAxiosPrivate();
  const { data: user } = useSession();
  const [toggleMenu, setToggleMenu] = useState(false);
  const onDeleteSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.delete(
        `/courses/${courseId}/sections/${sectionId}/videos/${video?.id}`
      );
      errorToast('Video Deleted Successfully');

      if (response.status === 200) {
        const response = await axios.get(`/courses/${courseId}/sections/${sectionId}`);

        const updatedVideosBySection = { ...videosBySection };
        updatedVideosBySection[sectionId] = response.data.videos;
        setVideosBySection(updatedVideosBySection);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="h-[20rem] relative block w-full p-4 bg-white shadow-md rounded-md">
      {video?.live && (
        <span className="absolute top-6 z-[1000] right-6 bg-[#FB3C22] flex gap-1 items-center py-[0.20rem] rounded-xl text-sm text-white px-2 font-medium">
          <Icons.live className="w-5 h-5" />
          Live
        </span>
      )}

      {video?.price && video?.price > 0 && (
        <span className="absolute top-2 z-[1000] left-0 bg-subcolor text-[0.7rem] py-[0.15rem]  rounded-r-md text-white px-3 font-medium">
          {video?.price}$
        </span>
      )}
      <div className="relative cursor-pointer">
        <Icons.play />
        {video?.thumbnail ? (
          <Image
            src={video?.thumbnail}
            alt={'thumbnail'}
            width={300}
            height={200}
            className="rounded-md object-cover w-full h-[11.2rem]"
          />
        ) : (
          <div className="rounded-md object-cover w-full h-[11.2rem]"></div>
        )}
      </div>
      <div className="mt-3 flex gap-2 w-full">
        <UserAvatar user={{ image: user?.profile_image }} />
        <div className="w-full group">
          <div className="w-full flex justify-between items-start">
            <div

              className="text-[1.10rem]  font-[550] mb-[0.20rem]  "
            >
              <span className="line-clamp-2">
                {video?.title}
              </span>
            </div>

          </div>
          <div className="flex items-center text-sm gap-2 text-gray-700">
            <span>authors</span>
          </div>
          <div className="flex items-center text-sm gap-2 text-gray-700">
            <span>{video?.views} views</span>
            <span>&bull;</span>
            <span>{formatTimeAgo(video.createdAt)}</span>
            <span>&bull;</span>
            <div className="flex items-center">
              {video?.rating}{' '}
              <span>
                <Icons.rating />
              </span>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};


export function CourseEnrollmentModal({ isOpen, setIsOpen, token, courseId, setIsEnrolled, setEnrollments }) {
  const [loading, setLoading] = useState(false)
  const ref = useRef(null)
  const axios = useAxiosPrivate()

  function closeModal() {
    setIsOpen(false);
  }

  const handleCourseEnrollment = async () => {
    try {
      setLoading(true)
      const response = await axios.post(`/courses/${courseId}/enroll`, {}, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      const enrollmentsResponse = await axios.get('/courses/enrollments', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setEnrollments(enrollmentsResponse.data?.enrollments)
      const isEnrolledInCourse = enrollmentsResponse.data?.enrollments.some((enrollment) => enrollment?.course?.id === courseId);

      closeModal()
      setIsEnrolled(isEnrolledInCourse)

    } catch (err) {
      console.log(err)
    } finally {
      setLoading(false)
    }
  }


  function openModal() {
    setIsOpen(!isOpen);
  }

  return (
    <Dialog open={isOpen} onOpenChange={openModal}>
      <DialogContent className="sm:max-w-[425px] shadow-md bg-white">
        <DialogHeader>
          <DialogTitle>Enroll!</DialogTitle>
        </DialogHeader>
        <DialogDescription>

          <p>Do you really want to enroll in this course?</p>

        </DialogDescription>
        <DialogFooter>
          <Button className="bg-black" onClick={closeModal}>
            Close
          </Button>
          <Button onClick={handleCourseEnrollment} className="bg-main flex gap-2 items-center text-white">
            {
              loading &&

              <div className='animate-spin'>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-loader-2"><path d="M21 12a9 9 0 1 1-6.219-8.56" /></svg>
              </div>
            } Enroll
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>

  );
}
export function CourseUnEnrollmentModal({ isOpen, setIsOpen, token, courseId, setIsEnrolled, enrollmentId }) {
  const [loading, setLoading] = useState(false)

  const axios = useAxiosPrivate()
  function closeModal() {
    setIsOpen(false);
  }

  const handleCourseEnrollment = async () => {
    try {
      setLoading(true)
      const response = await axios.delete(`/courses/enrollments/unenroll/${enrollmentId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      const enrollmentsResponse = await axios.get('/courses/enrollments', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });


      const isEnrolledInCourse = enrollmentsResponse.data.enrollments.some((enrollment) => enrollment?.course?.id === courseId);
      closeModal()
      setIsEnrolled(isEnrolledInCourse)

    } catch (err) {
      console.log(err)
    } finally {
      setLoading(false)
    }
  }
  function openModal() {
    setIsOpen(!isOpen);
  }


  return (
    <Dialog open={isOpen} onOpenChange={openModal}>
      <DialogContent className="sm:max-w-[425px] shadow-md bg-white">
        <DialogHeader>
          <DialogTitle>Un-Enroll!</DialogTitle>
        </DialogHeader>
        <DialogDescription>

          <p>Do you really want to un-enroll from this course?</p>

        </DialogDescription>
        <DialogFooter>
          <Button className="bg-black" onClick={closeModal}>
            Close
          </Button>
          <Button onClick={handleCourseEnrollment} className="bg-subcolor2 flex gap-2 items-center text-white">
            {
              loading &&

              <div className='animate-spin'>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-loader-2"><path d="M21 12a9 9 0 1 1-6.219-8.56" /></svg>
              </div>
            } Un-Enroll
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}



