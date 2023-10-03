import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../utils/index';

export const createUser = createAsyncThunk(
  'auth/createUser',
  async ({ user, onSuccess, onReject }, { rejectWithValue }) => {
    try {
      const response = await axios.post('/auth/signup', user);

      if (onSuccess && typeof onSuccess === 'function') {
        onSuccess(response.data);
      }

      return response.data;
    } catch (err) {
      if (onReject && typeof onReject === 'function') {
        console.log(err, 'eerrr');
        onReject();
      }
      console.log('err');
      return rejectWithValue(err.response.data);
    }
  }
);

export const signInUser = createAsyncThunk(
  'auth/signIn',
  async ({ user, onSuccess, onError }, { rejectWithValue }) => {
    try {
      console.log('here');
      const response = await axios.post('/auth/login', user);
      console.log(response, 'here');
      localStorage.setItem('token', JSON.stringify(response.data.token));

      if (onSuccess && typeof onSuccess === 'function') {
        onSuccess();
      }

      return response.data;
    } catch (err) {
      if (onError && typeof onError === 'function') {
        onError(err.response.data);
      }

      return rejectWithValue(err.response.data);
    }
  }
);

export const facebookAuth = createAsyncThunk(
  'auth/facebook',
  async ({ onSuccess, onError }, { rejectWithValue }) => {
    try {
      const response = await axios.get('/auth/facebook');

      if (onSuccess && typeof onSuccess === 'function') {
        onSuccess();
      }

      return response.data;
    } catch (err) {
      if (onError && typeof onError === 'function') {
        onError(err.response.data);
      }

      return rejectWithValue(err.response.data);
    }
  }
);
