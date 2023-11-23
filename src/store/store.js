import { configureStore, combineReducers } from '@reduxjs/toolkit';

import authReducer from '../features/auth/authSlice';
import tutorReducer from '../features/onBoard/onBoardSlice';
import messageReducer from '../features/chat/message/messageSlice';
import conversationReducer from '../features/chat/conversation/conversationSlice';
import messageRequestReducer from '../features/chat/requests/messageRequestSlice';
import comments from '../features/comments/commentSlice';
import booksReducer from '../features/book/bookSlice';
import quizesReducer from '../features/quiz/quizSlice';
import appointmentSlice from '@/features/appointments/appointmentSlice';
import courseSlice from '@/features/course/courseSlice';
import feedCommentSlice from '@/features/feedComments/feedCommentSlice';

const rootReducer = combineReducers({
  userAuth: authReducer,
  tutor: tutorReducer,
  messages: messageReducer,
  conversations: conversationReducer,
  messageRequests: messageRequestReducer,
  comments,
  books: booksReducer,
  quizzes: quizesReducer,
  appointments:appointmentSlice,
  course:courseSlice,
  feedComments:feedCommentSlice
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
