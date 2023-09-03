import { createSlice } from '@reduxjs/toolkit';
import { createUser, signInUser } from './authThunk';
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
      });
  },
});

export const { logout, setUserData } = authSlice.actions;

export default authSlice.reducer;
