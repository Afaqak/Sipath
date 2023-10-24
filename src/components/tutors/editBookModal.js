'use client';
import React, { useState, useRef } from 'react';
import { Dialog, DialogContent, DialogFooter, DialogHeader } from '@/components/ui/dialog';
import useAxiosPrivate from '@/hooks/useAxiosPrivate';
import {
  NewBookBodyColumn,
  CoverPreview,
  UploadBookColumn,
  VideoUploadType,
  DeleteModal,
} from '@/components';
import { successToast, errorToast } from '@/utils/toasts';
import { useSession } from 'next-auth/react';
import { useDispatch } from 'react-redux';
import { UpdateBook, deleteBook } from '@/features/book/bookThunk';
import { Button } from '../ui/button';

export const EditBookModal = ({ isOpen, setIsOpen, book }) => {
  console.log(book, '{book from modal}');
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const dispatch = useDispatch();
  const { data: user } = useSession();
  const [loading, setLoading] = useState(false);
  const axios = useAxiosPrivate();
  const [type, setType] = useState('free');
  const [cbook, csetBook] = useState(null);
  const [price, setPrice] = useState(book?.price);
  const [bookTitle, setBookTitle] = useState(book?.title);
  const [isDownloadable, setIsDownloadable] = useState(false);
  const [bookDescription, setBookDescription] = useState(book?.description);
  const [subject, setSubject] = useState(book?.subject?.toString());
  const [thumbnail, setThumbnail] = useState(null);

  const onDeleteSuccess = () => {
    successToast('Book deleted!');
  };
  const onDeleteError = () => {
    errorToast('Error deleting the Book!');
  };

  const onUpdateSuccess = () => {
    closeModal();
    successToast('Book Updated Successfully!');
  };

  const onUpdateError = () => {
    errorToast('Error uploading book!');
  };
  const onDeleteSubmit = () => {
    try {
      dispatch(
        deleteBook({
          token: user?.token,
          bookId: book?.id,
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

      const data = {
        title: bookTitle,
        description: bookDescription,
        thumbnail,
        subject,
        book: cbook,
        price: price > 0 ? price : null,
      };
      console.log(data);
      const filteredData = Object.fromEntries(
        Object.entries(data).filter(
          ([key, value]) => value !== undefined && value !== null && value !== ''
        )
      );

      console.log(filteredData, 'filtered Data');

      dispatch(
        UpdateBook({
          bookId: book?.id,
          token: user?.token,
          data: filteredData,
          onSuccess: onUpdateSuccess,
          onError: onUpdateError,
        })
      );
    } catch (error) {
      setLoading(false);
      console.error('Error updating book:', error);
    } finally {
      setLoading(false);
    }
  };
  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(!isOpen);
  }

  return (
    <Dialog open={isOpen} onOpenChange={openModal}>
      <DialogContent className="bg-none flex flex-col">
        <DialogHeader>
          <VideoUploadType type={type} setType={setType} setPrice={setPrice} />
        </DialogHeader>
        <form onSubmit={onSubmit}>
          <div className=" bg-white mt-4 flex md:flex-row flex-col uppercase gap-6 p-4 rounded-md shadow-md">
            <NewBookBodyColumn
              bookTitle={bookTitle}
              setBookTitle={(e) => setBookTitle(e.target.value)}
              bookDescription={bookDescription}
              setBookDescription={(e) => setBookDescription(e.target.value)}
            />
            <UploadBookColumn
              isDownloadable={isDownloadable}
              subject={subject}
              setSubject={setSubject}
              setIsDownloadable={setIsDownloadable}
              bookFile={cbook}
              setBookFile={csetBook}
            />
            <CoverPreview thumbnail={thumbnail} setThumbnail={setThumbnail} />
          </div>
          <DialogFooter>
            <div className="flex justify-end mt-4 gap-3">
              <Button
                variant="destructive"
                type="button"
                onClick={() => setOpenDeleteModal(true)}
                className=""
              >
                Delete Book
              </Button>
              <Button variant="outline" onClick={onSubmit} className="">
                Update Book
              </Button>
            </div>
          </DialogFooter>
        </form>
      </DialogContent>
      <DeleteModal
        isOpen={openDeleteModal}
        setIsOpen={setOpenDeleteModal}
        text={book?.title}
        onDeleteSubmit={onDeleteSubmit}
      />
    </Dialog>
  );
};
