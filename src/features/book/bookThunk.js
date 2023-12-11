import { createAsyncThunk } from '@reduxjs/toolkit';
import useAxios from '@/hooks/useAxios';

export const createBook = createAsyncThunk(
  'books/createBook',
  async ({ formData, token, onSuccess, isDownloadable, setValue, onError }, { rejectWithValue }) => {
    const axios = useAxios();
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },

      onUploadProgress: (progressEvent) => {
        const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
        if (setValue) {
          setValue('progress', progress)
        }
      },
    };



    try {
      const response = await axios.post(`/upload/book?isDownloadable=${isDownloadable}`, formData, config);
      console.log(response?.data)

      if (onSuccess && typeof onSuccess === 'function') onSuccess();

      return response.data;
    } catch (error) {
      if (onSuccess && typeof onSuccess === 'function') {
        onError();
      }
      return rejectWithValue(error.message || 'Error updating the book');
    }
  }
);

export const fetchTutorBooks = createAsyncThunk(
  'books/fetchTutorBooks',
  async ({ book, token }) => {
    const axios = useAxios();
    try {
    } catch { }
  }
);

export const fetchBooks = createAsyncThunk('books/fetchBooks', async ({ token, tutorId }) => {
  try {
    const axios = useAxios();

    const response = await axios.get(`/assets/books/tutor/${tutorId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch {
    throw new Error();
  }
});

export const UpdateBook = createAsyncThunk(
  'books/updateBook',
  async ({ bookId, data, token, onError, onSuccess }, { rejectWithValue }) => {
    try {
      const axios = useAxios();
      const response = await axios.patch(`/assets/books/${bookId}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (onSuccess && typeof onSuccess === 'function') onSuccess();

      return response.data.updatedBook;
    } catch (error) {
      if (onError && typeof onError === 'function') onError();
      return rejectWithValue(error.message || 'Error updating the book');
    }
  }
);

export const deleteBook = createAsyncThunk(
  'books/deleteBook',
  async ({ bookId, token, tutorId, onSuccess, onError }) => {
    try {
      const axios = useAxios();
      const response = await axios.delete(`/assets/books/${bookId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        if (onError && typeof onError === 'function') onSuccess();
        const response = await axios.get(`/assets/books/tutor/${tutorId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        return response.data;
      }
      return;
    } catch (error) {
      if (onError && typeof onError === 'function') onError();
      return rejectWithValue(error.message || 'Error deleting the book');
    }
  }
);
