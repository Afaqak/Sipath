import Image from 'next/image';
import { useParams, useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import useAxiosPrivate from '@/hooks/useAxiosPrivate';
import { Icons } from '../icons';

export const PlaylistItem = ({ title, duration, setVideoId, id, token, enrollments, setEnrollments }) => {
  const searchParams = useSearchParams();
  const videoid = searchParams.get('id');
  const [loading, setLoading] = useState(false);
  const axios = useAxiosPrivate();
  const courseParams = useParams();
  const courseId = courseParams?.course;
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    const enrollment = enrollments.find((enrollment) => enrollment.course_id === +courseId);

    if (enrollment) {
    
      setIsChecked(enrollment.completed_videos.includes(id));
    }
  }, [enrollments, courseId, id]);

  const handleChecked = async (e) => {
    setLoading(true);
 
    try {
      const response = await axios.patch(`/courses/${courseId}/markCompleted?videoId=${id}`, {}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
   
      setEnrollments((prevEnrollments) => {
        return prevEnrollments.map((enrollment) => {
          if (+enrollment.course_id === +courseId) {
            return {
              ...enrollment,
              ...response.data.updated,
            };
          }
          return enrollment;
        });
      });
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(true);
    }
  };

  return (
    <li
      onClick={() => {
        setVideoId(id);
      }}
      className={`flex hover:bg-blue-100 gap-3 cursor-pointer px-2 py-1 mb-1 rounded ${+videoid === id && 'bg-blue-100'}`}
    >
      <div className="flex">
        <input
          id="default-checkbox"
          type="checkbox"
          onChange={handleChecked}
          className="w-4 h-4 text-blue-600 mt-2 accent-blue-700"
          checked={isChecked}
        />
      </div>
      <div className='flex divide-y flex-col'>
        <span className="py-1">{title}</span>
        <div className="flex py-2 gap-2">
          <Image src={'/svgs/smartdisplay.svg'} width={15} height={15} alt="smart display" />
          <span className="text-[0.75rem] font-semibold">{duration}</span>
        </div>
      </div>
    </li>
  );
};
