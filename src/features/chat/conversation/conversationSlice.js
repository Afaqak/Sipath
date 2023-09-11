import { createSlice } from '@reduxjs/toolkit';
import { fetchConversations } from './conversationThunk';
const initialState = {
  conversations: [],
  loading: false,
  error: null,
};

const conversationSlice = createSlice({
  name: 'conversation',
  initialState,
  extraReducers(builder) {
    builder
      .addCase(fetchConversations.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchConversations.fulfilled, (state, action) => {
        state.loading = false;
        state.conversations = action.payload.conversations;
      })
      .addCase(fetchConversations.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      });
  },
});

export default conversationSlice.reducer;
