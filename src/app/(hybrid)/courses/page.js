'use client'


import { useEffect, useState } from "react"
import Image from "next/image"
import { CourseCard } from "@/components"
import { useSession } from "next-auth/react"

const CoursePage = () => {
  return (<>
    <MyCourses  />
  </>)
}

export default CoursePage


const MyCourses = () => {
  const [courses, setCourses] = useState([]);
  const [enrollments, setEnrollments] = useState([])
  const [limit, setLimit] = useState(10)
  const {user:session}=useSession()
  
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const request = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/courses/all?limit=${limit}`);
        if (session?.token) {
          const enrollmentsRequest = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/courses/enrollments`, {
            headers: {
              Authorization: `Bearer ${session?.token}`,
            },
          });
          const enrollmentsResponse = await enrollmentsRequest.json()
          setEnrollments(enrollmentsResponse?.enrollments)
        }
        const response = await request.json()

        setCourses(response);
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

