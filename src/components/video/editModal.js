'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import { VideoandThumbnail, QuizUploadColumn } from '@/components';

import { Dialog, DialogContent, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import useAxiosPrivate from '@/hooks/useAxiosPrivate';

export function VideoEditModal({
  isOpen,
  setIsOpen,
  video,
  courseId,
  sectionId,
  setVideosBySection,
  videosBySection,
}) {
  const initialStates = {
    title: video?.title,
    description: video?.description,
  };
  const [quiz, setQuiz] = useState(null);
  const [quizSolution, setQuizSolution] = useState(null);
  const [thumbnail, setThumbnail] = useState(video?.thumbnail);
  const [subject, setSubject] = useState(video?.subject);
  const [duration, setDuration] = useState(null);
  const [body, setBody] = useState(initialStates);
  const [videoFile, setVideoFile] = useState(null);
  console.log(quiz, setQuiz, duration, subject, body, 'new data');
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
        const response = await axios.delete(`/assets/videos/${video?.id}`);
        console.log(response.data);
      } else {
        const updatedSections = { ...videosBySection };
        const response = await axios.delete(
          `/courses/${courseId}/sections/${sectionId}/videos/${video?.id}`
        );

        console.log(response);
        const indexToDelete = updatedSections[sectionId].findIndex((v) => v.id === video.id);

        if (indexToDelete !== -1) {
          updatedSections[sectionId].splice(indexToDelete, 1);
        }
        setVideosBySection(updatedSections);

        console.log(response.data);
        console.log(updatedSections);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmit = async () => {
    let updatedData = {};
    const updatedSections = { ...videosBySection };
    console.log(updatedSections, 'from edit');
    const data = { quiz, thumbnail, video, duration, ...body, subject };

    for (const key in data) {
      if (data.hasOwnProperty(key) && data[key] !== undefined) {
        updatedData[key] = data[key];
      }
    }
    console.log(updatedData, 'updated new data');
    try {
      if (!courseId && sectionId) {
        const response = await axios.patch(`/assets/videos/${video?.id}`, updatedData);
        console.log(response.data);
      } else {
        const response = await axios.patch(
          `/courses/${courseId}/sections/${sectionId}/videos/${video?.id}`,
          updatedData
        );
        updatedSections[sectionId] = updatedSections[sectionId].map((video) =>
          video.id === response.data.updatedVideo.id ? response.data.updatedVideo : video
        );
        console.log(response.data);
        setVideosBySection(updatedSections);

        console.log(response.data.updatedVideo, 'updated', videosBySection);
      }
    } catch (err) {
      console.log(err);
    } finally {
      closeModal();
    }
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={openModal}>
        <DialogContent className="w-full">
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
              <Button onClick={deleteVideo} className="bg-black border mr-2">
                Delete Forever
              </Button>
              <Button
                className="border-green-500 text-green-500"
                variant="outline"
                onClick={handleSubmit}
              >
                Finish Editing
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
