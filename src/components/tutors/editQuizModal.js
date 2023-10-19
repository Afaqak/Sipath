'use client';
import React, { useState, useRef, useEffect } from 'react';
import { Dialog, DialogContent, DialogFooter, DialogHeader } from '@/components/ui/dialog';
import { DeleteModal, NewQuizBodyRow, UploadQuizRow } from '@/components';
import { successToast, errorToast } from '@/utils/toasts';
import { useSession } from 'next-auth/react';
import { useDispatch } from 'react-redux';
import { UpdateQuiz, deleteQuiz } from '@/features/quiz/quizThunk';
import { Button } from '../ui/button';

export const EditQuizModal = ({ isOpen, setIsOpen, quiz }) => {
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  console.log(quiz);
  const dispatch = useDispatch();
  const { data: user } = useSession();
  const [quizTitle, setQuizTitle] = useState(quiz?.title || '');
  const [subject, setSubject] = useState(quiz?.subject?.toString());
  const [quizSolutionFiles, setQuizSolutionFiles] = useState(null);
  const [quizFile, setQuizFile] = useState(null);
  const [thumbnailFile, setThumbnailFile] = useState(quiz?.thumbnail);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (quiz) {
      console.log(quiz, 'eddec');
      setQuizTitle(quiz.title || '');
      setSubject(quiz.subject?.toString() || '');
      setThumbnailFile(quiz.thumbnail || null);
    }
  }, []);

  function closeModal() {
    console.log('close');
    setIsOpen(false);
    setOpenDeleteModal(false);
  }

  function openModal() {
    setIsOpen(!isOpen);
  }
  const onDeleteSuccess = () => {
    successToast('Quiz deleted!');
    closeModal();
  };
  const onDeleteError = () => {
    errorToast('Error deleting the Quiz!');
  };

  const onUpdateSuccess = () => {
    closeModal();
    successToast('Quiz Updated Successfully!');
    setSubject('');
    setQuizTitle('');
    setThumbnailFile(null);
  };

  const onUpdateError = () => {
    errorToast('Error uploading Quiz!');
  };
  const onDeleteSubmit = () => {
    try {
      dispatch(
        deleteQuiz({
          token: user?.token,
          quizId: quiz?.id,
          tutorId: user?.tutor.tutor_id,
          onSuccess: onDeleteSuccess,
          onError: onDeleteError,
        })
      );
    } catch (err) {
      console.error(err);
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    console.log('running');
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append('title', quizTitle);
      formData.append('thumbnail', thumbnailFile);
      formData.append('subject', subject);

      dispatch(
        UpdateQuiz({
          quizId: quiz?.id,
          token: user?.token,
          data: formData,
          onSuccess: onUpdateSuccess,
          onError: onUpdateError,
        })
      );
    } catch (error) {
      setLoading(false);
      console.error('Error updating Quiz:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={openModal}>
      <DialogContent className="bg-none flex flex-col">
        <form onSubmit={onSubmit}>
          <div className=" bg-white mt-4 flex  flex-col uppercase gap-6 p-4 rounded-md shadow-md">
            <NewQuizBodyRow
              quizTitle={quizTitle}
              setQuizTitle={setQuizTitle}
              selectedSubject={subject}
              setSelectedSubject={setSubject}
            />
            <UploadQuizRow
              quizSolutionFiles={quizSolutionFiles}
              setQuizSolutionFiles={setQuizSolutionFiles}
              thumbnailFile={thumbnailFile}
              setThumbnailFile={setThumbnailFile}
              quizFile={quizFile}
              setQuizFile={setQuizFile}
            />
          </div>
          <DialogFooter>
            <div className="flex justify-end mt-4 gap-3">
              <Button
                variant="destructive"
                type="button"
                onClick={() => setOpenDeleteModal(true)}
                className=""
              >
                Delete Quiz
              </Button>
              <Button variant="outline" onClick={onSubmit} className="">
                Update Quiz
              </Button>
            </div>
          </DialogFooter>
        </form>
      </DialogContent>
      <DeleteModal
        isOpen={openDeleteModal}
        setIsOpen={setOpenDeleteModal}
        text={quiz?.title}
        onDeleteSubmit={onDeleteSubmit}
      />
    </Dialog>
  );
};
