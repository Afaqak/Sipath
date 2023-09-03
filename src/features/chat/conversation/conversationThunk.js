import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../../utils/index';

export const fetchConversations = createAsyncThunk(
  'conversations/fetchConversations',
  async (conversationId) => {
    try {
      const response = await axios.get(`/conversations/${conversationId}`);
      console.log(response.data);
      return response.data;
    } catch (err) {
      throw err;
    }
  }
);
