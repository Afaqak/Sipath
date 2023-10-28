import { createAsyncThunk } from '@reduxjs/toolkit';
import useAxiosPrivate from '@/hooks/useAxiosPrivate';

export const fetchMessageRequests = createAsyncThunk(
  'messageRequests/fetchMessageRequests',
  async ({token}) => {
    const privateAxios=useAxiosPrivate()
    console.log(token)
    try {
      const response = await privateAxios.get(`/chats/requests`,{
        headers:{
          Authorization:`Bearer ${token}`
        }
      });
      console.log(response,"{from fetch}");
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
    console.log(token,"{token}")
    try {
      const response = await privateAxios.patch(`/chats/requests/${id}`,{
        decision: "accept",
      },{
        headers:{
          Authorization:`Bearer ${token}`
        }
      });
      console.log(response.data,"{approveReq}");
      // dispatch(fetchMessageRequests({}));
      return response.data;
    } catch (err) {
      throw err;
    }
  }
);
