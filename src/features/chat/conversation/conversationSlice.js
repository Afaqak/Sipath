import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  conversations: [],
  loading: 'idle',
  error: null,
};

const conversationSlice = createSlice({
  name: 'conversation',
  initialState,
  extraReducers(builder) {},
});
