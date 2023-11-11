import { createAsyncThunk } from '@reduxjs/toolkit';
import useAxiosPrivate from '@/hooks/useAxiosPrivate';
import { insertConversation } from '../conversation/conversationSlice';
import { fetchConversations } from '../conversation/conversationThunk';

export const fetchMessageRequests = createAsyncThunk(
  'messageRequests/fetchMessageRequests',
  async ({token}) => {
    const privateAxios=useAxiosPrivate()
   
    try {
      const response = await privateAxios.get(`/chats/requests`,{
        headers:{
          Authorization:`Bearer ${token}`
        }
      });
    
      return response.data?.chatRequests;
    } catch (err) {
      throw err;
    }
  }
);

export const approveRequest = createAsyncThunk(
  'messageRequests/approveMessageRequests',
  async ({id,token }, { dispatch }) => {
    const privateAxios=useAxiosPrivate()
    
    try {
      const response = await privateAxios.patch(`/chats/requests/${id}`,{
        decision: "accept",
      },{
        headers:{
          Authorization:`Bearer ${token}`
        }
      });

      // dispatch(insertConversation(response.data?.chat))
      dispatch(fetchConversations({token}))
      dispatch(fetchMessageRequests({token}));
      return response.data.updatedRequest;
    } catch (err) {
      throw err;
    }
  }
);


export const rejectRequest = createAsyncThunk(
  'messageRequests/rejectMessageRequests',
  async ({id,token }, { dispatch }) => {
    const privateAxios=useAxiosPrivate()
   
    try {
      const response = await privateAxios.patch(`/chats/requests/${id}`,{
        decision: "deny",
      },{
        headers:{
          Authorization:`Bearer ${token}`
        }
      });
  
      // dispatch(fetchMessageRequests({}));
      return response.data.updatedRequest;
    } catch (err) {
      throw err;
    }
  }
);
