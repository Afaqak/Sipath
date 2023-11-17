'use client'

import { ContentContainer, ProfileHoverCard, formatTimeAgo } from "@/components"
import useAxiosPrivate from "@/hooks/useAxiosPrivate"
import { useEffect, useState } from "react"
import Link from "next/link"
import UserAvatar from "@/components/common/userAvatar"
import Image from "next/image"
const CoursePage = ({ session }) => {

    return (<ContentContainer>
        <MyCourses session={session} />
    </ContentContainer>)
}

export default CoursePage


const MyCourses = ({ session }) => {
    const [courses, setCourses] = useState([]);
    const [enrollments, setEnrollments] = useState([])
    const [limit, setLimit] = useState(10)
    const axios = useAxiosPrivate();
    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await axios.get(`/courses/all?limit=${limit}`, {
                    headers: {
                        Authorization: `Bearer ${session?.token}`,
                    },
                });

                const enrollmentsResponse = await axios.get('/courses/enrollments', {
                    headers: {

                        Authorization: `Bearer ${session?.token}`,
                    },
                });

                setCourses(response.data);
                setEnrollments(enrollmentsResponse.data?.enrollments)
            } catch (err) {
                console.log(err);
            }
        };
        fetchCourses();
    }, [limit]);

    const loadMore = () => {

        setLimit(limit + 10)
    }

    return (
        <div>
            <div className="py-8 grid md:grid-cols-2 gap-4 lg:grid-cols-3">
                {courses.map((course) => (
                    <CourseCard enrollments={enrollments} session={session} key={course?.id} course={course} />
                ))}

            </div>
            <div>
                {
                    courses?.length > 0 &&
                    <div className="text-center w-full">
                        <div className="flex justify-center flex-col items-center mt-8">
                            <button onClick={loadMore} className="bg-gray-100 px-4 py-2 rounded-md text-black font-semibold">
                                Load More
                            </button>
                            <Image src="/svgs/expand_more.svg" alt="expand_more" width={15} height={15} />
                        </div>
                    </div>
                }

            </div>
        </div>
    );
};

const CourseCard = ({ course, session, enrollments }) => {

    const isEnrolled = enrollments.some(
        (enrollment) => enrollment?.course?.id === course.id
    );
    const href = isEnrolled ? `/courses/${course.id}` : `/tutor/courses/${course?.id}`;
    return (
        <div

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
                <div>
                    <ProfileHoverCard user={course?.tutor?.user}>
                        <UserAvatar user={{ image: course?.tutor?.user?.profile_image }} />
                    </ProfileHoverCard>
                </div>
                <div>
                    <Link href={href} className="text-[1.05rem] font-semibold mb-[0.20rem] line-clamp-2">{course?.name}</Link>
                    <div className="flex items-center text-sm gap-2 text-gray-700">
                        <span>{course?.tutor?.user?.display_name}</span>
                    </div>
                    <div className="flex items-center text-sm gap-2 text-gray-700">
                        <span>{formatTimeAgo(course.createdAt)}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};


