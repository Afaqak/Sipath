import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import tutorReducer from '../features/onBoard/onBoardSlice';
import messageReducer from '../features/chat/message/messageSlice';
import conversationReducer from '../features/chat/conversation/conversationSlice';
import messageRequestReducer from '../features/chat/requests/messageRequestSlice';
export const store = configureStore({
  reducer: {
    userAuth: authReducer,
    tutor: tutorReducer,
    messages: messageReducer,
    conversations: conversationReducer,
    messageRequests: messageRequestReducer,
  },
});
