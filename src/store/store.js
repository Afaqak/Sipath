import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';

import authReducer from '../features/auth/authSlice';
import tutorReducer from '../features/onBoard/onBoardSlice';
import messageReducer from '../features/chat/message/messageSlice';
import conversationReducer from '../features/chat/conversation/conversationSlice';
import messageRequestReducer from '../features/chat/requests/messageRequestSlice';
import comments from '../features/comments/commentSlice';
import createWebStorage from 'redux-persist/lib/storage/createWebStorage';
const createNoopStorage = () => {
  return {
    getItem(_key) {
      return Promise.resolve(null);
    },
    setItem(_key, value) {
      return Promise.resolve(value);
    },
    removeItem(_key) {
      return Promise.resolve();
    },
  };
};
const storage = typeof window !== 'undefined' ? createWebStorage('local') : createNoopStorage();

const persistConfig = {
  timeout: 50,
  key: 'root',
  storage,
  blacklist: ['userAuth', 'tutor', 'message', 'conversations', 'messageRequests', 'comments'],
};

const rootReducer = combineReducers({
  userAuth: authReducer,
  tutor: tutorReducer,
  messages: messageReducer,
  conversations: conversationReducer,
  messageRequests: messageRequestReducer,
  comments,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
