import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import authReducer from '../features/auth/authSlice';
import tutorReducer from '../features/onBoard/onBoardSlice';
import messageReducer from '../features/chat/message/messageSlice';
import conversationReducer from '../features/chat/conversation/conversationSlice';
import messageRequestReducer from '../features/chat/requests/messageRequestSlice';
import comments from '../features/comments/commentSlice';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['userAuth'],
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
});

export const persistor = persistStore(store);
