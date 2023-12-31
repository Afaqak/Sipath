import { createSlice } from '@reduxjs/toolkit';
import { fetchConversations } from './conversationThunk';

const initialState = {
  conversations: [],
  messages:[],
  loading: false,
  error: null,
};

const conversationSlice = createSlice({
  name: 'conversation',
  initialState,
  reducers:{
    setConversations(state,action){
      state.conversations.push(action.payload)
    },
    insertConversation(state,action){

      state.conversations.push(action.payload)
    }
  },
  extraReducers(builder) {
  
    builder
      .addCase(fetchConversations.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchConversations.fulfilled, (state, action) => {
        state.loading = false;
        //action.payload?.chatMessages
        state.conversations = action.payload?.userChats;
      })
      .addCase(fetchConversations.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      });
  },
});

export const {insertConversation,setConversations}=conversationSlice.actions
export default conversationSlice.reducer;
