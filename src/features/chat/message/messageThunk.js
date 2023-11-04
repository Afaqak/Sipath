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

export const getMessagesByConversationId = createAsyncThunk('message/getMessages', async ({id,token,set=0,checkLength,limit=10}) => {
  const privateAxios=useAxiosPrivate()
  try {
    const response = await privateAxios.get(`/chats/${id}/messages?limit=${limit}&set=${set}`,{
      headers:{
        Authorization:`Bearer ${token}`
      }
    });
    console.log(response.data.messages,"message");  
    
    if(checkLength && typeof checkLength==='function'){
      checkLength(response?.data?.messages)

    }
    
    return response.data?.messages;
  } catch (err) {
    throw err;
  }
});
