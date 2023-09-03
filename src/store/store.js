import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import tutorReducer from '../features/onBoard/onBoardSlice';

export const store = configureStore({
  reducer: {
    userAuth: authReducer,
    tutor: tutorReducer,
  },
});
