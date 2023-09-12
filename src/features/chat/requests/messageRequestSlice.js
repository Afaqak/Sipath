import { createSlice } from '@reduxjs/toolkit';
import { fetchMessageRequests, approveRequest } from './messageRequestThunk';
const messageRequestSlice = createSlice({
  name: 'messageRequest',
  initialState: { messageRequests: [], loading: false, error: null },
  extraReducers(builder) {
    builder
      .addCase(fetchMessageRequests.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchMessageRequests.fulfilled, (state, action) => {
        state.loading = false;
        state.messageRequests = action.payload;
        state.error = null;
      })
      .addCase(fetchMessageRequests.rejected, (state, action) => {
        state.error = action.error;
      })
      .addCase(approveRequest.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(approveRequest.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(approveRequest.rejected, (state, action) => {
        state.error = action.error;
      });
  },
});

export default messageRequestSlice.reducer;
