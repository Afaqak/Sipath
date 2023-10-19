'use client';
import React, { useState, useRef } from 'react';
import { VideoUploadType, NewBookBodyColumn, UploadBookColumn, CoverPreview } from '@/components';
import useAxiosPrivate from '@/hooks/useAxiosPrivate';
import { useSession } from 'next-auth/react';
import { successToast, errorToast } from '@/utils/toasts';
import { useDispatch } from 'react-redux';
import { createBook } from '@/features/book/bookThunk';
const AddBook = () => {
  const dispatch = useDispatch();
  const { data: user } = useSession();
  const [loading, setLoading] = useState(false);
  const axios = useAxiosPrivate();
  const [type, setType] = useState('free');
  const [book, setBook] = useState(null);
  const [price, setPrice] = useState(null);
  const [bookTitle, setBookTitle] = useState('');
  const [isDownloadable, setIsDownloadable] = useState(false);
  const [bookDescription, setBookDescription] = useState('');
  const [subject, setSubject] = useState('');
  const [thumbnail, setThumbnail] = useState(null);

  console.log(subject, bookTitle, bookDescription, thumbnail, isDownloadable);

  const onSuccess = () => {
    successToast('Book Uploaded Successfully!');
    setSubject('');
    setBookDescription('');
    setBookTitle('');
    setThumbnail(null);
    setBook(null);
  };

  const onError = () => {
    errorToast('Error uploading book!');
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!bookTitle || !bookDescription || !subject || !book || !thumbnail) {
      errorToast('Please fill in all required fields.');
      return;
    }

    try {
      setLoading(true);
      const formData = new FormData();
      formData.append('book', book);
      formData.append('title', bookTitle);
      formData.append('description', bookDescription);
      formData.append('thumbnail', thumbnail);
      formData.append('subject', subject);
      if (type === 'premium' && price > 0) {
        formData.append('price', price);
      }
      dispatch(createBook({ formData, token: user?.token, onSuccess, isDownloadable, onError }));
    } catch (error) {
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative w-[90%] mt-16 md:w-fit mx-auto">
      <VideoUploadType type={type} setType={setType} setPrice={setPrice} />
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
            bookFile={book}
            setBookFile={setBook}
          />
          <CoverPreview thumbnail={thumbnail} setThumbnail={setThumbnail} />
        </div>
        <div className="flex justify-end">
          <button
            disabled={loading}
            type="submit"
            className="bg-black flex gap-1 rounded-md px-8 mt-4 py-1 text-white"
          >
            Add Book
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddBook;
