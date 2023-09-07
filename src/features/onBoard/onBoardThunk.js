import { createAsyncThunk } from '@reduxjs/toolkit';
import { setUserData } from '../auth/authSlice';
import axios from '../../utils/index';

export const onBoardUser = createAsyncThunk(
  'onBoard/user',
  async ({ formData, onSuccess }, { dispatch, rejectWithValue }) => {
    for (const [key, value] of formData.entries()) {
      console.log(key, value);
    }
    const token = JSON.parse(localStorage.getItem('token'));
    try {
      console.log(token);
      const response = await axios.post('onboard/user', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });
      onSuccess();
      console.log(response.data, 'data');
      dispatch(setUserData(response.data.user));
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
  async ({ formData, onSuccess }, { rejectWithValue }) => {
    try {
      console.log('run');
      console.log(formData);
      const token = JSON.parse(localStorage.getItem('token'));
      const response = await axios.post('/onboard/tutor', formData, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response.data);
      onSuccess();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
