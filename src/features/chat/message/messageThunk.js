import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../../utils/index';
//message
export const createMessage = createAsyncThunk(
  'message/createMessage',
  async (data, { dispatch }) => {
    try {
      const response = await axios.post('/messages', data);
      console.log(response.data, 'responsed message');
      return response?.data?.message;
    } catch (err) {
      throw err;
    }
  }
);

//get Messages of the conversation
export const approveMessage = createAsyncThunk('message/approveMessage', async () => {});

export const getMessagesByConversationId = createAsyncThunk('message/getMessages', async (id) => {
  try {
    const response = await axios.get(`/messages/conversations/${id}`);
    console.log(response);
    return response.data;
  } catch (err) {
    throw err;
  }
});
