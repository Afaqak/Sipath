import { createSlice } from '@reduxjs/toolkit';
import { createMessage } from './messageThunk';
import { getMessagesByConversationId } from './messageThunk';
const messageSlice = createSlice({
  name: 'conversations',
  initialState: { messages: [], isLoading: false, error: null },
  reducers: {
    insertMessage(state, action) {
      state.messages.push(action.payload)
    },
    clearChat(state) {
      state.messages = []
    }
  },

  extraReducers(builder) {
    builder
      .addCase(createMessage.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createMessage.fulfilled, (state, action) => {
        state.isLoading = false;
        state.messages.push(action.payload);
      })
      .addCase(createMessage.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error;
      })
      .addCase(getMessagesByConversationId.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getMessagesByConversationId.fulfilled, (state, action) => {
        state.isLoading = false;
        state.messages = [...state?.messages, ...action?.payload];
      })
      .addCase(getMessagesByConversationId.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error;
      });
  },
});

export const { insertMessage ,clearChat} = messageSlice.actions

export default messageSlice.reducer;
