import { useEffect, useState } from "react";
import Link from "next/link";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import { Icons, Quiz, formatTimeAgo } from "@/components";
import { setQuizes } from "@/features/quiz/quizSlice";
import { useDispatch, useSelector } from "react-redux";
import UserAvatar from "../common/userAvatar";
import useFetch from "@/hooks/useFetch";
import Image from "next/image";

export const MyCourses = ({ user, url, dataKey = 'courses' }) => {
    const { data } = useFetch(url, {
        headers: {
            Authorization: `Bearer ${user?.token}`,
        },
    });


    const courses = data?.[dataKey] || [];
    return (
        <div className="py-8 grid md:grid-cols-2 gap-4 lg:grid-cols-3">
            {courses.map((course) => (
                <CourseCard user={course?.tutor?.user || user?.user} key={course?.id} course={dataKey === 'courses'?course:course?.course } />
            ))}
        </div>
    );
};


export const CourseCard = ({ course, user, type = "course" }) => {
    const newHref = type === 'learning' ? `/courses/${course?.id}` : `/tutor/courses/${course?.id}`
    return (
        <Link
            href={newHref}
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
                <UserAvatar user={{ image: user?.profile_image }} />
                <div>
                    <h1 className="text-[1.05rem] font-semibold mb-[0.20rem] line-clamp-2">{course?.name}</h1>
                    <div className="flex items-center text-sm gap-2 text-gray-700">
                        <span>{user?.display_name}</span>
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



export const MyQuizzes = ({ token, url }) => {

    const quizes = useSelector((state) => state?.quizzes?.quizzes);
    const [isEdit, setIsEdit] = useState(false);

    const { data } = useFetch(url, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }, (data) => {
        dispatch(setQuizes(data)); 
    })

    return (
        <div className="w-[90%] mx-auto mt-10">
            <div className="flex justify-end w-full">
                {data?.length > 0 && quizes.length > 0 && (
                    <button
                        type="button"
                        onClick={() => setIsEdit(!isEdit)}
                        className={`w-10 h-4 rounded-2xl bg-white flex shadow-[inset_1px_3px_7px_rgba(0,0,0,0.2)] items-center transition duration-300 focus:outline-none text-subcolor`}
                    >
                        <div
                            className={`w-6 h-6 relative rounded-full flex items-center justify-center  transition duration-300 transform p-1 ${isEdit ? 'translate-x-full  bg-subcolor3' : ' -translate-x-2 bg-subcolor'
                                }`}
                        >
                            {isEdit ? (
                                <Icons.cross className=" stroke-white h-2 w-2" />
                            ) : (
                                <Icons.editPencil className=" stroke-white h-3 w-3" />
                            )}
                        </div>
                    </button>
                )}
            </div>
            {quizes && quizes.map((quiz, index) => <Quiz isEdit={isEdit} key={index} quiz={quiz} />)}
        </div>
    );
};




