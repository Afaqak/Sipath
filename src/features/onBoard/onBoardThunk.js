import { createAsyncThunk } from '@reduxjs/toolkit';
import { setUserData } from '../auth/authSlice';
import axios from '../../utils/index';

export const onBoardUser = createAsyncThunk(
  'onBoard/user',
  async ({ formData, onSuccess, update }, { dispatch, rejectWithValue }) => {
    const token = JSON.parse(localStorage.getItem('token'));
    try {
      const response = await axios.post('onboard/user', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });
      onSuccess();
   
      update(response.data);

      return response.data;
    } catch (err) {
      console.log(err);
      rejectWithValue(err.data.message);
      throw err;
    }
  }
);

export const onBoardTutor = createAsyncThunk(
  'onBoard/tutor',
  async ({ formData, onSuccess, axios }, { rejectWithValue }) => {
    try {
      const response = await axios.post('/onboard/tutor', formData);
 
      onSuccess();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
