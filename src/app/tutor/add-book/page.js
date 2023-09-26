'use client';
import React, { useState, useRef } from 'react';
import { SubjectDropdown, FileInput, VideoUploadType } from '@/components';
import { useForm, Controller } from 'react-hook-form';
import axios from '../../../utils/index';
import { useToast } from '@/components/hooks/use-toast';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';

const AddBook = () => {
  const [loading, setLoading] = useState(false);
  const [type, setType] = useState('free');
  const [book, setBook] = useState(null);
  const [price, setPrice] = useState(null);
  const [thumbnail, setThumbnail] = useState(null);
  const { toast } = useToast();
  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    console.log(data, thumbnail, book, price);
    if (!book) {
      toast({ title: 'book is compulsory', variant: 'destructive' });
    }
    try {
      setLoading(true);
      const token = JSON.parse(localStorage.getItem('token'));
      const formData = new FormData();
      formData.append('book', book);
      formData.append('title', data.bookTitle);
      formData.append('description', data.description);
      formData.append('thumbnail', thumbnail);
      formData.append('subject', data.subject);
      if (type === 'premium' && price > 0) {
        formData.append('price', price);
      }
      formData.append('isDownloadable', data.isDownloadable);
      const response = await axios.post(
        `/upload/book?isDownloadable=${data.isDownloadable}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      console.log(response.data);

      toast({
        title: '🟢 Book Uploaded',
      });
      reset();
      setThumbnail(null);
      setBook(null);
    } catch (error) {
      console.error('Error uploading book:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative w-[90%] mt-16 md:w-fit mx-auto">
      <VideoUploadType type={type} setType={setType} setPrice={setPrice} />
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className=" bg-white mt-4 flex md:flex-row flex-col uppercase gap-6 p-4 rounded-md shadow-md">
          <NewBookBodyColumn control={control} errors={errors} />
          <UploadBookColumn control={control} errors={errors} file={book} setFile={setBook} />
          <CoverPreview thumbnail={thumbnail} setThumbnail={setThumbnail} />
        </div>
        <div className="flex justify-end">
          <Button
            disabled={loading}
            type="submit"
            className="bg-black flex gap-1 rounded-md px-8 mt-4 py-1 text-white"
          >
            Add Book
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddBook;

const NewBookBodyColumn = ({ control, errors }) => {
  return (
    <div className="flex flex-col gap-4 text-sm">
      <div className="flex flex-col">
        <label className="text-[#616161] font-light">BOOK TITLE</label>
        <Controller
          name="bookTitle"
          control={control}
          defaultValue=""
          rules={{ required: 'Book title is required' }}
          render={({ field }) => (
            <input
              {...field}
              placeholder="Enter title..."
              className={`shadow-[inset_2px_1px_6px_rgba(0,0,0,0.2)] rounded-md px-3 py-1 placeholder:text-sm border-none focus:outline-none ${
                errors.bookTitle ? 'border-red-500' : ''
              }`}
              type="text"
            />
          )}
        />
        {errors.bookTitle && (
          <span className="text-red-500 text-sm mt-1 lowercase">{errors.bookTitle.message}</span>
        )}
      </div>
      <div className="flex flex-col">
        <label className="text-[#616161] font-light">DESCRIPTION</label>
        <Controller
          name="description"
          control={control}
          defaultValue=""
          rules={{ required: 'Description is required' }}
          render={({ field }) => (
            <textarea
              {...field}
              rows={4}
              cols={4}
              placeholder="Enter description"
              className={`shadow-[inset_2px_1px_6px_rgba(0,0,0,0.2)] rounded-md px-3 py-1 placeholder:text-sm border-none focus:outline-none resize-none ${
                errors.description ? 'border-red-500' : ''
              }`}
            />
          )}
        />
        {errors.description && (
          <span className="text-red-500 text-sm mt-1 lowercase">{errors.description.message}</span>
        )}
      </div>
    </div>
  );
};

const UploadBookColumn = ({ control, errors, file, setFile }) => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col">
        <label className="text-sm text-[#616161] font-light">SUBJECT</label>
        <Controller
          name="subject"
          control={control}
          defaultValue=""
          rules={{ required: 'Subject is required' }}
          render={({ field }) => (
            <Select onValueChange={field.onChange} defaultValue={field.value}>
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
          )}
        />
        {errors.subject && (
          <span className="text-red-500 text-sm mt-1 lowercase">{errors.subject.message}</span>
        )}
      </div>
      <div className="flex flex-col text-sm text-[#616161] font-light">
        <label className="">UPLOAD BOOK FILE</label>
        <FileInput file={file} setFile={setFile} />
        <div className="mt-3">
          <label className="cursor-pointer flex gap-2 items-center">
            <Controller
              name="isDownloadable"
              control={control}
              defaultValue={false}
              render={({ field }) => (
                <input {...field} type="checkbox" className="form-checkbox h-4 w-4 text-blue-600" />
              )}
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
      {coverImage ? (
        <img
          src={coverImage}
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
