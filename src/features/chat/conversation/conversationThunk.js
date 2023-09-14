import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../../utils/index';

export const fetchConversations = createAsyncThunk(
  'conversations/fetchConversations',
  async (conversationId) => {
    try {
      const response = await axios.get(`/conversations/${conversationId}`);

      return response.data;
    } catch (err) {
      throw err;
    }
  }
);
