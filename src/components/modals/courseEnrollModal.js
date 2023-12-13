import { useState,useRef } from "react";
import useAxios from "@/hooks/useAxios";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from '@/components/ui/dialog';

import { successToast } from '@/utils/toasts';
import { Button } from '@/components/ui/button';

export function CourseEnrollmentModal({ isOpen, setIsOpen, token, courseId, setIsEnrolled, setEnrollments }) {
    const [loading, setLoading] = useState(false)

    const axios = useAxios()
  
    function closeModal() {
      setIsOpen(false);
    }
  
    const handleCourseEnrollment = async () => {
      try {
        setLoading(true)
        await axios.post(`/courses/${courseId}/enroll`, {}, {
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
        successToast("Enrolled Successfully!")
        closeModal()
        setIsEnrolled(isEnrolledInCourse)
  
      } catch (err) {
        console.log(err)
        errorToast("Error Getting Enrolled!")
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