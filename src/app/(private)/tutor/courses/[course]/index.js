'use client';
import React, { useEffect, useState, useRef } from 'react';
import useAxios from '@/hooks/useAxios';
import { useRouter, useSearchParams } from 'next/navigation';
import { LoadingSkeletons, Icons, CourseEnrollmentModal, CourseUnEnrollmentModal } from '@/components';
import { errorToast, successToast } from '@/utils/toasts';
import { Button } from '@/components/ui/button';
import UserAvatar from '@/components/common/userAvatar';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import { useParams } from 'next/navigation';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { buttonVariants } from '@/components/ui/button';
import { useFormattedTimeAgo } from '@/hooks/useFormattedTimeAgo';
import { BuyNowModal } from '@/components/modals/paymentModal';
import { initializeStripe, redirectToCheckout } from '@/utils/stripeUtils';
import { SuccessfullPurchaseModal } from '@/components/modals/successfullPurchaseModal';



const CoursePage = ({ session }) => {
  const axios = useAxios();
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
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false)
  const searchParams=useSearchParams()
  const session_id = searchParams.get('session_id')
  const currentUrl = window.location.href;
  const baseUrlWithoutQueryParams = currentUrl.split('?')[0];
  const [stripe, setStripe] = useState(null);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);


  useEffect(() => {
    initializeStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY).then((stripeInstance) => {
      setStripe(stripeInstance);
    });
  }, []);



  const setPurchase = async () => {

    try {
      const response = await axios.post(`/purchases?session_id=${session_id}`, {
        asset_id: params.course,
        asset_type: "video"
      }, {
        headers: {
          Authorization: `Bearer ${session?.token}`
        }
      });

      router.replace(baseUrlWithoutQueryParams)
      setIsSuccessModalOpen(true);
      setTimeout(() => {
        setIsSuccessModalOpen(false);
      }, 2500);

    } catch (err) {
      console.log('Error in setPurchase:', err);
    }
  };

  useEffect(() => {
    if (session_id) {
      console.count('Session ID is not null:', session_id);
      setPurchase();
    }
  }, [session_id]);



  const onBuyNowSubmit = async (onDone) => {
    try {

      const response = await axios.post("/purchases/create-checkout-session?type=course", {
        asset_id: course?.id,
        return_url: window.location.href
      }, {
        headers: {
          Authorization: `Bearer ${session?.token}`
        }
      })

      const { sessionId } = response.data;

      await redirectToCheckout(stripe, sessionId);

    } catch (err) {
      console.log(err)
    } finally {
      if (onDone && typeof onDone === 'function') {
        onDone()
      }
    }
  }






  useEffect(() => {
    const fetchSections = async () => {
      try {
        const response = await axios.get(`/courses/${params?.course}/sections`, {
          headers: {
            Authorization: `Bearer ${session?.token}`,
          },
        });
        setSections(response.data.sections);
        setCourse(response.data.course);
        setLoadingStates(new Array(response.data.sections.length).fill(false));
        setButtonStates(new Array(response.data.sections.length).fill(false));
      } catch (err) {
        console.log(err)
      }
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
        setSections((prevSections) => prevSections.map((prevSection) => {
          if (prevSection.id === response?.data?.section?.id) {
            return { ...prevSection, ...response?.data?.section };
          }
          return prevSection;
        }));


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
      }, 300);
    }
  };

  function formatDuration(total_time) {
    if (!total_time) return '';

    const { hours, minutes, seconds } = total_time;

    let formattedDuration = '';

    if (hours > 0) {
      formattedDuration += `${hours}h `;
    }

    if (minutes > 0 || formattedDuration !== '') {
      formattedDuration += `${minutes}m `;
    }

    formattedDuration += `${seconds}s`;

    return formattedDuration.trim();
  }

  return (
    <div className="py-8 overflow-visible relative w-[90%] md:w-[85%] mx-auto">
      {course.id ? (
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
                {(session?.tutor?.tutor_id === course?.tutor_id || isEnrolled) && (
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
                        course?.price ?
                          setIsPaymentModalOpen(true) :
                          setEnrollmentModal(true)
                      }}
                      variant="outline"
                      className="flex gap-2 transform active:-translate-y-1 bg-subcolor border-subcolor text-white items-center"
                    >
                      {
                        course?.price ? `Enroll in course for ${course?.price}$` : "Enroll Now!"
                      }
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
                    <p className="text-sm text-gray-600">  {section.total_time && formatDuration(section.total_time)}
                    </p>
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
          <BuyNowModal setIsOpen={setIsPaymentModalOpen} onBuyNowSubmit={onBuyNowSubmit} isOpen={isPaymentModalOpen} />
          <SuccessfullPurchaseModal isOpen={isSuccessModalOpen} setIsOpen={setIsSuccessModalOpen} />
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
  const axios = useAxios();
  const { data: user } = useSession();
  const [toggleMenu, setToggleMenu] = useState(false);

  const formattedTimeAgo = useFormattedTimeAgo(video?.createdAt)

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
            <span>{video?.user?.display_name}</span>
          </div>
          <div className="flex items-center text-sm gap-2 text-gray-700">
            <span>{video?.views} views</span>
            <span>&bull;</span>
            <span>{video && formattedTimeAgo}</span>
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




