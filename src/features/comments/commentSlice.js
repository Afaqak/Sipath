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
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createComment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createComment.fulfilled, (state, action) => {
        state.loading = false;
        state.primaryComments.push(action.payload.comment); 
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
        state.primaryComments = action.payload;
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
    
  },
});

export default commentsSlice.reducer;
