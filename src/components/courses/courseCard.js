import { useFormattedTimeAgo } from "@/hooks/useFormattedTimeAgo";
import { ProfileHoverCard } from "@/components/common/profileHoverCard";
import UserAvatar from "@/components/common/userAvatar";
import { Badge } from "@/components/ui/badge"
import Link from "next/link";
import Image from "next/image";


export const CourseCard = ({ course, enrollments }) => {
    const formattedTimeAgo = useFormattedTimeAgo(course?.createdAt)
    const isEnrolled = enrollments.some(
        (enrollment) => enrollment?.course?.id === course.id
    );
    const href = isEnrolled ? `/courses/${course.id}` : `/tutor/courses/${course?.id}`;
    return (
        <div

            className="max-h-[20rem] relative block mb-6 w-full p-4 bg-white box-shadow-main rounded-md"
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
                {isEnrolled && <Badge className={'absolute top-3 right-3 bg-black'}>
                    Enrolled
                </Badge>}
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
                        <span>{course && formattedTimeAgo}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};


