import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../utils/index';
import useAxiosPrivate from '@/hooks/useAxiosPrivate';

export const createComment = createAsyncThunk(
  'comments/createComment',
  async ({ videoId, data, onSuccess, token }) => {
  
    try {
      const response = await axios.post(`/assets/video/${videoId}/comments`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (onSuccess && typeof onSuccess === 'function') {
        onSuccess();
      }
      console.log(response?.data)

   
      return response.data;
    } catch (error) {
      throw new Error();
    }
  }
);

export const fetchPrimaryComments = createAsyncThunk(
  'comments/fetchPrimaryComments',
  async ({ videoId, limit = 10, set = 0, onSuccess }) => {
    try {
      const response = await axios.get(`/assets/video/${videoId}/comments?limit=10&order=desc`);
      if (onSuccess && typeof onSuccess === 'function') {
        onSuccess(response.data.comments);
      }
      console.log(response?.data, "{comments}")
    
      return response.data?.comments;
    } catch (error) {
      throw new Error();
    }
  }
);

export const fetchCommentReplies = createAsyncThunk(
  'comments/fetchCommentReplies',
  async ({ videoId, commentId, onSuccess, limit = 10 }) => {
    const axios = useAxiosPrivate();
    try {
      const response = await axios.get(
        `/assets/video/${videoId}/comments/${commentId}?limit=${limit}`
      );
      if (onSuccess && typeof onSuccess === 'function') {
        onSuccess(response.data);
      
      }

      return { commentId, replies: response.data?.comments };
    } catch (error) {
      throw new Error();
    }
  }
);

export const createReplyToComment = createAsyncThunk(
  'comments/createReplyToComments',
  async ({ videoId, commentId, data, token }) => {
    const axios = useAxiosPrivate();
    for (const form of data.entries()) {
      console.log(form,commentId,videoId)
   }
    try {
      const response = await axios.post(`/assets/video/${videoId}/comments/${commentId}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      fetchCommentReplies({videoId,commentId})
      return response.data.comment;
    } catch (error) {
      throw new Error();
    }
  }
);
