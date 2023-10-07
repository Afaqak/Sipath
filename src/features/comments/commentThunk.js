import { createAsyncThunk } from '@reduxjs/toolkit';

export const createComment = createAsyncThunk(
  'comments/createComment',
  async ({ videoId, comment, onSuccess, axios }, { dispatch }) => {
    console.log(comment, 'com');
    try {
      const response = await axios.post(`/assets/video/${videoId}/comments`, { comment });

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
  async ({ videoId, limit = 10, set = 0, onSuccess, axios }, { dispatch }) => {
    try {
      console.log(set, 'from detch');
      const response = await axios.get(
        `/assets/video/${videoId}/comments?limit=${limit}&set=${set}&order=desc`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );
      if (onSuccess && typeof onSuccess === 'function') {
        onSuccess(response.data.comments);
      }

      return response.data?.comments;
    } catch (error) {
      throw new Error();
    }
  }
);

export const fetchCommentReplies = createAsyncThunk(
  'comments/fetchCommentReplies',
  async ({ videoId, commentId, onSuccess, limit = 10, axios }) => {
    const token = JSON.parse(localStorage.getItem('token'));
    try {
      const response = await axios.get(`/assets/video/${videoId}/comments/${commentId}?limit=3`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
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
  async ({ videoId, commentId, comment, limit = 10, axios }) => {
    console.log(comment, 'Data', videoId);
    console.log('hit');
    const token = JSON.parse(localStorage.getItem('token'));
    try {
      const response = await axios.post(
        `assets/video/${videoId}/comments/${commentId}`,
        { comment },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );
      console.log(response.data);
      return response.data.comment;
    } catch (error) {
      throw new Error();
    }
  }
);
