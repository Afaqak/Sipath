import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../utils/index';
import useAxiosPrivate from '@/hooks/useAxiosPrivate';

export const createComment = createAsyncThunk(
  'comments/createComment',
  async ({ videoId, data, onSuccess, token }) => {
    console.log(data, 'dispatch');
    try {
      const response = await axios.post(`/assets/video/${videoId}/comments`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (onSuccess && typeof onSuccess === 'function') {
        onSuccess();
      }

      console.log(response.data, 'data');

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
      console.log(set, 'from detch');
      const response = await axios.get(
        `/assets/video/${videoId}/comments?limit=10&set=${set}&order=desc`
      );
      if (onSuccess && typeof onSuccess === 'function') {
        onSuccess(response.data.comments);
      }
      console.log(response.data?.comments, '{newly fetched}');
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
      const response = await axios.get(`/assets/video/${videoId}/comments/${commentId}?limit=20`);
      if (onSuccess && typeof onSuccess === 'function') {
        onSuccess(response.data);
        console.log('here');
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
    console.log(videoId, commentId, data, token, 'crtc');

    try {
      const response = await axios.post(`assets/video/${videoId}/comments/${commentId}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response.data);
      return response.data.comment;
    } catch (error) {
      throw new Error();
    }
  }
);
