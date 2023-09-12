import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../../utils/index';

export const fetchMessageRequests = createAsyncThunk(
  'messageRequests/fetchMessageRequests',
  async (id) => {
    try {
      const response = await axios.get(`/messages/requests/${id}`);
      console.log(response);
      return response.data;
    } catch (err) {
      throw err;
    }
  }
);

export const approveRequest = createAsyncThunk(
  'messageRequests/approveMessageRequests',
  async ({ userId, id }, { dispatch }) => {
    try {
      const response = await axios.post(`/messages/approve/${id}`);
      console.log(response);
      dispatch(fetchMessageRequests(userId));
      return response.data;
    } catch (err) {
      throw err;
    }
  }
);
