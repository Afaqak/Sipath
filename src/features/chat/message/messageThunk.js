import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../../utils/index';
//message
export const createMessage = createAsyncThunk('message/createMessage', async () => {});

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
