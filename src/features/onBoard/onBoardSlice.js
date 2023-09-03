import { createSlice } from '@reduxjs/toolkit';
import { onBoardTutor } from './onBoardThunk';

const initialState = {
  tutorData: null,
  isLoading: false,
  error: null,
};

const tutorSlice = createSlice({
  name: 'tutor',
  initialState,

  reducers: {
    setTutorData: (state, action) => {
      state.tutorData = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(onBoardTutor.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(onBoardTutor.fulfilled, (state, action) => {
        state.isLoading = false;
        state.tutorData = action.payload;
      })
      .addCase(onBoardTutor.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { setTutorData } = tutorSlice.actions;
export default tutorSlice.reducer;
