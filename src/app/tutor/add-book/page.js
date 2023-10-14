'use client';
import React, { useState, useRef } from 'react';
import { FileInput, VideoUploadType } from '@/components';

import useAxiosPrivate from '@/hooks/useAxiosPrivate';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useSession } from 'next-auth/react';
import { successToast, errorToast } from '@/utils/toasts';

const AddBook = () => {
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
      formData.append('isDownloadable', isDownloadable);
      const response = await axios.post(`/upload/book?isDownloadable=${isDownloadable}`, formData, {
        headers: {
          Authorization: `Bearer ${user?.token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(response.data);
      if (response.status === 200) {
        successToast('Book Uploaded Successfully!');
        setSubject('');
        setBookDescription('');
        setBookTitle('');
        setThumbnail(null);
        setBook(null);
      }
    } catch (error) {
      setLoading(false);
      console.error('Error uploading book:', error);
      errorToast('Error uploading book!');
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

const NewBookBodyColumn = ({ bookTitle, bookDescription, setBookDescription, setBookTitle }) => {
  return (
    <div className="flex flex-col gap-4 text-sm">
      <div className="flex flex-col">
        <label className="text-[#616161] font-light">BOOK TITLE</label>

        <input
          value={bookTitle}
          onChange={setBookTitle}
          placeholder="Enter title..."
          className={`shadow-[inset_2px_1px_6px_rgba(0,0,0,0.2)] rounded-md px-3 py-1 placeholder:text-sm border-none focus:outline-none `}
          type="text"
        />
      </div>
      <div className="flex flex-col">
        <label className="text-[#616161] font-light">DESCRIPTION</label>

        <textarea
          onChange={setBookDescription}
          rows={4}
          value={bookDescription}
          cols={4}
          placeholder="Enter description"
          className={`shadow-[inset_2px_1px_6px_rgba(0,0,0,0.2)] rounded-md px-3 py-1 placeholder:text-sm border-none focus:outline-none resize-none }`}
        />
      </div>
    </div>
  );
};

const UploadBookColumn = ({
  setBookFile,
  bookFile,
  isDownloadable,
  setIsDownloadable,
  subject,
  setSubject,
}) => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col">
        <label className="text-sm text-[#616161] font-light">SUBJECT</label>

        <Select onValueChange={setSubject} defaultValue={subject}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select a Subject" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Subjects</SelectLabel>
              <SelectItem value="1">English</SelectItem>
              <SelectItem value="2">Chemistry</SelectItem>
              <SelectItem value="3">Physics</SelectItem>
              <SelectItem value="4">Science</SelectItem>
              <SelectItem value="5">Maths</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div className="flex flex-col text-sm text-[#616161] font-light">
        <label className="">UPLOAD BOOK FILE</label>
        <FileInput file={bookFile} setFile={setBookFile} />
        <div className="mt-3">
          <label className="cursor-pointer flex gap-2 items-center">
            <input
              onChange={() => setIsDownloadable(!isDownloadable)}
              type="checkbox"
              className="form-checkbox h-4 w-4 text-blue-600"
            />
            <span>ALLOW DOWNLOAD</span>
          </label>
        </div>
      </div>
    </div>
  );
};

const CoverPreview = ({ thumbnail, setThumbnail }) => {
  const [coverImage, setCoverImage] = useState(null);
  const inputRef = useRef(null);

  const handleFileInputChange = () => {
    inputRef.current.click();
  };

  const handleFileSelected = (event) => {
    const file = event.target.files[0];
    setThumbnail(file);
    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setCoverImage(reader.result);
      };

      reader.readAsDataURL(file);
    }
  };

  return (
    <div
      onClick={handleFileInputChange}
      className="bg-[#D9D9D9] text-sm font-bold text-center flex items-center h-48 md:h-auto md:w-32 rounded-md justify-center"
    >
      {thumbnail ? (
        <img
          src={URL.createObjectURL(thumbnail)}
          alt="Cover Preview"
          className="w-full h-full rounded-md object-contain"
        />
      ) : (
        <>
          Cover <br /> Preview
        </>
      )}
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelected}
        className="hidden"
      />
    </div>
  );
};
