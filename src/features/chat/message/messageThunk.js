import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../../utils/index';
import useAxiosPrivate from '@/hooks/useAxiosPrivate';
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
export const approveMessage = createAsyncThunk('message/approveMessage', async (_,{dispatch}) => {});

export const getMessagesByConversationId = createAsyncThunk('message/getMessages', async ({id,token}) => {
  const privateAxios=useAxiosPrivate()
  try {
    const response = await privateAxios.get(`/chats/${id}/messages`,{
      headers:{
        Authorization:`Bearer ${token}`
      }
    });
    console.log(response);  

    
    return response.data?.messages;
  } catch (err) {
    throw err;
  }
});
