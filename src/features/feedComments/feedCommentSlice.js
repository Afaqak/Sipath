// commentsSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';


export const fetchRepliesAsync = createAsyncThunk('comments/fetchReplies', async ({ postId, commentId, token }) => {

  try {
    const request = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/posts/${postId}/comments/${commentId}?limit=10&set=0&order=asc`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    const response=await request.json()
    console.log(response.comments)

    return { postId, commentId, replies: response.comments };
  } catch (err) {

  }
});

export const fetchCommentsAsync = createAsyncThunk('comments/fetchcomments', async ({ postId, token }) => {

  try {
    const request = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/posts/${postId}/comments?limit=10`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    const response = await request.json()
    console.log(response?.comments, "response f")
    return { postId, comments: response?.comments }

  } catch (err) {
    console.log(err)
  }

});

const feedCommentsSlice = createSlice({
  name: 'comments',
  initialState: {},
  reducers: {
    addComment: (state, action) => {
      const { postId, comment } = action.payload;
      console.log(postId, comment)
      if (!state[postId]) {
        state[postId] = [];
      }
      state[postId].unshift(comment);
    },
    addReply: (state, action) => {
      const { postId, commentId, reply } = action.payload;
      const postComments = state[postId];
      const comment = postComments.find((c) => c.id === commentId);

      if (comment) {
        if (!comment.replies) {
          comment.replies = [];
        }
        comment.replies.unshift(reply);
      }
    },
    addMoreComments: (state, action) => {
      const { postId, moreComments } = action.payload;
      state[postId] = [...state[postId], ...moreComments];
    },
    addMoreReplies: (state, action) => {
      const { postId, commentId, moreReplies } = action.payload;
      const postComments = state[postId];
      const comment = postComments.find((c) => c.id === commentId);

      if (comment) {
        if (!comment.replies) {
          comment.replies = [];
        }
        comment.replies = [...comment.replies, ...moreReplies];
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRepliesAsync.fulfilled, (state, action) => {
        const { postId, commentId, replies } = action.payload;
        const postComments = state[postId];
        const comment = postComments.find((c) => c.id === commentId);
        
        if (comment) {
          comment.replies = replies;
          console.log(comment)
        }
      })
      .addCase(fetchCommentsAsync.fulfilled, (state, action) => {
        const { postId, comments } = action.payload;

        state[postId] = comments;
      });
  },
});

export const { addComment, addReply,addMoreComments,addMoreReplies } = feedCommentsSlice.actions;
export const selectCommentsByPostId = (state, postId) => {
  return state.feedComments[postId] || []
};
export default feedCommentsSlice.reducer;
