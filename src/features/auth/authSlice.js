import { createSlice } from '@reduxjs/toolkit';
import { createUser, signInUser, facebookAuth } from './authThunk';
const initialState = {
  user: null,
  token: null,
  loading: 'idle',
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
    },
    setUserData: (state, action) => {
      state.user = action.payload;
    },
    setUserDataAndToken(state, action) {
      state.user = action.payload?.user;
      state.token = action.payload?.token;
    },
    setToken(state, action) {
      state.token = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(createUser.pending, (state) => {
        state.loading = 'pending';
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.loading = 'idle';
      })
      .addCase(createUser.rejected, (state) => {
        state.loading = 'idle';
      })
      .addCase(signInUser.pending, (state) => {
        state.loading = 'pending';
      })
      .addCase(signInUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.loading = 'idle';
      })
      .addCase(signInUser.rejected, (state) => {
        state.loading = 'idle';
      })
      .addCase(facebookAuth.pending, (state) => {
        state.loading = 'pending';
      })
      .addCase(facebookAuth.fulfilled, (state, action) => {
        state.user = action.payload?.user;
        state.token = action.payload?.token;
        state.loading = 'idle';
      })
      .addCase(facebookAuth.rejected, (state) => {
        state.loading = 'idle';
      });
  },
});

export const { logout, setUserData, setUserDataAndToken, setToken } = authSlice.actions;

export default authSlice.reducer;
