import React, { useState } from 'react';
import Image from 'next/image';
import { VideoandThumbnail, QuizUploadColumn } from '@/components';
import { Dialog, DialogContent, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import useAxiosPrivate from '@/hooks/useAxiosPrivate';
import { errorToast, successToast } from '@/utils/toasts';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export function VideoEditModal({
  isOpen,
  setIsOpen,
  video,
  courseId,
  setVideos,
  sectionId,
  setVideosBySection,
  videosBySection,
  isEdit = false,
}) {
  const initialStates = {
    title: video?.title,
    description: video?.description,
  };
  const { data: user } = useSession();
  
  const [quiz, setQuiz] = useState(null);
  const [quizSolution, setQuizSolution] = useState(null);
  const [thumbnail, setThumbnail] = useState(video?.thumbnail);
  const [subject, setSubject] = useState(video?.subject);
  const router = useRouter();
  const [duration, setDuration] = useState(null);
  const [body, setBody] = useState(initialStates);
  const [videoFile, setVideoFile] = useState(null);

  const handleFieldChange = (e) => {
    const { name, value } = e.target;
    setBody({ ...body, [name]: value });
  };

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(!isOpen);
  }

  const axios = useAxiosPrivate();

  const deleteVideo = async () => {
    try {
      if (!courseId && !sectionId) {
        const response = await axios.delete(`/assets/videos/${video?.id}`, {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        });
     
      } else {
        const updatedSections = { ...videosBySection };
        const response = await axios.delete(
          `/courses/${courseId}/sections/${sectionId}/videos/${video?.id}`,
          {
            headers: {
              Authorization: `Bearer ${user?.token}`,
            },
          }
        );

        const indexToDelete = updatedSections[sectionId].findIndex((v) => v.id === video.id);

        if (indexToDelete !== -1) {
          updatedSections[sectionId].splice(indexToDelete, 1);
        }
        setVideosBySection(updatedSections);

        
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmit = async () => {

    let updatedData = {};
    const updatedSections = { ...videosBySection };
    const data = { quiz, thumbnail, video, duration, ...body, subject };

    for (const key in data) {
      if (data.hasOwnProperty(key) && data[key] !== undefined) {
        updatedData[key] = data[key];
      }
    }
    if (!isEdit) {
      console.log(isEdit);
      if (!thumbnail || !duration || !videoFile || !body.description || !body.title || !duration) {
        return errorToast('Some fields are Missing!');
      }
    }

    try {
      if (isEdit) {
        if (!courseId && !sectionId) {
          const response = await axios.patch(`/assets/videos/${video?.id}`, updatedData, {
            headers: {
              Authorization: `Bearer ${user?.token}`,
            },
          });

          

          setVideos(response.data.updatedVideo);
        } else {
          const response = await axios.patch(
            `/courses/${courseId}/sections/${sectionId}/videos/${video?.id}`,
            updatedData,
            {
              headers: {
                Authorization: `Bearer ${user?.token}`,
              },
            }
          );
          updatedSections[sectionId] = updatedSections[sectionId].map((video) =>
            video.id === response.data.updatedVideo.id ? response.data.updatedVideo : video
          );
          
          setVideosBySection(updatedSections);

          setVideosBySection(updatedSections);

        }
        successToast('Video updated Sucessfully!', '#1850BC');
      } else {
        const formDataToSend = new FormData();
        formDataToSend.append('video', videoFile);
        formDataToSend.append('thumbnail', thumbnail);
        formDataToSend.append('title', body.title);
        formDataToSend.append('description', body.description);
        formDataToSend.append('subject', subject);
        formDataToSend.append('duration', duration);
        const response = await axios.post('/upload/video', formDataToSend, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${user?.token}`,
          },
        });
        if (response.status === 200) {
     
          successToast('Video uploaded Sucessfully!', '#1850BC');
          const videoId = response.data?.video?.id;
          
          const addVideoResponse = await axios.post(
            `/courses/${courseId}/section/${sectionId}/videos`,
            { video_id: videoId },
            {
              headers: {
                Authorization: `Bearer ${user?.token}`,
              },
            }
          );

          if (addVideoResponse.status === 200) {
           
            successToast('Video Added to Section!', '#1850BC');
            const response = await axios.get(`/courses/${courseId}/sections/${sectionId}`, {
              headers: {
                Authorization: `Bearer ${user?.token}`,
              },
            });
         
            const updatedVideosBySection = { ...videosBySection };
            updatedVideosBySection[sectionId] = response.data.videos;
            setVideosBySection(updatedVideosBySection);
          
          } else {
            console.error('Error adding video to section:', addVideoResponse.statusText);
          }
        } else {
          console.error('Error uploading video:', response.statusText);
        }
        //   const config = {
        //     headers: {
        //       'Content-Type': 'multipart/form-data',
        //     },

        //     onUploadProgress: (progressEvent) => {
        //       const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
        //       console.log(progress);
        //     },
        //   };

        //   const response = await axios.post(
        //     `/courses/${courseId}/section/${sectionId}/videos`,
        //     formDataToSend,
        //     config
        //   );
        //   console.log(response.data);
        // }
      }
    } catch (err) {
      console.log(err);
    } finally {
      closeModal();
    }
  };

  return (
    <>
      <Dialog className="bg-opacity-100" open={isOpen} onOpenChange={openModal}>
        <DialogContent className="w-full bg-white shadow-lg">
          <div className="flex flex-col lg:flex-row justify-between gap-8">
            <div className="flex gap-8">
              <div className="flex flex-col uppercase gap-2 text-[#616161] font-light">
                <div className="flex flex-col">
                  <label className="text-sm">Video title</label>
                  <input
                    onChange={handleFieldChange}
                    name="title"
                    value={body.title}
                    placeholder="Enter title..."
                    className="shadow-[inset_2px_1px_6px_rgba(0,0,0,0.2)] rounded-md px-3 py-1 placeholder:text-sm border-none focus:outline-none"
                    type="text"
                  />
                </div>
                <div className="flex flex-col">
                  <label className="text-sm">Video Description</label>
                  <textarea
                    onChange={handleFieldChange}
                    name="description"
                    rows={4}
                    value={body.description}
                    cols={4}
                    typeof="text"
                    placeholder="Enter description"
                    className="shadow-[inset_2px_1px_6px_rgba(0,0,0,0.2)] rounded-md px-3 py-1 placeholder:text-sm border-none focus:outline-none resize-none "
                  />
                </div>
              </div>
              <QuizUploadColumn
                quiz={quiz}
                quizSolution={quizSolution}
                setQuiz={setQuiz}
                setQuizSolution={setQuizSolution}
                onChange={setSubject}
                subject={subject}
              />
            </div>
            <VideoandThumbnail
              thumbnail={thumbnail}
              setDuration={setDuration}
              setVideo={setVideoFile}
              setThumbnail={setThumbnail}
            />
          </div>

          <DialogFooter className="absolute -bottom-14 right-0">
            <div className="mt-4">
              {isEdit && (
                <>
                  <Button onClick={deleteVideo} variant="destructive" className=" border mr-2">
                    Delete Forever
                  </Button>
                  <Button
                    className="border-green-500 text-green-500"
                    variant="outline"
                    onClick={handleSubmit}
                  >
                    Finish Editing
                  </Button>
                </>
              )}
              {!isEdit && (
                <Button
                  className="border-green-500 text-green-500"
                  variant="outline"
                  onClick={handleSubmit}
                >
                  Add Video
                </Button>
              )}
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
