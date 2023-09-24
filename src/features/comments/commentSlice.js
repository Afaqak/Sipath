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
      }).addCase(createReplyToComment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createReplyToComment.fulfilled, (state, action) => {
        state.loading = false;
        console.log(typeof action.payload,action.payload)
        const { reply_to} = action.payload;
        if (!state.commentReplies[reply_to]) {
          console.log(reply_to,"new reply")
          state.commentReplies[reply_to] = [action.payload];
        } else {
          state.commentReplies[reply_to].push(action.payload);
        }
        // console.log(state,"State")
      })
      .addCase(createReplyToComment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
    
  },
});

export default commentsSlice.reducer;
