import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../../utils/index';

export const fetchConversations = createAsyncThunk(
  'conversations/fetchConversations',
  async ({token,ifParams}) => {
    try {
      const response = await axios.get(`/chats`,{
        headers:{
        Authorization:`Bearer ${token}`
        }
      });
      if(ifParams){
        console.log(response?.data?.userChats)
        ifParams(response?.data?.userChats)
      }


      return response.data;
    } catch (err) {
      throw err;
    }
  }
);
