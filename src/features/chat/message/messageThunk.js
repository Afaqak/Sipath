import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../../utils/index';
import useAxiosPrivate from '@/hooks/useAxiosPrivate';
//message
export const createMessage = createAsyncThunk(
  'message/createMessage',
  async (data, { dispatch }) => {
    try {
      const response = await axios.post('/messages', data);
   
      return response?.data?.message;
    } catch (err) {
      throw err;
    }
  }
);


export const approveMessage = createAsyncThunk('message/approveMessage', async (_,{dispatch}) => {});

export const getMessagesByConversationId = createAsyncThunk('message/getMessages', async ({id,token,set=0,checkLength,limit=10,type}) => {
  const privateAxios=useAxiosPrivate()
  try {
    const response = await privateAxios.get(`/chats/${id}/messages?limit=${limit}&set=${set}`,{
      headers:{
        Authorization:`Bearer ${token}`
      }
    });

    
    if(checkLength && typeof checkLength==='function'){
      checkLength(response?.data?.messages)
    }
    

    return response.data?.messages.reverse();
  } catch (err) {
    throw err;
  }
});
