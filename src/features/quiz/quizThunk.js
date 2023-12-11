import { createAsyncThunk } from '@reduxjs/toolkit';
import useAxios from '@/hooks/useAxios';

export const createQuiz = createAsyncThunk(
  'quizzes/createQuiz',
  async ({ data, token, onSuccess, onError }, { rejectWithValue }) => {
    const axios = useAxios();
 
    try {
      const response = await axios.post(`/upload/quiz`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
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

export const fetchTutorQuizzes = createAsyncThunk(
  'quizzes/fetchTutorQuizzes',
  async ({ book, token }) => {
    try {
    } catch {}
  }
);

export const fetchQuizzes = createAsyncThunk('quizzes/fetchQuizzes', async ({ tutorId, token }) => {
  const axios = useAxios();
  const response = await axios.get(`/assets/quizzes/tutor${tutorId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
});

export const UpdateQuiz = createAsyncThunk(
  'quizzes/updateQuiz',
  async ({ quizId, data, token, onError, onSuccess }) => {
    try {
      const axios = useAxios();
      const response = await axios.patch(`/assets/quizzes/${quizId}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
 
      if (onSuccess && typeof onSuccess === 'function') onSuccess();

      return response.data.updatedQuiz;
    } catch (error) {
      if (onError && typeof onError === 'function') onError();
      return rejectWithValue(error.message || 'Error updating the Quiz');
    }
  }
);

export const deleteQuiz = createAsyncThunk(
  'quizzes/deleteQuiz',
  async ({ quizId, token, tutorId, onSuccess, onError }) => {
    try {
      const axios = useAxios();
      const response = await axios.delete(`/assets/quizzes/${quizId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        if (onError && typeof onError === 'function') onSuccess();
        const response = await axios.get(`/assets/quizzes/tutor/${tutorId}`, {
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
