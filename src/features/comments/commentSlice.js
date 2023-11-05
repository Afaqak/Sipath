// commentsSlice.js

import { createSlice } from '@reduxjs/toolkit';
import {
  createComment,
  fetchPrimaryComments,
  fetchCommentReplies,
  createReplyToComment,
} from './commentThunk';

const initialState = {
  primaryComments: [],
  commentReplies: {},
  loading: false,
  error: null,
};

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    setComments(state, action) {
      const existingIds = state.primaryComments.map((comment) => comment.id);
      const newData = action.payload.filter((comment) => !existingIds.includes(comment.id));
      state.primaryComments = [...state.primaryComments, ...newData];
    },
    resetComments(state) {
      state.primaryComments = [];
    },
    setReplyComments(state, action) {
      const { commentId, replies } = action.payload;
      state.commentReplies[commentId] = replies;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createComment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createComment.fulfilled, (state, action) => {
        state.loading = false;
        state.primaryComments.unshift(action.payload.comment);
      })
      .addCase(createComment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchPrimaryComments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPrimaryComments.fulfilled, (state, action) => {
        state.loading = false;
     
        // Otherwise, append new comments as before.
        const existingIds = state.primaryComments.map((comment) => comment.id);
        const newData = action.payload.filter((comment) => !existingIds.includes(comment.id));
        state.primaryComments = [...state.primaryComments, ...newData];
      })

      .addCase(fetchPrimaryComments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchCommentReplies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCommentReplies.fulfilled, (state, action) => {
        state.loading = false;
        const { commentId, replies } = action.payload;
        state.commentReplies[commentId] = replies;
      })
      .addCase(fetchCommentReplies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(createReplyToComment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createReplyToComment.fulfilled, (state, action) => {
        state.loading = false;
     
        const { reply_to } = action.payload;
        if (!state.commentReplies[reply_to]) {
     
          state.commentReplies[reply_to] = [action.payload];
        } else {
          state.commentReplies[reply_to].push(action.payload);
        }
      })
      .addCase(createReplyToComment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { setComments, resetComments, setReplyComments } = commentsSlice.actions;

export default commentsSlice.reducer;
